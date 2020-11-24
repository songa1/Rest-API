const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('dotenv').config();

// I'm going to setup my express app
const app = express();

// connect to mongodb
mongoose.connect(process.env.dbConnection, { useNewUrlParser: true , useUnifiedTopology: true }).then(function(){
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

// initialize middle ware of body parser
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// initialize routes
app.use('/api',routes);

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err);
    res.status(422).send({error: err.message});
});

// Listen for request on specified port
app.listen(process.env.port || 2701, function(){
    console.log('Now listening to requests!');
})