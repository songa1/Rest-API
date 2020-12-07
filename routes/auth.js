const express = require('express');
const {loginGet, loginPost, signupPost, logoutGet} = require('../controller/auth');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/signup',requireAuth, signupPost);
router.get('/logout',requireAuth, logoutGet);


module.exports = router;