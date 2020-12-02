const express = require('express');
// including article model
const Projects = require('../models/project-schema');
const mongoose = require('mongoose');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');

const getProjects = function(req, res, next){
    Projects.find({}).then(function(project){
        return successHandler(res, 200, 'Successfully got projects', project);
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to get projects', error);
    });
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
        return successHandler(res, 201, 'Successfully added new project', project);
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to add a project', error);
    });
}

const updateProject = function(req, res, next){
    Projects.findByIdAndUpdate({_id: req.params.id},{
        title: req.body.title,
        description: req.body.desc,
        link: req.body.link,
        image: req.file.path
    }).then(function(){
        Projects.findOne({_id: req.params.id}).then(function(project){
            return successHandler(res, 201, 'Project updated', project);
        }).catch((error)=>{
            return errorRes(res, 500, 'Failed to update a project', error);
        });
    })
};

const deleteProjects = function(req, res, next){
    Projects.findByIdAndDelete({_id: req.params.id}).then(function(project){
        return successHandler(res, 200, 'This project has been deleted successfully', project);
        
    }).catch((error)=>{
        return errorRes(res, 500, 'Failed to delete a project', error);
    });
}

module.exports = {
    getProjects,
    addProjects,
    updateProject,
    deleteProjects
}