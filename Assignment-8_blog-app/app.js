const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

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

const sessionConfig = {
  secret: "!@#$^&*(*()&SADJHG@!@!",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.get("/", (req, res) => {
    res.render('landing');
});

app.use(blogRoutes);

app.get("*", (req, res) => {
  res.render('error');
});
 
  
app.listen(8080, () => console.log("Server started at port 8080"));
