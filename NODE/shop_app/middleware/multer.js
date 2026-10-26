const multer=require("multer")

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/")
    },
    filename:function(req,file,cb){
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true)
    }else{
        cb(new Error("only images are allowed"),false)
    }
}

const upload=multer({storage,fileFilter,limit:{fileSize:1024*1024*10}})

module.exports=upload