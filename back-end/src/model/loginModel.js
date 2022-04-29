const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    contact:{
        type:Number,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase() === 'password'){
                throw new Error("value can't be PASSWORD");
            }
        }
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
});

userSchema.pre('save',async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next();
});

userSchema.methods.generateAuthToken =  function () {
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse');
    console.log(user._id.toString());
    return token;
};

userSchema.statics.findByCredentials = async (email,password) => {
    
    const user = await User.findOne({email});
    if(!user){
        
        throw new Error('Unable to find user');
    }
    const isMatch = await bcrypt.compare(password,user.password,);

    if(!isMatch){
        throw new Error('Unable to find user');
    }
    return user;
};

const User = mongoose.model('User',userSchema);

module.exports = User;