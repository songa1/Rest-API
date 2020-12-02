const express = require('express');
// Defining a router
const router = express.Router();
// including profile model
const Profile = require('../models/profile-schema');
const mongoose = require('mongoose');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');

// get users from the database
const getUsers = function(req, res, next){
    Profile.find({}).then(function(profile){
        return successHandler(res, 200, 'Successfully got owner',
            profile
        );
    }).catch((error)=>{
        return errorRes(res, 500, 'Can not get owner', error);
    });
}

// get single user
const getOneUser = function(req, res, next){
    Profile.findOne({_id: req.params.id}).then(function(profile){
        if(profile){
            return successHandler(res, 200, 'Got one owner',
            profile
        );
        }else{
            res.send("User  not found!");
            console.log("User not found!");
        } 
    }).catch((error)=>{
        return errorRes(res, 500, 'Can not get owner', error);
    });
}

// upload user to the database
const addUser = function(req, res, next){
    const profile = new Profile({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        role: req.body.role,
        about: req.body.about,
        purpose: req.body.purpose,
        image: req.file.path
    });
    profile.save().then(function(profile){
        return successHandler(res, 201, 'Successfully added owner',
            profile
        );
    }).catch((error)=>{
        return errorRes(res, 500, 'Can not add owner', error);
    });
}

// update users from the database

const updateUser = function(req, res, next){
    Profile.findByIdAndUpdate({_id: req.params.id},{
        name: req.body.name,
        role: req.body.role,
        about: req.body.about,
        purpose: req.body.purpose,
        image: req.file.path
    }).then(function(){
        Profile.findOne({_id: req.params.id}).then(function(profile){
            return successHandler(res, 201, 'Successfully updated owner info',
            profile
        );
        }).catch((error)=>{
            return errorRes(res, 500, 'Can not update owner info', error);
        });
    })
};

// delete users from the database

const deleteUser = function(req, res, next){
    Profile.findByIdAndDelete({_id: req.params.id}).then(function(profile){
        return successHandler(res, 200, 'This owner has been deleted successfully',
            profile
        );
    }).catch((error)=>{
        return errorRes(res, 500, 'Can not delete owner', error);
    });
}

// exporting
module.exports = {
    getUsers,
    getOneUser,
    addUser, 
    updateUser, 
    deleteUser
};