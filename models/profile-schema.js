const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    name: {
        type: String,
        required: [true, "The title is required"]
    },
    role: {
        type: String
    },
    about: {
        type: String,
        required: [false, "Summary is optional"]
    },
    purpose: {
        type: String,
        required: [false, "Summary is optional"]
    },
    image: {
        type: String
    }
});

const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;