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
  if (req.body == null || req.params.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Map request
  let data = {
    comment: req.body.comment
  };

  // Update Comment
  comments.findByIdAndUpdate(req.params.id, data).then(doc => {
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
  if (req.params.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Delete Blog
  comments.findByIdAndRemove(req.params.id).then(doc => {
    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

// Get all comments service
const getAllComments = (req, res) => {
  if (req.params.id == null) {
    return res.status(403).send('Bad Request');
  }

  // Get all comments
  comments.find({ blogId: req.params.id }).then(doc => {

    return res.status(200).json(doc);
  }).catch(err => {
    res.status(500).json(err);
  });
}

const likeComment = (req, res) => {
  if (req.params.id == null) {
    return res.status(403).send('Bad Request');
  }

  comments.findById(req.params.id).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }

    doc.totalLikeCount = doc.totalLikeCount ? (doc.totalLikeCount + 1) : 1;
    comments.findByIdAndUpdate(req.params.id, { totalLikeCount: doc.totalLikeCount }).then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send('Internal server error');
      }
      return res.status(200).json(doc);
    }).catch(err => {
      res.status(500).json(err);
    });
  }).catch(err => {
    return res.status(500).json(err);
  });
}

const dislikeComment = (req, res) => {
  if (req.params.id == null) {
    return res.status(403).send('Bad Request');
  }

  comments.findById(req.params.id).then(doc => {
    if (!doc || doc.length === 0) {
      return res.status(500).send('Internal server error');
    }

    doc.totalLikeCount = doc.totalLikeCount ? (doc.totalLikeCount - 1) : 0;
    comments.findByIdAndUpdate(req.params.id, { totalLikeCount: doc.totalLikeCount }).then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send('Internal server error');
      }
      return res.status(200).json(doc);
    }).catch(err => {
      res.status(500).json(err);
    });
  }).catch(err => {
    return res.status(500).json(err);
  });
}

export {
  addComment,
  editComment,
  deleteComment,
  getAllComments,
  likeComment,
  dislikeComment
}
