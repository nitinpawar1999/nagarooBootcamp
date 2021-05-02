const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed');
const methodOverride = require('method-override');

const blogRoutes = require('./routes/blogRoutes');

mongoose
  .connect("mongodb://localhost:27017/blogapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected Succesfully");
  })
  .catch((err) => {
    console.log("DB Error");
    console.log(err);
  });


//SeedDb
//seedDB();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
    res.render('landing');
});

app.use(blogRoutes); 
  
app.listen(8080, () => console.log("Server started at port 8080"));
