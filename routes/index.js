const express = require('express');
// Defining a router
const router = express.Router();
const articleRoute = require('./articles');
const queryRoute = require('./queries');
const profileRoute = require('./profile');
const skillRoute = require('./skills');
const projectRoute = require('./project');
// const commentRoute = require('./comments');
const homeIndex = require('./home');
const authRoute = require('./auth');



router.use('/', homeIndex);
router.use('/articles', articleRoute);
router.use('/queries', queryRoute);
router.use('/profile', profileRoute);
router.use('/skills', skillRoute);
router.use('/projects', projectRoute);
// router.use('/comments', commentRoute);
router.use('/', authRoute);

module.exports = router;

