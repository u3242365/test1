const adminRubric = require('../models/adminrubricsModels');
console.log("I am in controller")
// retrieving all rubrics
exports.getAllRubrics = async(req,res) => {
    try{
        const rubrics = await adminRubric.find();
        res.status(200).json({
            status:'success',
            results:rubrics.length,
            data:{
                rubrics
            }
        })
    }catch(err){
        res.status(404).json({
            status:'failed',
            message:err
        })
    }
}

// retrieving single rubric based on ID
exports.getRubric = async(req,res) => {
    try{
        const rubric = await adminRubric.findById(req.params.id);
        res.status(200).json({
            status:'success',
            results:rubric.length,
            data:{
                rubric
            }

        });
    }catch(err){
        res.status(404).json({
            status:'failed',
            message:err
        })

    }
}

// creating rubric
exports.createRubric = async(req,res)=>{
    try{
        console.log("Creating rubrics")
        const newRubric = await adminRubric.create(req.body);
        res.status(201).json({
            status:'success',
            data:{
                rubric:newRubric
            }
        })
    }catch(err){
        console.log("Getting error")
        res.status(400).json({
            status:'failed',
            message:err
        })
    }
}

// updating news
exports.updateRubric = async(req,res)=>{
    try{
        const rubric = await adminRubric.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({
            status:'success',
            data:{
                rubric
            }
        })
    }catch(err){
        res.status(404).json({
            status:'failed',
            message:err
        })
    }
}

// delete rubric
exports.deleteRubric = async(req,res)=>{
    try{
        const rubric = await adminRubric.findByIdAndUpdate(req.params.id);
        res.status(200).json({
            status:'success',
            data:{
                rubric
            }
        })
    }catch(err){
        res.status(404).json({
            status:'failed',
            message:err
        })
    }
}

// search for particular rubric based on query sent by user
exports.getParticulerRubric = async(req,res)=>{
    console.log("The req body is",req.body);
    try{
        const rubric = await adminRubric.findOne(req.body)
        res.status(200).json({
            status:'success',
            data:rubric
        })
    }catch(err){
        res.status(404).json({
            status:'failed',
            message:err
        })
    }
}




