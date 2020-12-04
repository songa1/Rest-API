
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');


const maxAge = 1000 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'AISGMSchilleranziongaanzayecret', {
        expiresIn: maxAge
    });
}



const loginGet = async (req, res)=> {
    res.send("Login");
};
const loginPost = async (req, res, next)=>{
    const { email, password } = req.body;
   
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true, 
            maxAge: maxAge * 48
        })
        res.status(200).json({user: user._id, token});
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err.message)
    }

    // const user = User.login(email, password).then(function(user){
    //     res.status(200).json({user: user._id})
    // }).catch(next);
};
const signupPost = function(req, res, next){
    User.create(req.body).then(function(user){
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true, 
            maxAge: maxAge * 48
        })
        res.send({user: user._id});
    }).catch((err)=>{
        res.status(400).send("User not created!"+ " "+err.message);
    });
};
const logoutGet = function(req, res, next){

    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/login');
        res.status(200).json('Logout successfully');
    } catch (error){
        res.status(500).json('Can not log out');
    }
}

module.exports = {
    signupPost,
    loginGet,
    loginPost,
    logoutGet
}