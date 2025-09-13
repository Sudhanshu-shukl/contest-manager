import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Contest name is required'],
    trim: true
  },
  platform: {
    type: String,
    required: [true, 'Platform is required'],
    enum: ['LeetCode', 'Codeforces', 'AtCoder', 'HackerRank', 'CodeChef', 'TopCoder'],
    default: 'LeetCode'
  },
  date: {
    type: Date,
    required: [true, 'Contest date is required']
  },
  time: {
    type: String,
    required: [true, 'Contest time is required']
  },
  link: {
    type: String,
    required: [true, 'Contest link is required'],
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  done: {
    type: Boolean,
    default: false
  },
  skipped: {
    type: Boolean,
    default: false
  },
  questionsSolved: {
    type: Number,
    default: null,
    min: 0
  },
  completedDate: {
    type: Date,
    default: null
  },
  skippedDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
contestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create a compound index for better query performance
contestSchema.index({ date: 1, time: 1 });
contestSchema.index({ platform: 1 });
contestSchema.index({ done: 1 });

export default mongoose.model('Contest', contestSchema);
