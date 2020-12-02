const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
    title: {
        type: String,
        required: [false, "The title is optional"]
    },
    category: {
        type: String,
        required: [true, "Summary is optional"]
    },
    image: {
        type: String,
        required: [false, "Image is not required"]
    }
});

const Skill = mongoose.model('sklill', SkillSchema);

module.exports = Skill;