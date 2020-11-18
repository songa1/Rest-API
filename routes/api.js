const express = require('express');
// Defining a router
const router = express.Router();
const Article = require('../models/article-schema');

// get articles from the database
router.get('/articles', function(req, res, next){
    Article.find({}).then(function(articles){
        res.send(articles);
    }).catch(next);
})

// upload articles from the database
router.post('/articles', function(req, res, next){
    Article.create(req.body).then(function(article){
        res.send(`Article have been submitted. It incudes this ${article}`);
    }).catch(next);
})

// update articles from the database
router.put('/articles/:id', function(req, res, next){
    Article.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Article.findOne({_id: req.params.id}).then(function(article){
            res.send(article);
        }).catch(next);
    })
})

// delete articles from the database
router.delete('/articles/:id', function(req, res, next){
    Article.findByIdAndDelete({_id: req.params.id}).then(function(article){
        res.send(`This article has been deleted successfully: ${article}`);
    }).catch(next);
})


module.exports = router;