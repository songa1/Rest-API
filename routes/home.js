const express = require('express');
const successHandler = require('../helpers/successhandle');
const router = express.Router();

router.get('/', function(req, res, next){
    return successHandler(res, 200, "You have now access to my API application, It's working!"
    );
});


module.exports = router;