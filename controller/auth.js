
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const successHandler = require('../helpers/successhandle');
const errorRes = require('../helpers/error');

const maxAge = 1000 * 60*60;
const createToken = (id) => {
    return jwt.sign({id}, 'AISGMSchilleranziongaanzayecret', {
        expiresIn: maxAge
    });
}



const loginGet = function(req, res, next){
    try{
        res.send("Login")
    }
    catch {
        next();
    }
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
        return successHandler(res, 201, 'Successfully logged in',);
    }
    catch (err) {
        return errorRes(res, 500, 'Failed to login', error);
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
        return successHandler(res, 201, 'Added a user successfully', user._id);
    }).catch((err)=>{
        return errorRes(res, 500, 'Failed to signup', error);
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

const logoutGet = function(req, res, next){

    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/login');
        return successHandler(res, 200, 'Logout successfully');
    } catch (error){
        return errorRes(res, 500, 'Can not log out', error);
    }
}

module.exports = {
    signupPost,
    loginGet,
    loginPost,
    logoutGet
}