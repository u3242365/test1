const mongoose = require('mongoose');

const User = require('./../models/userModels');



exports.createUser = async(req, res, next) =>{
    try{
        const user = await User.create(req.body);
        console.log(req.body.name)
        res.json({data:user,status:"success"});
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
    
}

exports.getAllUsers = async(req, res, next) =>{
    try{
        const user = await User.find();
        res.json({data:user,status:"success"});
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
    
}

exports.getUser = async(req,res) =>{
    try{
        const user = await User.findById(req.params.id);
        res.json({data:user,status:"success"});


    }catch(err){
        res.status(500).json({error:err.message});

    }
}
//Creating controller for updating user based on particular ID
exports.updateUser = async(req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body);
        res.json({data:user,status:"success"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

// Deleting user based on ID
exports.deleteUser = async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({data:user,status:"Deletion successful"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}



