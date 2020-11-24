const express = require('express');
// including article model
const Projects = require('../models/project-schema');
const mongoose = require('mongoose');

const getProjects = function(req, res, next){
    Projects.find({}).then(function(project){
        res.send(project);
    }).catch(next);
};

const addProjects = function(req, res, next){
    const project = new Projects({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        image: req.file.path
    });
    project.save().then(function(project){
        res.send(`New project added successfully: ${project}`);
    }).catch(next);
}

const updateProject = function(req, res, next){
    Projects.findByIdAndUpdate({_id: req.params.id},{
        title: req.body.title,
        description: req.body.desc,
        link: req.body.link,
        image: req.file.path
    }).then(function(){
        Projects.findOne({_id: req.params.id}).then(function(project){
            res.send(`Project have been updated successfuly: ${project}`);
        }).catch(next);
    })
};

const deleteProjects = function(req, res, next){
    Projects.findByIdAndDelete({_id: req.params.id}).then(function(project){
        res.send(`This project has been deleted successfully: ${project}`);
    }).catch(next);
}

module.exports = {
    getProjects,
    addProjects,
    updateProject,
    deleteProjects
}