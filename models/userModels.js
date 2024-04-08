const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:[true, 'Please provide the name']
    },
    email:{
        type: String,
        required:[true, 'Please provide your email address'],
        unique:true,
        lowercase:true,
        validate: [validator.isEmail, 'Please provide a valid email address!...']
    },
    photo:{
        type: String,
        default: 'default.jpg'
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'Please provide a password!'],
        minlength:8,
        select:false,
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator:function(el){
                return el === this.password
            },
            message:'Password confirmation does not match the original password'
        }
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    }

});

// code to encrypt the password when you initially create the user
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    // hash the password
    this.password = await bcrypt.hash(this.password,12);

    // delete the passwordCOnfirm field since we need it just for confirmation
    this.passwordConfirm = undefined;
    next();
})

//Code to encrypt the password when you make update 
userSchema.pre('findOneAndUpdate',async function(next){
    const update = this.getUpdate();
    if(update.password !== '' && update.password !== undefined && update.password == update.passwordConfirm)
    {
        //If this condition is fulfilled, hash the password
        this.getUpdate().password = await bcrypt.hash(update.password,12);

        // Similarly, delete the password confirm field
        update.passwordConfirm = undefined;
        next();
    }
    else{
        next();
    }
})

// comparing two password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword)
{
    return await bcrypt.compare(candidatePassword,userPassword);
}

const User = mongoose.model('User',userSchema)
module.exports = User