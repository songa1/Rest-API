const mongoose = require('mongoose');
const Comment = require('../models/comments-schema');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title is required"]
    },
    author: {
        type: String,
        default: "Achille Songa"
    },
    summary: {
        type: String,
        required: [false, "Summary is optional"]
    },
    content: {
        type: String,
        required: [false, "Summary is optional"]
    },
    image: {
        type: String
    },
    commentsCount: { 
        type: Number, 
        default: 0 
    },
    createdAt: { 
        type: Date 
    },
    comments: [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Comment' 
    }],
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;