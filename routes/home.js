const express = require('express');

const router = express.Router();

router.get('/', function(req, res, next){
    res.send("You have now access to my API application, It's working!");
});


module.exports = router;