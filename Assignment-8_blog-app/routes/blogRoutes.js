const express = require("express");
const router = express.Router();
const Blog = require("../modals/blog");
const Comment = require("../modals/comment");

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.render("blogs/index", { blogs });
  } catch (e) {
    console.log("Error Fetching Blogs");
    req.flash("error","Error in loading Blogs, Try Again!!!");
    res.redirect("/error");
  }
});

router.get("/blogs/new", (req, res) => {
   res.render("blogs/new"); 
});

router.post("/blogs", async (req, res) => {
    try {
      const blog = req.body.blog;
      blog.createdOn = new Date();
      await Blog.create(blog);
      req.flash("success", "Successfully Created a new Blog!!!");
      res.redirect("/blogs");
    } catch (e) {
      console.log(e);
      res.redirect("/error");
    }
});

router.get("/blogs/:id", async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('comments');
        res.render("blogs/view", { blog });
    } catch (e){
        console.log(e);
        req.flash("error", "Error Loading Blog !!!")
        res.redirect("/error");
    }
    
});

router.get("/blogs/:id/edit", async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('comments');
        res.render("blogs/edit", { blog });
    } catch(e) {
        console.log(e);
        req.flash("error", "Error Fetching Blog !!!")
        res.redirect("/error");
    }
    
});

router.patch("/blogs/:id", async(req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
        req.flash("success", "Blog Updated Successfully");
        res.redirect(`/blogs/${req.params.id}`);
    } catch (e){
        console.log(e);
        req.flash("error", "Error Editing Blog !!!")
        res.redirect("/error");
    }
});

router.delete("/blogs/:id", async(req, res) =>{
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect("/blogs");
    } catch(e) {
        console.log(e);
        req.flash("error", "Error Deleting Blog !!!")
        res.redirect("/error");        
    }
    
});

router.post("/blogs/:id/comment", async(req, res) => {

    try {
        const comment = new Comment(req.body.comment); 
        const blog = await Blog.findById(req.params.id);
    
        blog.comments.push(comment);
    
        await comment.save();
        await blog.save();
    
        res.redirect(`/blogs/${req.params.id}`);
    } catch(e){
        console.log(e);
        req.flash("error", "Error Adding Comment Blog !!!")
        res.redirect("/error");
    }
    
});

router.delete("/comment/:id", async(req, res) => {
    
    try {
        await Comment.findByIdAndDelete(req.params.id);
        const blog = await Blog.findById(req.body.blogId);
        blog.comments.remove(req.params.id);
    
        await blog.save();
        res.redirect(`/blogs/${req.body.blogId}`);
    } catch(e) {
        console.log(e);
        req.flash("error", "Error Deleting Comment Blog !!!")
        res.redirect("/error");
    }
    
});

router.get("/error", (req, res) => {
    res.status(404).render('error');
});


module.exports = router;
