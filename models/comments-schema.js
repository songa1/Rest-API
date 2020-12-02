const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: {
        type: String,
        default: "Unknown"
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date
    }
});

const Comments = mongoose.model('comment', CommentSchema);

module.exports = Comments;