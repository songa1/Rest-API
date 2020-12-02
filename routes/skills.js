const express = require('express');
const {getSkills, addSkill,updateSkill, deleteSkills} = require('../controller/skills');
const upload = require('../upload/skills');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/', upload.single('image'), addSkill);
router.get('/', getSkills);
router.put('/:id', upload.single('image'), updateSkill);
router.delete('/:id', deleteSkills);


module.exports = router;