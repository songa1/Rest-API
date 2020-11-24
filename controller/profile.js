const express = require('express');
// Defining a router
const router = express.Router();
// including profile model
const Profile = require('../models/profile-schema');
const mongoose = require('mongoose');

// get users from the database
const getUsers = function(req, res, next){
    Profile.find({}).then(function(profile){
        res.send(profile);
    }).catch(next);
}

// get single user
const getOneUser = function(req, res, next){
    Profile.findOne({_id: req.params.id}).then(function(profile){
        if(profile){
            res.send(profile);
        }else{
            res.send("User  not found!");
            console.log("User not found!");
        } 
    }).catch(next);
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
        res.send(`New user added successfully: ${profile}`);
    }).catch(next);
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
            res.send(`Profile have been updated successfuly: ${profile}`);
        }).catch(next);
    })
};

// delete users from the database

const deleteUser = function(req, res, next){
    Profile.findByIdAndDelete({_id: req.params.id}).then(function(profile){
        res.send(`This user has been deleted successfully: ${profile}`);
    }).catch(next);
}

// exporting
module.exports = {
    getUsers,
    getOneUser,
    addUser, 
    updateUser, 
    deleteUser
};