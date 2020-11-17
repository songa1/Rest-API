const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// I'm noging to setup my express app\
const app = express();

// connect to mongodb
mongoose.connect('mongodb+srv://achille:dmsig1806110@cluster0.dzess.mongodb.net/achilleblog?retryWrites=true&w=majority');
mongoose.Promise = global.Promise;

// initialize middle ware of body parser
app.use(bodyParser.json());

// initialize routes
app.use('/api',routes);

// Listen for request on specified port
app.listen(process.env.port || 2701, function(){
    console.log('Now listening to requests!');
})