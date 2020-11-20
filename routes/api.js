const express = require('express');
// Defining a router
const router = express.Router();
const Article = require('../models/article-schema');
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+file.originalname);
    }
});

// filtering some types of images
const fileFilter = (req, file, cb)=>{
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
        cb(null, true);
    }else{
        cb(null, false);
    };
};

// defining upload basics
const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024*1024*7
    },
    fileFilter: fileFilter
});

// get articles from the database
router.get('/articles', function(req, res, next){
    Article.find({}).then(function(articles){
        res.send(articles);
    }).catch(next);
})

// upload articles from the database
router.post('/articles',upload.single('image'), function(req, res, next){
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