import { userModel } from "../../DB/model/user.model.js"

// import { users } from '../../DB/model/index.js'
export const signup = async(inputs) => {
    const user=await userModel.findOne({email:inputs.email})

    if(user){
        throw new Error("Email already exists",{cause:{status:409}})
    }

    const data=await userModel.create(inputs)
    return data
}


export const login = async(inputs) => {
    const user=await userModel.findOne({email:inputs.email,password:inputs.password})

    if(!user){
        throw new Error("Invalid email or password",{cause:{status:409}})
    }

    return user
}


export const updateUser = async(id,body) => {
    const emailExist=await userModel.findOne({
        email:body.email
    })

    if(emailExist)
        throw new Error("Eamil already exists",{cause:{status:409}})

    const user=await userModel.findOneAndUpdate({_id:id},{
        $set:body,
        $inc:{
            __v:1
        }
    },{
        returnDocument:'after'
    })

    if(!user)
        throw new Error("User not found",{cause:{status:404}})


    return user
}


export const deleteUser = async(id) => {
    const user=await userModel.findOneAndDelete({_id:id})

    if(!user)
        throw new Error("User not found",{cause:{status:404}})

    return user
}


export const findOneUser = async(id) => {
    const user=await userModel.findOne({_id:id})

    if(!user)
        throw new Error("User not found",{cause:{status:404}})

    return user
}