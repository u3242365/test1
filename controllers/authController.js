// import usermodel from models
const User = require('./../models/userModels');
// import jsonwebtoken
const jwt = require('jsonwebtoken');
// import AppError created in utils
const AppError = require('./../utils/appError');
const { promisify, isNullOrUndefined} = require('util')

const signToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}


const createSendToken = (user,statusCode,res) => {
    const token = signToken(user._id);
    // console.log("token created",token)
    const cookieOptions = {
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN *24*60*60*1000),
        httpOnly:true,
    }
    
    res.cookie('jwt',token,cookieOptions)
    // console.log("cookie created");
    res.status(statusCode).json({
        status:"success",
        token,
        data:{user}
    }) 
    
    
}

//user signup method
exports.signup = async(req,res,next) => {
    try{
        const newUser = await User.create(req.body)
        createSendToken(newUser,201,res);  

    }catch(err){
        let errorMessage;
        if(err.code === 11000)
        {
            errorMessage = "User account with this email already exists!";
        }
        else if(err.name === 'ValidationError'){
            errorMessage = Object.values(err.errors).map(error => error.message).join(',');
        }
        else{
            errorMessage = 'Internal server error';
        }
        res.status(500).json({success:false, message:errorMessage,error:err.message});
    }
    
}

//user login method
exports.login = async(req,res,next) =>{
    let errorMessage;
    try{
        const {email,password} = req.body;
        console.log(email,password);

        //check if email and password exist in req body
        if(!email || !password){
            return next(new AppError('Please provide an email and passwrd!', 400));

        }
        

        //  check if user exists in DB 
        const user = await User.findOne({email}).select('+password');
        
        //first condition checks if the user exists in db while second condition checks if pw 
        // provided by user matches the pw taken from db
        if(!user || !(await user.correctPassword(password,user.password))){
            errorMessage = "Incorrect email or password. Please provide correct email and password";
            // return next(new AppError('Incorrect email or password',401));
            return res.status(500).send("Incorrect email or password. Please provide correct email and password");
        }
     

        // if above condition met, send token to client
        createSendToken(user,200,res);
        // const token = signToken(user._id)
        // res.status(200).json({status:'success',token});

    }catch(err){
        res.status(500).json({success:false, message:errorMessage,error:err.message});

    }
}

// Creating protection
exports.protect = async(req,res,next) => {
    try{
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return next(new AppError('Ýou are not logged in! Please log in to get access',401));
        }
        // verify token
        const decodedToken = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    }catch(err){
        res.status(500).json({error:err.message});
    }
}
