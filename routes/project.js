const express = require('express');
const {getProjects, addProjects,updateProject, deleteProjects} = require('../controller/project');
const upload = require('../upload/project');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/',requireAuth, upload.single('image'), addProjects);
router.get('/', getProjects);
router.put('/:id',requireAuth, upload.single('image'), updateProject);
router.delete('/:id',requireAuth, deleteProjects);


module.exports = router;