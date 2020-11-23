const express = require('express');
// including article model
const Query = require('../models/quries-schema');
const mongoose = require('mongoose');

const getQueries = function(req, res, next){
    Query.find({}).then(function(query){
        res.send(query);
    }).catch(next);
};

const postQueries = function(req, res, next){
    Query.create(req.body).then(function(query){
        res.send(query);
    }).catch(next);
};

const deleteQueries = function(req, res, next){
    Query.findByIdAndDelete({_id: req.params.id}).then(function(query){
        res.send(`This message has been deleted successfully: ${query}`);
    }).catch(next);
}

module.exports = {
    getQueries,
    postQueries,
    deleteQueries
}