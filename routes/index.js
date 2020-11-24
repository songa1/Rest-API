const express = require('express');
// Defining a router
const router = express.Router();
const articleRoute = require('./articles');
const queryRoute = require('./queries');
const profileRoute = require('./profile');
const skillRoute = require('./skills');
const projectRoute = require('./project');
const commentRoute = require('./comments');



router.use('/', function(req, res, next){
    res.send("You have now access to my API application, \n It's working!");
}).catch(next);
router.use('/articles', articleRoute);
router.use('/queries', queryRoute);
router.use('/profile', profileRoute);
router.use('/skills', skillRoute);
router.use('/projects', projectRoute);
router.use('/comments', commentRoute);

module.exports = router;

