const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title is required"]
    },
    description: {
        type: String
    },
    link: {
        type: String
    },
    image: {
        type: String
    }
});

const Projects = mongoose.model('project', ProjectSchema);

module.exports = Projects;