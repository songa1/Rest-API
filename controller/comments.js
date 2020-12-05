const express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/article-schema');
const Comment = require('../models/comments-schema');

const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');

// get comments

const getComments = async (req, res)=>{

    try{
        let post = await Article.findById(req.params.id)
        .populate('comments');
            
        
        if(post.comments==0){
            res.status(404).json('No comments for this post');
        }else{
            return successHandler(res, 200, 'Successfully got all comments', 
                post.comments
            );
        }
        }catch(error){
            return errorRes(res, 500, 'Error getting comments', error);
        };
                
}

module.exports = getComments;