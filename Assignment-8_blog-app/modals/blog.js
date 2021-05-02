const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;