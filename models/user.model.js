import mongoose from 'mongoose';
import validator from 'validator';

// User Table schema
let UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 50
  },
  token: {
    type: String
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date()
  }
});

// Generate user Auth Token
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  
  // Generate user JWT token
  let token = jwt.sign({
    _id: user._id.toHexString(),
    email: user.email.toHexString()
  }, config.secret).toString();

  // Add token to user collection
  user.token = token;

  return user.save().then(() => {
    return token;
  });
};

module.exports = mongoose.model('users', UserSchema);

