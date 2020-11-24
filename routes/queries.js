const express = require('express');
const {getQueries, postQueries, deleteQueries} = require('../controller/queries');
const upload = require('../upload/articles')

const router = express.Router();


router.post('/', postQueries);
router.get('/', getQueries);
router.delete('/:id', deleteQueries);


module.exports = router;