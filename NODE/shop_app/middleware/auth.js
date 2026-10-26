const jwt=require("jsonwebtoken")
const userModel=require("../models/user.js")
const catchAsync=require("../utils/catchAsync.js")
const AppError=require("../utils/AppError.js")
const bcrypt=require("bcrypt")


const auth=catchAsync(async(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization ){
        return next(new AppError("please provide a valid token",401))
    }
    const token=authorization;

    //verify the token
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    const user=await userModel.findById(decoded.id).select("+password");

    if(!user){
        return next(new AppError("the user belonging to this token does not exist",401))
    }

    req.user=user;
    next();
})

module.exports=auth