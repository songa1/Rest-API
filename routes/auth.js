const express = require('express');
const {loginGet, loginPost, signupPost, logoutGet} = require('../controller/auth');

const router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/signup', signupPost);
router.get('/logout', logoutGet);


module.exports = router;