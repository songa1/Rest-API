const express = require('express');
const {getUsers, addUser, updateUser, deleteUser} = require('../controller/profile');
const upload = require('../upload/articles')
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/',requireAuth, upload.single('image'), addUser);
router.get('/', getUsers);
router.put('/:id',requireAuth, upload.single('image'), updateUser);
router.delete('/:id',requireAuth, deleteUser);


module.exports = router;