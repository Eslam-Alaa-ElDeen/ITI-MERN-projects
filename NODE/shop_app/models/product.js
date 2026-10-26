const  mongoose  = require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:["clothes","sports","electronics"]
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false,
        select:false
    }
},{
    timestamps:true,
    strict:true,
    strictQuery:true,
    versionKey:false,
    
})

const productModel=mongoose.model("Product",productSchema)
module.exports=productModel;