const express = require('express');
const {blogPost, getAllBlogs, getOneBlogPost, makeLikeUnlike, saveComment, getCommentatorProfile} = require('../controllers/blogPost.controller');
const router = express.Router();

router.post("/new", blogPost)
router.get("/all", getAllBlogs)
router.get("/:id", getOneBlogPost)
router.put("/like/:id", makeLikeUnlike)
router.post ("/comment", saveComment)
router.get ("/commentator/:email", getCommentatorProfile)


module.exports=router;