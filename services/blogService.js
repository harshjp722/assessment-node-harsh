import blogs from '../models/blog.model';

// Add new blog service
const addBlog = (req, res) => {
  if (req.body == null) {
    return res.status(403).send('Bad Request');
  }

  // Map request
  let blogData = new blogs({
    title: req.body.title,
    content: req.body.content,
    author: {
      userId: req.user.id,
      name: req.user.firstName + ' ' + req.user.lastName
    }
  });

  // Save Blog
  blogData.save().then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Update blog service
const editBlog = (req, res) => {
  if (req.body == null || req.query.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Map request
  let blogData = new blogs({
    title: req.body.title,
    content: req.body.content
  });

  // Update Blog
  blogs.findByIdAndUpdate(req.query.id, blogData).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Delete blog service
const deleteBlog = (req, res) => {
  if (req.query.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Delete Blog
  blogs.findByIdAndRemove(req.query.id).then(doc => {    
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Get all blogs service
const getAllBlog = (req, res) => {
  // Get all Blogs
  blogs.find().then(doc => { 
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

export {
  getAllBlog,
  deleteBlog,
  editBlog,
  addBlog
}
