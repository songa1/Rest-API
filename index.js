const express = require('express');
const routes = require('./routes/api');

// I'm noging to setup my express app\
const app = express();

// initialize routes
app.use('/api',routes);

// Listen for request on specified port
app.listen(process.env.port || 2701, function(){
    console.log('Now listening to requests!');
})