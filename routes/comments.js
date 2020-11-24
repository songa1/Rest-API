const express = require('express');
const {getComments, postComments, deleteComments} = require('../controller/comments');

const router = express.Router();


router.post('/', postComments);
router.get('/', getComments);
router.delete('/:id', deleteComments);


module.exports = router;