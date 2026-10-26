import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        },
    email: {
        type: String,
        unique: true,
        required: true,
        },
    password: {
        type: String,
        required: true,
        },
    phone: {
        type: String,
        required: true,
        },
    age: {
        type: Number, 
        max: 60,
        min: 18,
        },
    },
    {
        optimisticConcurrency:true,
        stcrit:true,
        strictQuery:true,
        timestamps:false
    }
);

export const userModel = mongoose.model('User',userSchema);
