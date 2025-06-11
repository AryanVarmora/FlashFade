const mongoose = require('mongoose');

const deckSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublic: {
    type: Boolean,
    default: false
  },
  settings: {
    decayRate: {
      type: Number,
      default: 1.0, // Multiplier for decay speed
      min: 0.1,
      max: 5.0
    },
    reviewInterval: {
      type: Number,
      default: 24, // Hours between reviews
      min: 1,
      max: 168 // 1 week
    }
  },
  stats: {
    totalCards: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    lastReviewDate: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
deckSchema.index({ owner: 1, title: 1 });
deckSchema.index({ tags: 1 });
deckSchema.index({ isPublic: 1 });

// Method to get public deck info
deckSchema.methods.getPublicInfo = function() {
  const deckObject = this.toObject();
  delete deckObject.owner;
  return deckObject;
};

const Deck = mongoose.model('Deck', deckSchema);

module.exports = Deck; 