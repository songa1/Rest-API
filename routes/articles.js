const express = require('express');
const JWT = require('jsonwebtoken');
const {getArticles, getOneArticle, postArticles, updateArticles, deleteArticles, postComment} = require('../controller/article');
const getComments = require('../controller/comments');
const upload = require('../upload/articles');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/', upload.single('image'), postArticles);
router.get('/', getArticles);
router.get('/:id', getOneArticle);
router.put('/:id', upload.single('image'), updateArticles);
router.delete('/:id', deleteArticles);

router.post('/:id/comment', postComment);
router.get('/:id/comment', getComments);


module.exports = router;