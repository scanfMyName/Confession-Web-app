const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');

// express app
const app = express();
// app.listen(3000);
const PORT = process.env.PORT || 3000;
// connect to mongodb & listen for requests
// const dbURI = "mongodb+srv://netninja:test1234@net-ninja-tuts-del96.mongodb.net/node-tuts";
const dbURI = "mongodb+srv://MayankGarg:MyUniverse@notemaking.m0xl1.mongodb.net/test";
const connectDB = async () => {
  await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));
}
connectDB();
// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('pub'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/confessions');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/confessions', noteRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
// notes = confessions