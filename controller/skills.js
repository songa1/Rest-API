const express = require('express');
// Defining a router
const router = express.Router();
// including skill model
const Skill = require('../models/skills-schema');
const mongoose = require('mongoose');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');

// get skills from the database
const getSkills = function(req, res, next){
    Skill.find({}).then(function(skill){
        return successHandler(res, 200, 'Got skills', {
            skill
        });
    }).catch((error)=>{
        return errorRes(res, 500, 'Can not get skills', error);
    });
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
        return successHandler(res, 201, 'Skill added', {
            skill
        });
    }).catch((error)=>{
        return errorRes(res, 500, 'Can not add skill', error);
    });
}

// update skills from the database

const updateSkill = function(req, res, next){
    Skill.findByIdAndUpdate({_id: req.params.id},{
        title: req.body.title,
        category: req.body.category,
        image: req.file.path
    }).then(function(){
        Skill.findOne({_id: req.params.id}).then(function(skill){
            return successHandler(res, 201, 'Skill updated', {
                skill
            });
        }).catch((error)=>{
            return errorRes(res, 500, 'Can not update skill', error);
        });
    })
};

// delete skills from the database

const deleteSkills = function(req, res, next){
    Skill.findByIdAndDelete({_id: req.params.id}).then(function(skill){
        return successHandler(res, 200, 'Skill deleted', {
            skill
        });
    }).catch((error)=>{
        return errorRes(res, 500, 'Can not delete skill', error);
    });
}

// exporting
module.exports = {
    getSkills,
    addSkill,
    updateSkill, 
    deleteSkills
};