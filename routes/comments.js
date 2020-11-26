const express = require('express');
const {getComments, postComments, deleteComments} = require('../controller/comments');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/', postComments);
router.get('/', getComments);
router.delete('/:id',requireAuth, deleteComments);


module.exports = router;