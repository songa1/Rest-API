const express = require('express');
const { deleteArticles } = require('../controller/article');
const {getQueries, postQueries, deleteQueries} = require('../controller/queries');
const upload = require('../upload/images')

const router = express.Router();


router.post('/', postQueries);
router.get('/', getQueries);
router.delete('/:id', deleteQueries);


module.exports = router;