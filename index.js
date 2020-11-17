const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// I'm going to setup my express app
const app = express();

// connect to mongodb
mongoose.connect("mongodb+srv://achille:Dmsig1806110@cluster0.ixyfa.mongodb.net/mybrand?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true }).then(function(){
    console.log('db connected');
}).catch((err)=>{
    console.log(err.message);
});
mongoose.Promise = global.Promise;


// initialize middle ware of body parser
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// initialize routes
app.use('/api',routes);

// Listen for request on specified port
app.listen(process.env.port || 2701, function(){
    console.log('Now listening to requests!');
})