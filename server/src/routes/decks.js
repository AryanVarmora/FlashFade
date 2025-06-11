// routes/decks.js
const express = require('express');
const Deck = require('../models/Deck');
const Card = require('../models/Card');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/decks
// @desc    Get all decks for the authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tags } = req.query;
    
    // Build query
    let query = { owner: req.user._id };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    // Execute query with pagination
    const decks = await Deck.find(query)
      .sort({ updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('owner', 'displayName email');

    // Get total count for pagination
    const total = await Deck.countDocuments(query);

    // Add card counts to each deck
    const decksWithCardCount = await Promise.all(
      decks.map(async (deck) => {
        const cardCount = await Card.countDocuments({ deck: deck._id, status: 'active' });
        const deckObj = deck.toObject();
        deckObj.cardCount = cardCount;
        deckObj.stats.totalCards = cardCount;
        return deckObj;
      })
    );

    res.json({
      success: true,
      data: {
        decks: decksWithCardCount,
        pagination: {
          current: page,
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get decks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching decks',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/decks/:id
// @desc    Get a specific deck
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const deck = await Deck.findOne({
      _id: req.params.id,
      owner: req.user._id
    }).populate('owner', 'displayName email');

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Get card count and due cards
    const totalCards = await Card.countDocuments({ deck: deck._id, status: 'active' });
    const dueCards = await Card.countDocuments({
      deck: deck._id,
      status: 'active',
      'reviewData.nextReviewDate': { $lte: new Date() }
    });

    const deckObj = deck.toObject();
    deckObj.cardCount = totalCards;
    deckObj.dueCards = dueCards;

    res.json({
      success: true,
      data: deckObj
    });

  } catch (error) {
    console.error('Get deck error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching deck',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/decks
// @desc    Create a new deck
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, description, tags, isPublic, settings } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Deck title is required'
      });
    }

    if (title.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Deck title must be less than 100 characters'
      });
    }

    // Create deck
    const deck = new Deck({
      title: title.trim(),
      description: description?.trim() || '',
      owner: req.user._id,
      tags: tags || [],
      isPublic: isPublic || false,
      settings: {
        decayRate: settings?.decayRate || 1.0,
        reviewInterval: settings?.reviewInterval || 24
      }
    });

    await deck.save();

    res.status(201).json({
      success: true,
      message: 'Deck created successfully',
      data: deck
    });

  } catch (error) {
    console.error('Create deck error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating deck',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/decks/:id
// @desc    Update a deck
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { title, description, tags, isPublic, settings } = req.body;

    // Find deck
    const deck = await Deck.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Validation
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Deck title cannot be empty'
        });
      }
      if (title.length > 100) {
        return res.status(400).json({
          success: false,
          message: 'Deck title must be less than 100 characters'
        });
      }
      deck.title = title.trim();
    }

    if (description !== undefined) {
      deck.description = description.trim();
    }

    if (tags !== undefined) {
      deck.tags = tags;
    }

    if (isPublic !== undefined) {
      deck.isPublic = isPublic;
    }

    if (settings) {
      if (settings.decayRate !== undefined) {
        deck.settings.decayRate = Math.max(0.1, Math.min(5.0, settings.decayRate));
      }
      if (settings.reviewInterval !== undefined) {
        deck.settings.reviewInterval = Math.max(1, Math.min(168, settings.reviewInterval));
      }
    }

    await deck.save();

    res.json({
      success: true,
      message: 'Deck updated successfully',
      data: deck
    });

  } catch (error) {
    console.error('Update deck error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating deck',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/decks/:id
// @desc    Delete a deck and all its cards
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    // Find deck
    const deck = await Deck.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Delete all cards in the deck
    await Card.deleteMany({ deck: deck._id });

    // Delete the deck
    await Deck.findByIdAndDelete(deck._id);

    res.json({
      success: true,
      message: 'Deck and all associated cards deleted successfully'
    });

  } catch (error) {
    console.error('Delete deck error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting deck',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/decks/:id/stats
// @desc    Get deck statistics
// @access  Private
router.get('/:id/stats', async (req, res) => {
  try {
    const deck = await Deck.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!deck) {
      return res.status(404).json({
        success: false,
        message: 'Deck not found'
      });
    }

    // Get comprehensive stats
    const totalCards = await Card.countDocuments({ deck: deck._id, status: 'active' });
    const dueCards = await Card.countDocuments({
      deck: deck._id,
      status: 'active',
      'reviewData.nextReviewDate': { $lte: new Date() }
    });
    const newCards = await Card.countDocuments({
      deck: deck._id,
      status: 'active',
      'reviewData.reviewCount': 0
    });
    const masteredCards = await Card.countDocuments({
      deck: deck._id,
      status: 'active',
      'reviewData.easeFactor': { $gte: 2.5 },
      'reviewData.reviewCount': { $gte: 5 }
    });

    // Calculate average success rate
    const cards = await Card.find({ deck: deck._id, status: 'active' });
    const totalReviews = cards.reduce((sum, card) => sum + card.reviewData.reviewCount, 0);
    const totalSuccesses = cards.reduce((sum, card) => sum + card.reviewData.successCount, 0);
    const successRate = totalReviews > 0 ? (totalSuccesses / totalReviews * 100).toFixed(1) : 0;

    res.json({
      success: true,
      data: {
        totalCards,
        dueCards,
        newCards,
        masteredCards,
        totalReviews,
        successRate: parseFloat(successRate),
        lastReviewDate: deck.stats.lastReviewDate
      }
    });

  } catch (error) {
    console.error('Get deck stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching deck statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;