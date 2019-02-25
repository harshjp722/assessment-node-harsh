import comments from '../models/comment.model';

// Add new comment service
const addComment = (req, res) => {
  if (req.body == null) {
    return res.status(403).send('Bad Request');
  }

  // Map request
  let data = new comments({
    comment: req.body.comment,
    user: {
      userId: req.user.id,
      name: req.user.firstName + ' ' + req.user.lastName
    },
    blogId: req.body.blogId
  });

  // Save Comment
  data.save().then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Update comment service
const editComment = (req, res) => {
  if (req.body == null || req.query.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Map request
  let data = new comments({
    comment: req.body.comment
  });

  // Update Comment
  comments.findByIdAndUpdate(req.query.id, data).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Delete comment service
const deleteComment = (req, res) => {
  if (req.query.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Delete Blog
  comments.findByIdAndRemove(req.query.id).then(doc => {    
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Get all comments service
const getAllComments = (req, res) => {
  if (req.query.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Get all comments
  comments.find({ blogId: req.query.id}).then(doc => { 
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

const likeDislikeComment = (req, res) => {
  if (req.query.id == null) {
    return res.status(403).send('Bad Request');
  }

  let commentData;
  comments.findById(req.query.id).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    commentData = doc;
  }).catch(err => {
    return res.status(500).json(err);
  });

  commentData.totalLikeCount = commentData.totalLikeCount != null ? (commentData.totalLikeCount + 1) : 1;
  comments.findByIdAndUpdate(req.query.id, commentData).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

export {
  addComment,
  editComment,
  deleteComment,
  getAllComments,
  likeDislikeComment
}
