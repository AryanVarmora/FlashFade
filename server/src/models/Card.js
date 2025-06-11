const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck',
    required: true
  },
  front: {
    type: String,
    required: true,
    trim: true
  },
  back: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'archived', 'deleted'],
    default: 'active'
  },
  reviewData: {
    lastReviewDate: {
      type: Date
    },
    nextReviewDate: {
      type: Date
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    successCount: {
      type: Number,
      default: 0
    },
    failureCount: {
      type: Number,
      default: 0
    },
    easeFactor: {
      type: Number,
      default: 2.5,
      min: 1.3
    },
    interval: {
      type: Number,
      default: 0 // Days until next review
    },
    decayLevel: {
      type: Number,
      default: 0, // 0-100, represents visual decay
      min: 0,
      max: 100
    }
  },
  metadata: {
    createdFrom: {
      type: String,
      enum: ['manual', 'import', 'ai'],
      default: 'manual'
    },
    sourceUrl: String,
    attachments: [{
      type: {
        type: String,
        enum: ['image', 'audio', 'video'],
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }]
  }
}, {
  timestamps: true
});

// Indexes for faster queries
cardSchema.index({ deck: 1, status: 1 });
cardSchema.index({ 'reviewData.nextReviewDate': 1 });
cardSchema.index({ tags: 1 });

// Method to calculate decay level
cardSchema.methods.calculateDecay = function() {
  const now = new Date();
  const lastReview = this.reviewData.lastReviewDate || this.createdAt;
  const hoursSinceLastReview = (now - lastReview) / (1000 * 60 * 60);
  
  // Base decay rate from deck settings
  const deckDecayRate = this.deck.settings.decayRate || 1.0;
  
  // Calculate decay level (0-100)
  const decayLevel = Math.min(
    100,
    Math.max(0, (hoursSinceLastReview / 24) * deckDecayRate * 10)
  );
  
  this.reviewData.decayLevel = decayLevel;
  return decayLevel;
};

// Method to update review data after a review
cardSchema.methods.updateReviewData = function(success) {
  const now = new Date();
  this.reviewData.lastReviewDate = now;
  this.reviewData.reviewCount += 1;
  
  if (success) {
    this.reviewData.successCount += 1;
    // Implement SM-2 algorithm for spaced repetition
    const newEaseFactor = this.reviewData.easeFactor + (0.1 - (5 - 5) * (0.08 + (5 - 5) * 0.02));
    this.reviewData.easeFactor = Math.max(1.3, newEaseFactor);
    this.reviewData.interval = this.reviewData.interval === 0 ? 1 :
      this.reviewData.interval === 1 ? 6 :
      Math.round(this.reviewData.interval * this.reviewData.easeFactor);
  } else {
    this.reviewData.failureCount += 1;
    this.reviewData.interval = 1;
  }
  
  // Set next review date
  this.reviewData.nextReviewDate = new Date(now.getTime() + this.reviewData.interval * 24 * 60 * 60 * 1000);
  
  // Reset decay level
  this.reviewData.decayLevel = 0;
};

const Card = mongoose.model('Card', cardSchema);

module.exports = Card; 