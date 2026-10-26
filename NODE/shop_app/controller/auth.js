const userModel = require("../models/user.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/AppError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {customAlphabet}=require("nanoid");
const sendEmail = require("../utils/sendEmail.js");
const {promisify} = require("util");

const jwtSign=promisify(jwt.sign)

exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return next(new AppError("User already exists with this email", 400));
    }

    const hashedPassword = await bcrypt.hash(password, +parseInt(process.env.SALT_ROUNDS));

    //sendOTP
    const OTP=customAlphabet("0123456789",6)()
    const confirmOTP=await bcrypt.hash(OTP,+parseInt(process.env.SALT_ROUNDS))
    const OTPDate=Date.now()+5*60*1000
    
    // Create a new user
    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        confirmOTP: confirmOTP,
        OTPDate: OTPDate,
    });

    //send email
    await sendEmail({
        email: email,
        subject: "Your Verification OTP",
        message: `<p>Your OTP is: <strong>${OTP}</strong></p>`
    })


    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        },
    });
});

exports.confirmOTP = catchAsync(async (req, res, next) => {
    const { email, OTP } = req.body;
    console.log(OTP);

    const user = await userModel.findOne({ email,isConfirmed: false });
    if (!user) {
        return next(new AppError("User not found or already confirmed", 404));
    }

    if(!OTP){
        return next(new AppError("OTP is required", 400));
    }

    if (Date.now() > user.OTPDate) {
        return next(new AppError("OTP has expired", 400));
    }

    console.log(user.confirmOTP);
    const isOTPValid = await bcrypt.compare(OTP, user.confirmOTP);

    if (!isOTPValid) {
        return next(new AppError("Invalid OTP", 400));
    }

    user.isConfirmed = true;
    user.confirmOTP = undefined;
    user.OTPDate = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: "User verified successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new AppError("Invalid email or password", 401));
    }

    if(user.isConfirmed === false){
        return next(new AppError("Please verify your email before logging in", 401));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new AppError("Invalid email or password", 401));
    }

    // Generate a JWT token
    const token = await jwtSign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    // generate a new OTP for password reset
    const OTP = customAlphabet("0123456789", 6)();
    const confirmOTP = await bcrypt.hash(OTP, +parseInt(process.env.SALT_ROUNDS));
    const OTPDate = Date.now() + 5 * 60 * 1000;

    user.confirmOTP = confirmOTP;
    user.OTPDate = OTPDate;
    await user.save();

    // send email with the new OTP
    await sendEmail({
        email: email,
        subject: "Your Password Reset OTP",
        message: `<p>Your password reset OTP is: <strong>${OTP}</strong></p>`,
    });

    res.status(200).json({
        success: true,
        message: "Password reset OTP sent to your email",
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { email, OTP, newPassword } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    if (Date.now() > user.OTPDate) {
        return next(new AppError("OTP has expired", 400));
    }

    const isOTPValid = await bcrypt.compare(OTP, user.confirmOTP);
    if (!isOTPValid) {
        return next(new AppError("Invalid OTP", 400));
    }

    const hashedPassword = await bcrypt.hash(newPassword, +parseInt(process.env.SALT_ROUNDS));
    user.password = hashedPassword;
    user.confirmOTP = undefined;
    user.OTPDate = undefined;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password reset successfully",
    });
});