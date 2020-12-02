const express = require('express');
// including article model
const Query = require('../models/quries-schema');
const mongoose = require('mongoose');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');

const getQueries = function(req, res, next){
    Query.find({}).then(function(query){
        return successHandler(res, 200, 'Successfully got all queries', query);
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to get queries', error);
    });
};

const postQueries = function(req, res, next){
    Query.create(req.body).then(function(query){
        return successHandler(res, 201, 'New message recorded', query);
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to send a message', error);
    });
};

const deleteQueries = function(req, res, next){
    Query.findByIdAndDelete({_id: req.params.id}).then(function(query){
        return successHandler(res, 200, 'Query deleted successfully', query);
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to send a message', error);
    });
}

module.exports = {
    getQueries,
    postQueries,
    deleteQueries
}