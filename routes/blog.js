import express from 'express';
import * as blogService from '../services/blogService';
import * as authenticateService from '../services/authenticationService';

let router = express.Router();

router.use(authenticateService.authenticate);

// Post new blog
router.post('/addBlog', (req, res) => {
  console.log('Add blog api called with request - ', req.body);
  blogService.addBlog(req, res);
});

// Updated blog
router.put('/editBlog/:id', (req, res) => {
  console.log('Edit blog api called with request - ', req.body);
  blogService.editBlog(req, res);
});

// Delete Blog
router.delete('/deleteBlog/:id', (req, res) => {
  console.log('Delete blog api called with request - ', req.body);
  blogService.deleteBlog(req, res);
});

// Get all blogs
router.get('/getAllBlog', (req, res) => {
  console.log('Get all blog api called with request - ', req.body);
  blogService.getAllBlog(req, res);
});

module.exports = router;
