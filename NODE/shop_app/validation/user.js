const yup = require("yup")

const createUserValidation = yup.object({
    name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Confirm Password is required")
}).required()

const updateUserValidation = yup.object({
    name: yup.string().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    email: yup.string().email("Invalid email format"),
    password: yup.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match")
}).required()

module.exports = { createUserValidation, updateUserValidation }