const express = require('express');

// Defining a router
const router = express.Router();

//using router to create routes


// get articles from the database
router.get('/articles', function(req, res){
    res.send({type: 'GET'});
})

// upload articles from the database
router.post('/articles', function(req, res){
    res.send({type: 'POST'});
})

// update articles from the database
router.put('/articles/:id', function(req, res){
    res.send({type: 'PUT'});
})

// delete articles from the database
router.delete('/articles/:id', function(req, res){
    res.send({type: 'DELETE'});
})


module.exports = router;