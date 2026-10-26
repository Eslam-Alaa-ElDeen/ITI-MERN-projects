const yup = require("yup")

const loginValidation = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required")
}).required()

const signupValidation = yup.object({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
}).required()

const confirmOTPValidation = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    OTP: yup.string().required("OTP is required")
}).required()

const forgetPasswordValidation = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required")
}).required()

const resetPasswordValidation = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    OTP: yup.string().required("OTP is required"),
    newPassword: yup.string().required("New password is required").min(6, "Password must be at least 6 characters")
}).required()

module.exports = { loginValidation, signupValidation, confirmOTPValidation, forgetPasswordValidation, resetPasswordValidation }
