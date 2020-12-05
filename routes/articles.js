const express = require('express');
const JWT = require('jsonwebtoken');
const {getArticles, getOneArticle, postArticles, updateArticles, deleteArticles, postComment, deleteComment} = require('../controller/article');
const getComments = require('../controller/comments');
const upload = require('../upload/articles');
const {requireAuth} = require('../configAuth/authMiddleWare');

const router = express.Router();


router.post('/',requireAuth, upload.single('image'), postArticles);
router.get('/', getArticles);
router.get('/:id', getOneArticle);
router.put('/:id',requireAuth, upload.single('image'), updateArticles);
router.delete('/:id',requireAuth, deleteArticles);

router.post('/:id/comment', postComment);
router.get('/:id/comment', getComments);
router.delete('/:id/comment/:id',requireAuth, deleteComment)


module.exports = router;