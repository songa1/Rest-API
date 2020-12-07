const jwt = require('jsonwebtoken');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');

const requireAuth = (req, res, next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        return errorRes(res, 500, 'Login to continue');
    }
}

module.exports = { requireAuth };