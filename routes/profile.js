const express = require('express');
const {getUsers, getOneUser, addUser, updateUser, deleteUser} = require('../controller/profile');
const upload = require('../upload/images')

const router = express.Router();


router.post('/',upload.single('image'), addUser);
router.get('/', getUsers);
router.get('/:id', getOneUser);
router.put('/:id', upload.single('image'), updateUser);
router.delete('/:id', deleteUser);


module.exports = router;