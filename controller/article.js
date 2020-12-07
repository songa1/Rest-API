const express = require('express');
// require mongoose
const mongoose = require('mongoose');
// Defining a router
const router = express.Router();
// including article model
const Article = require('../models/article-schema');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');
// including comments model
const Comment = require('../models/comments-schema');


// get articles from the database
const getArticles = function(req, res){
    Article.find({}).then(function(articles){
        if(articles){
        return successHandler(res, 200, 'Successfully got all articles', {
            Articles: articles.length,
            articles
        });
        }else{
            res.status(404).json('Articles not found');
        }
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
            res.status(404).json("Article not found!");
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
    
    const comment = await new Comment({
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

// delete comments
const deleteComment = async (req, res) => {
    
    Comment.findByIdAndDelete({_id: req.params.id}).then(function(comment){
        const post = Article.findById(req.params.id);
        post.commentsCount -=1;

        // if(!post){
        //     res.status('404').json('Article not found!');
        // }else{
        //     post.comments.push(comment._id);
        //     post.commentsCount -= 1;
        //     post.save();
        return successHandler(res, 200, 'This comment has been deleted successfully');
    }).catch((error)=>{
        return errorRes(res, 500, "Can't delete a comment", error);
    });
    //     const post = await Article.findById(req.params.id);
    //     if(!post){
    //         res.status(404).json('Article not found!');
    //     }else{
    //         post.comments.push(comment._id);
    //         post.commentsCount += 1;
    //         await post.save();
    //     }
    //     Comment.findById().then(function(article){
    //         return successHandler(res, 200, 'This article has been deleted successfully');
    //     }).catch((error)=>{
    //         return errorRes(res, 500, "Can't delete a post", error);
    //     });
    // return successHandler(res, 200, 'Comment have been submitted successfully', comment);
    // }).catch(async(err)=>{
    //     return errorRes(res, 500, "Adding comment failed", error);
    // });

};



// exporting
module.exports = {
    getArticles,
    getOneArticle,
    postArticles, 
    updateArticles, 
    deleteArticles,
    postComment,
    deleteComment
};