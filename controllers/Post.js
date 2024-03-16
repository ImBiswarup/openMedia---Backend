const Post = require('../models/Post');

exports.uploadPost = (req, res) => {
  let imagePath = '';
  if (req.file) {
    // If a file is included in the request, it's assumed to be an image upload
    imagePath = req.file.path;
  }

  const { userId, content } = req.body;
  
  const newPost = new Post({ user: userId, content, image: imagePath });
  newPost.save()
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to save post' });
    });
};

