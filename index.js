const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
mongoose.set('useFindAndModify', false);
require('dotenv').config();

// I'm going to setup my express app
const app = express();

// connect to mongodb
mongoose.connect(process.env.NODE_ENV==='test' ? process.env.dbConnectionTest : process.env.dbConnection, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true }).then((result)=> app.listen(process.env.PORT || 2701, ()=>{
    console.log('Now listening to requests!');
})).then(function(){
    console.log('db connected');
}).catch((err)=>{
    console.log(err.message);
});
mongoose.Promise = global.Promise;

// make uploads folder publicly accessible
app.use('/uploads', express.static('uploads'));
app.use('/uploads/skills', express.static('uploads'));
app.use('/uploads/articles', express.static('uploads'));
app.use('/uploads/user-profile', express.static('uploads'));
app.use('/uploads/projects', express.static('uploads'));


app.use(cookieParser());
// initialize middle ware of body parser
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// initialize routes
app.use('/api',routes);

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send(err.message);
});

// Listen for request on specified port
// app.listen(process.env.PORT || 2701, function(){
//     console.log('Now listening to requests!');
// })
module.exports = app;