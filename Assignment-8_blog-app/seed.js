const mongoose = require('mongoose');
const Blog = require('./modals/blog');

const blogs = [
  {
    blogName: "Somthing 1",
    author: "someone 1",
    content: "somestuff 1",
    createdOn: new Date(),
  },
  {
    blogName: "Somthing 2",
    author: "someone 2",
    content: "somestuff 2",
    createdOn: new Date(),
  },
  {
    blogName: "Somthing 3",
    author: "someone 3",
    content: "somestuff 3",
    createdOn: new Date(),
  },
];

const seedDB = async () => {
  await Blog.insertMany(blogs);
  console.log("DB seeded");
}

module.exports = seedDB;