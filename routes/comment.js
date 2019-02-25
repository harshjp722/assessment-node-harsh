import express from 'express';
import * as commentService from '../services/commentService';
import * as authenticateService from '../services/authenticationService';

let router = express.Router();

router.use(authenticateService.authenticate);

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
router.get('/getAllBlogComments/:id', (req, res) => {
  console.log('Get all blog api called with request - ', req.body);
  commentService.getAllComments(req, res);
});

// Like comment on blog
router.get('/likeComment/:id', (req, res) => {
  console.log('Like comment api called with request - ', req.body);
  commentService.likeComment(req, res);
});

// Dislike comment on blog
router.get('/dislikeComment/:id', (req, res) => {
  console.log('Dislike comment api called with request - ', req.body);
  commentService.dislikeComment(req, res);
});

module.exports = router;
