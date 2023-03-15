const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/blog", blogController.createBlogPost);
router.delete("/blog/:id", blogController.deleteBlogPost);

module.exports = router;
