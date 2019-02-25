import mongoose from 'mongoose';

//Mongooes custom schema for Comment Model
//collection - commentdetails

let commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500
  },
  user: {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  blogId: {
    type: String,
    require: true
  },
  totalLikeCount: {
    type: Number
  }
});

module.exports = mongoose.model('comments', commentSchema);


