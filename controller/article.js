const express = require('express');
// require mongoose
const mongoose = require('mongoose');
// Defining a router
const router = express.Router();
// including article model
const Article = require('../models/article-schema');
// including comments model
const Comments = require('../models/comments-schema');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');


// get articles from the database
const getArticles = function(req, res){
    Article.find({}).then(function(articles){
        return successHandler(res, 200, 'Successfully got all articles', {
            Articles: articles.length,
            articles
        });
    }).catch((error)=>{
        return errorRes(res, 500, 'Error getting articles', error);
    });
}

// get single article
const getOneArticle = function(req, res){
    Article.findOne({_id: req.params.id}).then(function(article){
        if(article){
            return successHandler(res, 201, 'Got single article', article);
        }else{
            res.json("Article not found!");
            console.log("Article not found!");
        } 
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to get an article', error);
    });
}

// upload articles to the database
const postArticles = async (req, res)=>{
    const article = await new Article({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        content: req.body.content,
        image: req.file.path,
        commentsCount: 0,
        createdAt: Date.now()
    });
    article.save().then(async(article)=>{
        return successHandler(res, 201, 'New article created successfully', article);
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to create an article', error);
    });
}


// update articles from the database
const updateArticles = function(req, res){
    Article.findByIdAndUpdate({_id: req.params.id},{
        title: req.body.title,
        author: req.body.author,
        summary: req.body.summary,
        content: req.body.content,
        image: req.file.path
    }).then(function(){
        Article.findOne({_id: req.params.id}).then(function(article){
            return successHandler(res, 201, 'Article updated successfuly', article);
        }).catch((error)=>{
            return errorRes(res, 500, 'There was a problem while updating an article', error);
        });
    })
};

// delete articles from the database

const deleteArticles = function(req, res){
    Article.findByIdAndDelete({_id: req.params.id}).then(function(article){
        return successHandler(res, 200, 'This article has been deleted successfully');
    }).catch((error)=>{
        return errorRes(res, 500, "Can't delete a post", error);
    });
}

// post comments
const postComment = async (req, res) => {
    
    const comment = await new Comments({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        comment: req.body.comment,
        createdAt: Date.now(),
    });
    comment.save().then(async(comment)=>{
        
        const post = await Article.findById(req.params.id);
        if(!post){
            res.status(404).json('Article not found!');
        }else{
            post.comments.push(comment._id);
            post.commentsCount += 1;
            await post.save();
        }
    return successHandler(res, 200, 'Comment have been submitted successfully', comment);
    }).catch(async(err)=>{
        return errorRes(res, 500, "Adding comment failed", error);
    });

};

// get comments

const getComments = async (req, res)=>{
    try {
        let postFound = await Article.findById(req.params.id)
        .populate('comments')
        .sort({ time: -1 });

        
            return successHandler(
                res,
                200,
                'successfully fetched all comments',
                postFound
              );
        
      } catch (error) {
            console.log(error.message);
            return errorRes(res, 500, 'Error while fetching comments', error);
      }
}

const GetOneComment = async (req, res) => {
    try {
        const oneComment = await Comments.findOne(req.params.id);
        return successHandler(res, 200, 'this is one comment', oneComment);
    } catch (error) {
        return errorRes(res, 500, 'failed to fetch that');
    }
  };

// exporting
module.exports = {
    getArticles,
    getOneArticle,
    postArticles, 
    updateArticles, 
    deleteArticles,
    postComment,
    getComments,
    GetOneComment
};