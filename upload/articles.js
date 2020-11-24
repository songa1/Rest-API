const multer = require('multer');
const express = require('express');

// defining storage for files
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/articles');
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+"-"+file.originalname);
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


module.exports = upload;

