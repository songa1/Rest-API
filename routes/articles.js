const express = require('express');
const {getArticles, getOneArticle, postArticles, updateArticles, deleteArticles} = require('../controller/article');
const upload = require('../upload/images')

const router = express.Router();


router.post('/',upload.single('image'), postArticles);
router.get('/', getArticles);
router.get('/:id', getOneArticle);
router.put('/:id', updateArticles);
router.delete('/:id', deleteArticles);


module.exports = router;