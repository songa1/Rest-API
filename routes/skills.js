const express = require('express');
const {getSkills, addSkill,updateSkill, deleteSkills} = require('../controller/skills');
const upload = require('../upload/skills');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/', requireAuth, upload.single('image'), addSkill);
router.get('/', getSkills);
router.put('/:id', requireAuth, upload.single('image'), updateSkill);
router.delete('/:id',requireAuth, deleteSkills);


module.exports = router;