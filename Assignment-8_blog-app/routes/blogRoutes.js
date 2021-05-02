const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const Blog = require("../modals/blog");
const Comment = require("../modals/comment");

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.render("blogs/index", { blogs });
  } catch (e) {
    console.log("Error Fetching Blogs");
    res.render("error");
  }
});

router.get("/blogs/new", (req, res) => {
   res.render("blogs/new"); 
});

router.post("/blogs", async (req, res) => {
    try{
    const blog = req.body.blog;
    blog.createdOn = new Date();
    await Blog.create(blog);
    res.redirect("/blogs");
    } catch (e) {
        console.log(e);
        res.render('error');
    }
});

router.get("/blogs/:id", async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate('comments');
    res.render("blogs/view", { blog });
});

router.get("/blogs/:id/edit", async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render("blogs/edit", { blog });
});

router.patch("/blogs/:id", async(req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
    res.redirect(`/blogs/${req.params.id}`);
});

router.delete("/blogs/:id", async(req, res) =>{
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/blogs");
});

router.post("/blogs/:id/comment", async(req, res) => {
    const comment = new Comment(req.body.comment); 
    const blog = await Blog.findById(req.params.id);

    blog.comments.push(comment);

    await comment.save();
    await blog.save();

    res.redirect(`/blogs/${req.params.id}`);
});

router.delete("/comment/:id", async(req, res) => {
    
    await Comment.findByIdAndDelete(req.params.id);
    const blog = await Blog.findById(req.body.blogId);
    blog.comments.remove(req.params.id);

    await blog.save();
    res.redirect(`/blogs/${req.body.blogId}`);
});

module.exports = router;
