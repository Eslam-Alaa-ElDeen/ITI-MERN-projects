import { Router } from 'express'
import { addNote, deleteNote, deleteWithUserId, getByContent, getNoteWithUser, getOneNote, getPaginate, getUserAndNoteByTitle, replaceNote, updateNote, updateTitle } from './note.service.js';
import { successResponse } from '../../common/utils/response/success.response.js';
const router = Router(); 

router.post("/",async(req,res)=>{
    const returnedData=await addNote(req.query.id,req.body)

    successResponse({
        res,
        status:201,
        message:"note added successfully",
        data:returnedData
    })
})


router.patch("/update/:noteId",async(req,res)=>{
    const returnedData=await updateNote(req.params.noteId,req.query.userId,req.body)

    successResponse({
        res,
        status:201,
        message:"note updated successfully",
        data:returnedData
    })
})

router.put("/replace/:noteId",async(req,res)=>{
    const returnedData=await replaceNote(req.params.noteId,req.query.userId,req.body)

    successResponse({
        res,
        status:201,
        message:"note replaced successfully",
        data:returnedData
    })
})

router.post("/all",async(req,res)=>{
    const returnedData=await updateTitle(req.query.userId,req.body.title)

    successResponse({
        res,
        status:201,
        message:"note updated successfully",
        data:returnedData
    })
})


router.delete("/delete/:noteId",async(req,res)=>{
    const returnedData=await deleteNote(req.params.noteId,req.query.userId)

    successResponse({
        res,
        status:201,
        message:"note deleted successfully",
        data:returnedData
    })
})

router.get("/sort/paginate-sort",async(req,res)=>{
    const returnedData=await getPaginate(req.query.page,req.query.limit,req.query.userId)

    successResponse({
        res,
        status:200,
        message:"notes : ",
        data:returnedData
    })
})

router.get("/get/note-by-content",async(req,res)=>{
    const returnedData=await getByContent(req.query.content,req.query.userId)
    
    successResponse({
        res,
        status:200,
        message:"notes founded successfully",
        data:returnedData
    })
})

router.get("/get/note-with-user",async(req,res)=>{
    const returnedData=await getNoteWithUser(req.query.userId)

    successResponse({
        res,
        status:200,
        message:"notes founded successfully",
        data:returnedData
    })
})

router.get("/get/:noteId",async(req,res)=>{
    const returnedData=await getOneNote(req.params.noteId,req.query.userId)

    successResponse({
        res,
        status:200,
        message:"note founded successfully",
        data:returnedData
    })
})


router.get("/aggregate",async(req,res)=>{
    const returnedData=await getUserAndNoteByTitle(req.query.title)

    successResponse({
        res,
        status:200,
        message:"note founded successfully",
        data:returnedData
    })
})

router.delete("/delete",async(req,res)=>{
    const returnedData=await deleteWithUserId(req.query.userId)

    successResponse({
        res,
        status:200,
        message:"note deleted successfully",
        data:returnedData
    })
})



export default router