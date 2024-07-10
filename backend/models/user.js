const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    
    
    
});

userSchema.set('toJSON', {
    virtuals:true
});

const User = mongoose.model('User', userSchema);
module.exports = User;