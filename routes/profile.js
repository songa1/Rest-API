const express = require('express');
const {getUsers, addUser, updateUser, deleteUser} = require('../controller/profile');
const upload = require('../upload/articles')
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/', upload.single('image'), addUser);
router.get('/', getUsers);
router.put('/:id', upload.single('image'), updateUser);
router.delete('/:id', deleteUser);


module.exports = router;