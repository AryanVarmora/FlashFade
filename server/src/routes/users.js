// routes/users.js
const express = require('express');
const User = require('../models/User');
const Deck = require('../models/Deck');
const Card = require('../models/Card');
const authMiddleware = require('../middleware/auth');
const validator = require('validator');

const router = express.Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', async (req, res) => {
  try {
    const { displayName, preferences } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update display name
    if (displayName !== undefined) {
      if (displayName.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Display name cannot be empty'
        });
      }
      user.displayName = displayName.trim();
    }

    // Update preferences
    if (preferences) {
      if (preferences.theme && ['light', 'dark', 'system'].includes(preferences.theme)) {
        user.preferences.theme = preferences.theme;
      }
      if (preferences.notifications !== undefined) {
        user.preferences.notifications = Boolean(preferences.notifications);
      }
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user.getPublicProfile()
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   PUT /api/users/password
// @desc    Change user password
// @access  Private
router.put('/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password (will be hashed by pre-save middleware)
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get comprehensive user statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's decks
    const userDecks = await Deck.find({ owner: userId });
    const deckIds = userDecks.map(deck => deck._id);

    // Get comprehensive stats
    const totalDecks = userDecks.length;
    const totalCards = await Card.countDocuments({ 
      deck: { $in: deckIds }, 
      status: 'active' 
    });

    const dueCards = await Card.countDocuments({
      deck: { $in: deckIds },
      status: 'active',
      'reviewData.nextReviewDate': { $lte: new Date() }
    });

    const newCards = await Card.countDocuments({
      deck: { $in: deckIds },
      status: 'active',
      'reviewData.reviewCount': 0
    });

    const masteredCards = await Card.countDocuments({
      deck: { $in: deckIds },
      status: 'active',
      'reviewData.easeFactor': { $gte: 2.5 },
      'reviewData.reviewCount': { $gte: 5 }
    });

    // Calculate streak
    const user = await User.findById(userId);
    const streak = user.stats.streak || 0;

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentReviews = await Card.find({
      deck: { $in: deckIds },
      'reviewData.lastReviewDate': { $gte: thirtyDaysAgo }
    }).select('reviewData.lastReviewDate reviewData.successCount reviewData.reviewCount');

    // Calculate daily review counts for the last 30 days
    const dailyReviews = {};
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dailyReviews[dateStr] = 0;
    }

    recentReviews.forEach(card => {
      if (card.reviewData.lastReviewDate) {
        const dateStr = card.reviewData.lastReviewDate.toISOString().split('T')[0];
        if (dailyReviews[dateStr] !== undefined) {
          dailyReviews[dateStr]++;
        }
      }
    });

    // Calculate success rate
    const allCards = await Card.find({ deck: { $in: deckIds }, status: 'active' });
    const totalReviews = allCards.reduce((sum, card) => sum + card.reviewData.reviewCount, 0);
    const totalSuccesses = allCards.reduce((sum, card) => sum + card.reviewData.successCount, 0);
    const successRate = totalReviews > 0 ? (totalSuccesses / totalReviews * 100).toFixed(1) : 0;

    // Time-based stats
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const reviewsThisWeek = await Card.countDocuments({
      deck: { $in: deckIds },
      'reviewData.lastReviewDate': { $gte: lastWeek }
    });

    res.json({
      success: true,
      data: {
        overview: {
          totalDecks,
          totalCards,
          dueCards,
          newCards,
          masteredCards,
          currentStreak: streak,
          totalReviews,
          successRate: parseFloat(successRate)
        },
        activity: {
          reviewsThisWeek,
          dailyReviews: Object.entries(dailyReviews)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, count]) => ({ date, reviews: count }))
        },
        learning: {
          averageReviewsPerDay: reviewsThisWeek / 7,
          masteryPercentage: totalCards > 0 ? (masteredCards / totalCards * 100).toFixed(1) : 0,
          duePercentage: totalCards > 0 ? (dueCards / totalCards * 100).toFixed(1) : 0
        }
      }
    });

  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   DELETE /api/users/account
// @desc    Delete user account and all associated data
// @access  Private
router.delete('/account', async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required to delete account'
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    // Delete all user's decks and cards
    const userDecks = await Deck.find({ owner: user._id });
    const deckIds = userDecks.map(deck => deck._id);
    
    await Card.deleteMany({ deck: { $in: deckIds } });
    await Deck.deleteMany({ owner: user._id });
    
    // Delete user
    await User.findByIdAndDelete(user._id);

    res.json({
      success: true,
      message: 'Account and all associated data deleted successfully'
    });

  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting account',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/users/dashboard
// @desc    Get dashboard data for the user
// @access  Private
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.user._id;

    // Get user's decks
    const userDecks = await Deck.find({ owner: userId })
      .sort({ updatedAt: -1 })
      .limit(5); // Recent 5 decks

    const deckIds = userDecks.map(deck => deck._id);

    // Get due cards count for each deck
    const decksWithDueCards = await Promise.all(
      userDecks.map(async (deck) => {
        const dueCount = await Card.countDocuments({
          deck: deck._id,
          status: 'active',
          'reviewData.nextReviewDate': { $lte: new Date() }
        });
        
        const totalCards = await Card.countDocuments({
          deck: deck._id,
          status: 'active'
        });

        return {
          ...deck.toObject(),
          dueCards: dueCount,
          totalCards
        };
      })
    );

    // Get overall stats
    const totalCards = await Card.countDocuments({ 
      deck: { $in: deckIds }, 
      status: 'active' 
    });

    const dueCards = await Card.countDocuments({
      deck: { $in: deckIds },
      status: 'active',
      'reviewData.nextReviewDate': { $lte: new Date() }
    });

    // Get recent activity (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const recentActivity = await Card.find({
      deck: { $in: deckIds },
      'reviewData.lastReviewDate': { $gte: lastWeek }
    })
    .populate('deck', 'title')
    .sort({ 'reviewData.lastReviewDate': -1 })
    .limit(10);

    const activityData = recentActivity.map(card => ({
      deckTitle: card.deck.title,
      cardFront: card.front.substring(0, 50) + (card.front.length > 50 ? '...' : ''),
      reviewDate: card.reviewData.lastReviewDate,
      success: card.reviewData.successCount > card.reviewData.failureCount
    }));

    res.json({
      success: true,
      data: {
        stats: {
          totalDecks: userDecks.length,
          totalCards,
          dueCards,
          studiedToday: recentActivity.filter(card => {
            const today = new Date();
            const reviewDate = new Date(card.reviewData.lastReviewDate);
            return reviewDate.toDateString() === today.toDateString();
          }).length
        },
        recentDecks: decksWithDueCards,
        recentActivity: activityData
      }
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;