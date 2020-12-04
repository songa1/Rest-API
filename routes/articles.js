const express = require('express');
const JWT = require('jsonwebtoken');
const {getArticles, getOneArticle, postArticles, updateArticles, deleteArticles} = require('../controller/article');
const upload = require('../upload/articles');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/', requireAuth, upload.single('image'), postArticles);
router.get('/', getArticles);
router.get('/:id', getOneArticle);
router.put('/:id',requireAuth, upload.single('image'), updateArticles);
router.delete('/:id',requireAuth, deleteArticles);


module.exports = router;