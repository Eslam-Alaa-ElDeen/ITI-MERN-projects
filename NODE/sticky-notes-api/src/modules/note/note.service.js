import mongoose from "mongoose";
import { noteModel } from "../../DB/model/note.model.js";
import { userModel } from "../../DB/model/user.model.js";


export const addNote = async (id,body) => {
  const data=await noteModel.create({
    userId:id,
    title:body.title,
    content:body.content
  });
  return data;
};

export const updateNote=async(noteId,userId,body)=>{
  const note=await noteModel.findOne({
    _id:noteId
  })

  if(!note)
    throw new Error("Note not founded",{cause:{status:404}})


  if(!note.userId.equals(userId))
    throw new Error("you are not the owner",{cause:{status:404}})

  note.title=body.title;
  note.content=body.content;

  await note.save({validateBeforeSave:true})

  return note;
}


export const replaceNote=async(noteId,userId,body)=>{
  const note=await noteModel.findOne({
    _id:new mongoose.Types.ObjectId(noteId)
  })

  if(!note)
    throw new Error("Note not founded",{cause:{status:404}})


  if(!note.userId.equals(userId))
    throw new Error("you are not the owner",{cause:{status:404}})

  note.userId=body.userId;
  note.title=body.title;
  note.content=body.content;

  await note.save({validateBeforeSave:true})

  return note;
}

export const updateTitle=async(userId,titleBody)=>{
  const note=await noteModel.findOneAndUpdate({
    userId
  },{
    $set:{
      title:titleBody
    },
    $inc:{
      __v:1
    }
  },{
    returnDocument:"after"
  })

  if(!note)
    throw new Error("Note not founded",{cause:{status:404}})

  return note;
}

export const deleteNote=async(noteId,userId)=>{
  const note=await noteModel.findOne({
    _id:new mongoose.Types.ObjectId(noteId)
  })

  if(!note)
    throw new Error("Note not founded",{cause:{status:404}})


  if(!note.userId.equals(userId))
    throw new Error("you are not the owner",{cause:{status:404}})

  const deletedNote=await noteModel.findOneAndDelete({
    _id:new mongoose.Types.ObjectId(noteId)
  })
  return deletedNote;
}


export const getPaginate=async(page,limitNum,userId)=>{

  const skipNum = (page - 1) * limitNum;

  const notes=await noteModel.find({
    userId:new mongoose.Types.ObjectId(userId)
  }).sort({createdAt: -1}).skip(skipNum).limit(limitNum)
  
  if(notes?.length==0)
    throw new Error("no notes founded",{cause:{status:404}})

  return notes
}


export const getOneNote=async(noteId,userId)=>{
  const note=await noteModel.findOne({
    _id:new mongoose.Types.ObjectId(noteId)
  })

  if(!note)
    throw new Error("Note not founded",{cause:{status:404}})

  if(!note.userId.equals(userId))
    throw new Error("you are not the owner",{cause:{status:404}})

  return note;
}


export const getByContent=async(contentQuery,userId)=>{
  const note=await noteModel.find({
    content:contentQuery
  })

  if(note?.length==0)
    throw new Error("Note not founded",{cause:{status:404}})
    
  if(!note[0].userId.equals(userId))
    throw new Error("you are not the owner",{cause:{status:404}})

  return note;
}


export const getNoteWithUser=async(userId)=>{
  const note=await noteModel.find({userId}).populate({
    path:"userId",
    select:"email -_id"
  }).select("-content -updatedAt -__v")

  if(note?.length==0)
    throw new Error("Notes not founded",{cause:{status:404}})

  return note;
}


export const getUserAndNoteByTitle=async(titleQuery)=>{
  const note=await noteModel.aggregate([
    {
      $match:{
        title:{$eq:titleQuery}
      }
    },
      {
        $lookup:{
          from:"users",
          localField:"userId",
          foreignField:"_id",
          as:"User"
        }
      },
      {
        $unwind:{
          path:"$User"
        }
      },
      {
        $project:{
          title:1,
          userId:1,
          createdAt:1,
          _id:0,
          User:{
            "name":1,
            "email":1
          }
        }
      }
  ])

  if(note?.length==0)
    throw new Error("Notes not founded",{cause:{status:404}})

  return note;
}


export const deleteWithUserId=async(userIdQuery)=>{
  const deletedNote=await noteModel.deleteMany({
    userId:userIdQuery
  })
  if(deletedNote.deletedCount==0)
    throw new Error("note not deleted enter a valid data")
  return deletedNote;
}
