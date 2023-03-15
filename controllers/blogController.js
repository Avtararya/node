const BlogPost = require("../models/BlogPost");

exports.createBlogPost = (req, res) => {
  const { title, image, content } = req.body;
  const newPost = new BlogPost({ title, image, content });
  newPost
    .save()
    .then((post) => {
      res.status(201).json({ message: "Blog post created", post });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error creating blog post", error: err });
    });
};

exports.deleteBlogPost = (req, res) => {
  const { id } = req.params;
  BlogPost.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Blog post deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting blog post", error: err });
    });
};
