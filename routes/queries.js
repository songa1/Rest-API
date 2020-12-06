const express = require('express');
const {getQueries, postQueries, deleteQueries} = require('../controller/queries');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/', postQueries);
router.get('/',requireAuth, getQueries);
router.delete('/:id',requireAuth, deleteQueries);


module.exports = router;