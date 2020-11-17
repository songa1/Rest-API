const mongoose = require('mongoose');

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
    }
});

const Article = mongoose.model('article', ArticleSchema);

module.exports = Article;