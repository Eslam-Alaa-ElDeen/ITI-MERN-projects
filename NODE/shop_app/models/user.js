const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [ 3, "Name must be at least 3 characters"  ],
        maxLength: [ 50, "Name must be at most 50 characters" ]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength: [ 6, "Password must be at least 6 characters"  ],
        maxLength: [ 100, "Password must be at most 100 characters" ]
    },
    isDeleted:{
        type:Boolean,
        default:false,
        select:false
    },
    OTPDate:{
        type:Date,
    },
    confirmOTP:{
        type:String,
    },
    isConfirmed:{
        type:Boolean,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{
    timestamps:true,
    strict:true,
    strictQuery:true,
    versionKey:false
})

const userModel=mongoose.model("User",userSchema)
module.exports=userModel;