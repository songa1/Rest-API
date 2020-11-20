const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuerySchema = new Schema({
    name: {
        type: String,
        required: [false, "Name is required"]
    },
    email: {
        type: String,
        required: [false, "Email is required"]
    },
    message: {
        type: String,
        required: [false, "Message is optional"]
    }
});

const Query = mongoose.model('query', QuerySchema);

module.exports = Query;