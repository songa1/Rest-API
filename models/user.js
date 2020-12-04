const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
         type: String,
         required: true,
         minlength: 6
    }
});

userSchema.pre('save', async function(next){
    const salt = await bcryptjs.genSalt();
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})

// static model to login user 
userSchema.statics.login = async (email, password)=> {
    const user = await User.findOne({ email });
    if(user){
        const auth = await bcryptjs.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Password incorrect')
    }
    throw Error('Incorrect email')
}

const User = mongoose.model('user', userSchema);

module.exports = User;