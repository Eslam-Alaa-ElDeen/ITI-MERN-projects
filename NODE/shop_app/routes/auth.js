const authRouter=require("express").Router()
const {login, signup, confirmOTP, forgetPassword, resetPassword}=require("../controller/auth.js");
const validator = require("../middleware/validetor.js");
const { signupValidation, loginValidation, confirmOTPValidation, forgetPasswordValidation, resetPasswordValidation } = require("../validation/auth.js");

authRouter.post("/signup",validator(signupValidation),signup)
authRouter.post("/login",validator(loginValidation),login)
authRouter.post("/confirm_email",validator(confirmOTPValidation),confirmOTP);
authRouter.post("/forget_password",validator(forgetPasswordValidation),forgetPassword);
authRouter.post("/reset_password",validator(resetPasswordValidation),resetPassword);

module.exports=authRouter