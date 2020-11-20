const express = require('express');
// Defining a router
const router = express.Router();
// including article model
const Article = require('../models/article-schema');
const mongoose = require('mongoose');

// get articles from the database
const getArticles = function(req, res, next){
    Article.find({}).then(function(articles){
        res.send(articles);
    }).catch(next);
}

// get single article
const getOneArticle = function(req, res, next){
    Article.findOne({_id: req.params.id}).then(function(article){
        if(article == 0){
            res.send("Article not found!");
            console.log("Article not found!");
        }else{
            res.send(article);
        } 
    }).catch(next);
}

// upload articles to the database
const postArticles = function(req, res, next){
    console.log(req.file);
    const article = new Article({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        content: req.body.content,
        image: req.file.path
    });
    article
    .save()
    .then(function(article){
        res.send(`Article have been submitted. It incudes this information: ${article}`);
    }).catch(next);
}

// update articles from the database

const updateArticles = function(req, res, next){
    Article.findByIdAndUpdate({_id: req.params.id}, req.body, req.file).then(function(){
        Article.findOne({_id: req.params.id}).then(function(article){
            res.send(article);
        }).catch(next);
    })
};

// delete articles from the database

const deleteArticles = function(req, res, next){
    Article.findByIdAndDelete({_id: req.params.id}).then(function(article){
        res.send(`This article has been deleted successfully: ${article}`);
    }).catch(next);
}

// exporting
module.exports = {
    getArticles,
    getOneArticle,
    postArticles, 
    updateArticles, 
    deleteArticles
};