const express = require('express');
// Defining a router
const router = express.Router();
const articleRoute = require('./articles');
const queryRoute = require('./queries');
const profileRoute = require('./profile');
const skillRoute = require('./skills');

router.use('/articles', articleRoute);
router.use('/queries', queryRoute);
router.use('/profile', profileRoute);
router.use('/skills', skillRoute);

module.exports = router;

