const express = require('express');
// Defining a router
const router = express.Router();
// including skill model
const Skill = require('../models/skills-schema');
const mongoose = require('mongoose');

// get skills from the database
const getSkills = function(req, res, next){
    Skill.find({}).then(function(skill){
        res.send(skill);
    }).catch(next);
}

// upload skills to the database
const addSkill = function(req, res, next){
    const skill = new Skill({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        category: req.body.category,
        image: req.file.path
    });
    skill.save().then(function(skill){
        res.send(`New skill added successfully: ${skill}`);
    }).catch(next);
}

// update skills from the database

const updateSkill = function(req, res, next){
    Skill.findByIdAndUpdate({_id: req.params.id},{
        title: req.body.title,
        category: req.body.category,
        image: req.file.path
    }).then(function(){
        Skill.findOne({_id: req.params.id}).then(function(skill){
            res.send(`Skills have been updated successfuly: ${skill}`);
        }).catch(next);
    })
};

// delete skills from the database

const deleteSkills = function(req, res, next){
    Skill.findByIdAndDelete({_id: req.params.id}).then(function(skill){
        res.send(`This skill has been deleted successfully: ${skill}`);
    }).catch(next);
}

// exporting
module.exports = {
    getSkills,
    addSkill,
    updateSkill, 
    deleteSkills
};