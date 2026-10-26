const express =require("express")
const connectDB = require("./config/connectDB.js")
require("dotenv").config()
const ProductRouter = require("./routes/product.js")
const globalErrorHandler = require("./middleware/error.middleware.js")
const userRouter = require("./routes/user.js")
const authRouter = require("./routes/auth.js")
const helmet=require("helmet")
const app=express()
const expressSanitize = require("express-mongo-sanitize")
const cors=require("cors")
const expressLimit=require("express-rate-limit")

app.use(express.json())
// app.use(expressSanitize())
app.use(helmet())
app.use(cors({
    origin: "http://localhost:4200"
}))
const limiter = expressLimit.rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
connectDB()

app.set("query parser", "extended");

app.use("/product",ProductRouter)
app.use("/user",userRouter)
app.use("/auth",authRouter)

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"welcome to E-commerce app"
    })
})

app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"page not found"
    })
})

app.use(globalErrorHandler)
module.exports= app;
