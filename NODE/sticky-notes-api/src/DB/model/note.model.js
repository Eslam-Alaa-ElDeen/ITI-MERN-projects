import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                const arr=v.split(" ");
                for(let i of arr){
                    if(i[0].toUpperCase()!=i[0])
                        return false
                    for (let index = 1; index < i.length; index++) {
                        let char=i[index].toUpperCase();
                        if(i[index]==char){
                            return false
                        }
                    }
                }
                return true;
            },
            message:function(prop){
                return `${prop.value} is not a falid title title should be like this format {First Title}`
            }
        }
    },
    content:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true,
    optimisticConcurrency:true,
    strict:true,
    strictQuery:true,
})


export const noteModel=mongoose.model("Note",noteSchema)