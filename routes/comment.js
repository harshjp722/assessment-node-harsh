import express from 'express';
import commentService from '../services/commentService';
import authenticate from '../services/authenticationService';

let router = express.Router();

// router.use(authenticate);

// Add comment on blog
router.post('/addComment', (req, res) => {
  console.log('Add comment to blog api called with request - ', req.body);
  commentService.addComment(req, res);
});

// Update comment on blog
router.put('/editComment/:id', (req, res) => {
  console.log('Edit comment api called with request - ', req.body);
  commentService.editComment(req, res);
});

// Delete comment on blog
router.delete('/deleteComment/:id', (req, res) => {
  console.log('Delete comment api called with request - ', req.body);
  commentService.deleteComment(req, res);
});

// Get all comments on blog
router.get('/getAllBlog/:id', (req, res) => {
  console.log('Get all blog api called with request - ', req.body);
  blogService.getAllBlog(req, res);
});

// Like / Dislike comment on blog
router.post('/likeDislikeComment/:id', (req, res) => {
  console.log('Like / dislike comment api called with request - ', req.body);
  commentService.addLikeDislike(req, res);
});

module.exports = router;
