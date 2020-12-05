const express = require('express');
const {loginGet, loginPost, signupPost, logoutGet} = require('../controller/auth');

const router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/signup', signupPost);
<<<<<<< HEAD
router.get('/logout', logoutGet);
=======
router.get('/logout', logoutGet)
>>>>>>> main


module.exports = router;