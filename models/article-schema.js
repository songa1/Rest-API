const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, "The title is required"]
    },
    author: {
        type: String,
        required: [true, "The author is needed"]
    },
    summary: {
        type: String
    },
    content: {
        type: String
    },
    image: {
        name: String,
        image: { 
            data: Buffer, 
            contentType: String 
        }
    }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Ninja;