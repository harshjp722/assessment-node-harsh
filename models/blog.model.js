import mongoose from 'mongoose';

// Blogs Table schema
let BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 150
  },
  content: {
    type: String,
    required: true,
    minlength: 10 // This can be set to higher limit after testing
  },
  author: {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date()
  }
});

module.exports = mongoose.model('blogs', BlogSchema);
