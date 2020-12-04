const express = require('express');
const {loginGet, loginPost, signupPost} = require('../controller/auth');

const router = express.Router();


router.post('/login', loginPost);
router.get('/login', loginGet);
router.post('/signup', signupPost);


module.exports = router;