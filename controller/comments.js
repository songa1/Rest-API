// const express = require('express');
// const Comments = require('../models/comments-schema');
// const mongoose = require('mongoose');

// const getComments = function(req, res, next){
//     Comments.find({}).then(function(comment){
//         res.send(comment);
//     }).catch(next);
// };

// const postComments = function(req, res, next){
//     // Comments.create().then(function(comment){
//     //     res.send(comment);
//     // }).catch(next);
//     const comment = new Comments({
//         name: req.body.name,
//         comment: req.body.comment
//     }).save().then(function(comment){
//         res.send(comment);
//     });
// };

// const deleteComments = function(req, res, next){
//     Comments.findByIdAndDelete({_id: req.params.id}).then(function(comment){
//         res.send(`This comment has been deleted successfully: ${comment}`);
//     }).catch(next);
// }

// module.exports = {
//     getComments,
//     postComments,
//     deleteComments
// }