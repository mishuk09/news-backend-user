const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors')
const port = 5000
const mongoose = require('mongoose');
const auth = require('./modules/auth.js');
const items = require('./modules/items');
const singlenews = require('./modules/singleItem');
const questionPool = require('./modules/questionPool');
const protestRoutes = require('./modules/protestRoutes.js');
const mostView=require('./modules/mostView.js')
const TopnewsModule =require('./modules/TopnewsModule.js')
const SemiFrontNewsModule =require('./modules/SemiFrontNewsModule.js')

const orderManage = require('./modules/orderManage');
// const cart = resquire('./modules/cart');
const wishlist = require('./modules/wishlist');
const home = require('./modules/home');
const Category = require('./modules/Category');
const New = require('./modules/New');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cors policy
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// MongoDB connection
mongoose.connect(process.env.CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//imported route implement
app.use('/auth', auth);
app.use('/allnews', items);
app.use('/singlenews', singlenews);
app.use('/most-view', mostView);
app.use('/questionPool', questionPool);
app.use('/decision', protestRoutes);
app.use('/top-news', TopnewsModule);
app.use('/semi-top-news', SemiFrontNewsModule);



app.use('/order', orderManage);
// app.use('/cart', cart);
app.use('/wishlist', wishlist);
app.use('/home', home);
app.use('/cate', Category);
app.use('/new', New);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
