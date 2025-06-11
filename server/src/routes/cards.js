// routes/cards.js
const express = require('express');
const Card = require('../models/Card');
const Deck = require('../models/Deck');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/cards/deck/:deckId
// @desc    Get all cards for a specific deck
// @access  Private
router.get('/deck/:deckId', async (req, res) => {
  try {
    const { page = 1, limit = 20, search, status = 'active' } = req.query;
    const { deckId } = req.params;

    // Verify deck ownership
    const deck = await Deck.findOne({
      _id: deckId,
      owner: req.user._id
    });

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Build query
    let query = { deck: deckId, status };
    
    if (search) {
      query.$or = [
        { front: { $regex: search, $options: 'i' } },
        { back: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const cards = await Card.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get total count
    const total = await Card.countDocuments(query);

    // Calculate decay levels for all cards
    const cardsWithDecay = cards.map(card => {
      const cardObj = card.toObject();
      cardObj.reviewData.decayLevel = card.calculateDecay();
      return cardObj;
    });

    res.json({
      success: true,
      data: {
        cards: cardsWithDecay,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cards',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/cards/:id
// @desc    Get a specific card
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate({
      path: 'deck',
      match: { owner: req.user._id }
    });

    if (!card || !card.deck) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Calculate current decay level
    const cardObj = card.toObject();
    cardObj.reviewData.decayLevel = card.calculateDecay();

    res.json({
      success: true,
      data: cardObj
    });

  } catch (error) {
    console.error('Get card error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching card',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/cards
// @desc    Create a new card
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { deckId, front, back, tags } = req.body;

    // Validation
    if (!deckId || !front || !back) {
      return res.status(400).json({
        success: false,
        message: 'Deck ID, front text, and back text are required'
      });
    }

    if (front.trim().length === 0 || back.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Front and back text cannot be empty'
      });
    }

    // Verify deck ownership
    const deck = await Deck.findOne({
      _id: deckId,
      owner: req.user._id
    });

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Create card
    const card = new Card({
      deck: deckId,
      front: front.trim(),
      back: back.trim(),
      tags: tags || [],
      reviewData: {
        nextReviewDate: new Date() // Available for immediate review
      }
    });

    await card.save();

    // Update deck stats
    const totalCards = await Card.countDocuments({ deck: deckId, status: 'active' });
    await Deck.findByIdAndUpdate(deckId, {
      'stats.totalCards': totalCards
    });

    res.status(201).json({
      success: true,
      message: 'Card created successfully',
      data: card
    });

  } catch (error) {
    console.error('Create card error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating card',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/cards/:id
// @desc    Update a card
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { front, back, tags } = req.body;

    // Find card and verify ownership
    const card = await Card.findById(req.params.id).populate({
      path: 'deck',
      match: { owner: req.user._id }
    });

    if (!card || !card.deck) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Validation
    if (front !== undefined) {
      if (!front || front.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Front text cannot be empty'
        });
      }
      card.front = front.trim();
    }

    if (back !== undefined) {
      if (!back || back.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Back text cannot be empty'
        });
      }
      card.back = back.trim();
    }

    if (tags !== undefined) {
      card.tags = tags;
    }

    await card.save();

    res.json({
      success: true,
      message: 'Card updated successfully',
      data: card
    });

  } catch (error) {
    console.error('Update card error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating card',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/cards/:id
// @desc    Delete a card (soft delete)
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // Find card and verify ownership
    const card = await Card.findById(req.params.id).populate({
      path: 'deck',
      match: { owner: req.user._id }
    });

    if (!card || !card.deck) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Soft delete by changing status
    card.status = 'deleted';
    await card.save();

    // Update deck stats
    const totalCards = await Card.countDocuments({ deck: card.deck._id, status: 'active' });
    await Deck.findByIdAndUpdate(card.deck._id, {
      'stats.totalCards': totalCards
    });

    res.json({
      success: true,
      message: 'Card deleted successfully'
    });

  } catch (error) {
    console.error('Delete card error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting card',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/cards/deck/:deckId/due
// @desc    Get cards due for review in a specific deck
// @access  Private
router.get('/deck/:deckId/due', async (req, res) => {
  try {
    const { deckId } = req.params;
    const { limit = 20 } = req.query;

    // Verify deck ownership
    const deck = await Deck.findOne({
      _id: deckId,
      owner: req.user._id
    });

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Get due cards
    const dueCards = await Card.find({
      deck: deckId,
      status: 'active',
      'reviewData.nextReviewDate': { $lte: new Date() }
    })
    .sort({ 'reviewData.nextReviewDate': 1 })
    .limit(parseInt(limit));

    // Calculate decay levels
    const cardsWithDecay = dueCards.map(card => {
      const cardObj = card.toObject();
      cardObj.reviewData.decayLevel = card.calculateDecay();
      return cardObj;
    });

    res.json({
      success: true,
      data: {
        cards: cardsWithDecay,
        total: cardsWithDecay.length
      }
    });

  } catch (error) {
    console.error('Get due cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching due cards',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/cards/:id/review
// @desc    Submit a card review (answer)
// @access  Private
router.post('/:id/review', async (req, res) => {
  try {
    const { quality, responseTime } = req.body;

    // Validation
    if (quality === undefined || quality < 0 || quality > 5) {
      return res.status(400).json({
        success: false,
        message: 'Quality must be a number between 0 and 5'
      });
    }

    // Find card and verify ownership
    const card = await Card.findById(req.params.id).populate({
      path: 'deck',
      match: { owner: req.user._id }
    });

    if (!card || !card.deck) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // Update review data using SM-2 algorithm
    const success = quality >= 3;
    const now = new Date();
    
    // Update card review data
    card.reviewData.lastReviewDate = now;
    card.reviewData.reviewCount += 1;
    
    if (success) {
      card.reviewData.successCount += 1;
      // SM-2 Algorithm implementation
      const newEaseFactor = card.reviewData.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      card.reviewData.easeFactor = Math.max(1.3, newEaseFactor);
      
      if (card.reviewData.reviewCount === 1) {
        card.reviewData.interval = 1;
      } else if (card.reviewData.reviewCount === 2) {
        card.reviewData.interval = 6;
      } else {
        card.reviewData.interval = Math.round(card.reviewData.interval * card.reviewData.easeFactor);
      }
    } else {
      card.reviewData.failureCount += 1;
      card.reviewData.interval = 1;
    }
    
    // Set next review date
    card.reviewData.nextReviewDate = new Date(now.getTime() + card.reviewData.interval * 24 * 60 * 60 * 1000);
    
    // Reset decay level
    card.reviewData.decayLevel = 0;

    await card.save();

    // Update user stats
    await req.user.updateOne({
      $inc: { 
        'stats.totalReviews': 1,
        'stats.totalCards': card.reviewData.reviewCount === 1 ? 1 : 0
      },
      'stats.lastReviewDate': now
    });

    // Update deck stats
    const deck = card.deck;
    deck.stats.totalReviews += 1;
    deck.stats.lastReviewDate = now;
    
    // Recalculate average score
    const allCards = await Card.find({ deck: deck._id, status: 'active' });
    const totalSuccesses = allCards.reduce((sum, c) => sum + c.reviewData.successCount, 0);
    const totalReviews = allCards.reduce((sum, c) => sum + c.reviewData.reviewCount, 0);
    deck.stats.averageScore = totalReviews > 0 ? (totalSuccesses / totalReviews * 100) : 0;
    
    await deck.save();

    res.json({
      success: true,
      message: 'Review submitted successfully',
      data: {
        card: card.toObject(),
        nextReviewDate: card.reviewData.nextReviewDate,
        interval: card.reviewData.interval,
        easeFactor: card.reviewData.easeFactor
      }
    });

  } catch (error) {
    console.error('Submit review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting review',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/cards/bulk
// @desc    Create multiple cards at once
// @access  Private
router.post('/bulk', async (req, res) => {
  try {
    const { deckId, cards } = req.body;

    // Validation
    if (!deckId || !cards || !Array.isArray(cards) || cards.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Deck ID and cards array are required'
      });
    }

    if (cards.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 100 cards can be created at once'
      });
    }

    // Verify deck ownership
    const deck = await Deck.findOne({
      _id: deckId,
      owner: req.user._id
    });

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Validate each card
    const validCards = [];
    const errors = [];

    cards.forEach((cardData, index) => {
      if (!cardData.front || !cardData.back) {
        errors.push(`Card ${index + 1}: Front and back text are required`);
        return;
      }

      if (cardData.front.trim().length === 0 || cardData.back.trim().length === 0) {
        errors.push(`Card ${index + 1}: Front and back text cannot be empty`);
        return;
      }

      validCards.push({
        deck: deckId,
        front: cardData.front.trim(),
        back: cardData.back.trim(),
        tags: cardData.tags || [],
        reviewData: {
          nextReviewDate: new Date()
        }
      });
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors
      });
    }

    // Create all cards
    const createdCards = await Card.insertMany(validCards);

    // Update deck stats
    const totalCards = await Card.countDocuments({ deck: deckId, status: 'active' });
    await Deck.findByIdAndUpdate(deckId, {
      'stats.totalCards': totalCards
    });

    res.status(201).json({
      success: true,
      message: `${createdCards.length} cards created successfully`,
      data: {
        created: createdCards.length,
        cards: createdCards
      }
    });

  } catch (error) {
    console.error('Bulk create cards error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating cards',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;