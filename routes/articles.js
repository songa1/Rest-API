const express = require('express');
const {getArticles, getOneArticle, postArticles, updateArticles, deleteArticles} = require('../controller/article');
const upload = require('../upload/articles')

const router = express.Router();


router.post('/',upload.single('image'), postArticles);
router.get('/', getArticles);
router.get('/:id', getOneArticle);
router.put('/:id', upload.single('image'), updateArticles);
router.delete('/:id', deleteArticles);


module.exports = router;