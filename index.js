const express = require('express');

// I'm noging to setup my express app\
const app = express();


// Listen for request on specified port
app.listen(process.env.port || 4000, function(){
    console.log('Now listening to requests!');
})