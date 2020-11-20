const express = require('express');
// Defining a router
const router = express.Router();
const articleRoute = require('./articles');
const { route } = require('./queries');
const queryRoute = require('./queries');

router.use('/articles', articleRoute);
router.use('/queries', queryRoute);

module.exports = router;

