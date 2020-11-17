const express = require('express');
// Defining a router
const router = express.Router();
const Article = require('../models/article-schema');

//using router to create routes


// get articles from the database
router.get('/articles', function(req, res){
    res.send({type: 'GET'});
})

// upload articles from the database
router.post('/articles', function(req, res){
    Article.create(req.body).then(function(article){
        res.send(`Article have been submitted. It incudes this ${article}`);
    }).catch((err)=>{
        res.send(err.message)
    });
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