const mongoose = require('mongoose');
const validator = require('validator');


const adminRubricSchema = new mongoose.Schema({
    classLevel:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    assessment:{
        type:String,
        required:true
    },
    grade:{
        type:Number,
        required:true
    },
    criteria:{
        type:Object,
        required:true
    },
    publishedAt:{
        type:Date,
        default:Date.now()
    },
    publishedBy:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,'rubric must belong to a user']
    }
})

adminRubricSchema.pre(/^find/, function(next){
    this.populate({
        path:'user',
        select:'name'
    })
    next();
})
console.log("I am in schema")

const adminrubric = mongoose.model('adminrubric',adminRubricSchema);
module.exports = adminrubric;