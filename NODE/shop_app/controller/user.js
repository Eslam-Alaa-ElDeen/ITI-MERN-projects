const userModel = require("../models/user.js");
const catchAsync = require("../utils/catchAsync.js");
const AppError = require("../utils/AppError.js");
const ApiFeatures = require("../utils/ApiFeatures.js");

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(userModel.find({ isDeleted: false }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .search();

    const users = await features.query.select("-password -confirmOTP");
    res.status(200).json({
        success: true,
        results: users.length,
        users,
    });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id, isDeleted: false }).select("-password -confirmOTP");

    if (!user) {
        return next(new AppError("no matched user", 400));
    }

    return res.status(200).json({
        success: true,
        user,
    });
});

exports.createUser = catchAsync(async (req, res, next) => {
    const data = req.body;
    const user = await userModel.create({ ...data, createdAt: Date.now() });

    return res.status(201).json({
        success: true,
        message: "user created successfully",
        user,
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const data = req.body;
    const user = await userModel.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { ...data, updatedAt: Date.now() },
        { returnDocument: "after", runValidators: true }
    );

    if (!user) {
        return next(new AppError("no matched user", 400));
    }

    return res.status(200).json({
        success: true,
        message: "user updated successfully",
        user,
    });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const user = await userModel.findOneAndDelete({ _id: req.params.id, isDeleted: false });

    if (!user) {
        return next(new AppError("no matched user", 400));
    }

    return res.status(200).json({
        success: true,
        message: "user deleted successfully",
        user,
    });
});

exports.softDeleteUser = catchAsync(async (req, res, next) => {
    const user = await userModel.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { isDeleted: true, deletedAt: Date.now() },
        { returnDocument: "after" }
    );

    if (!user) {
        return next(new AppError("no matched user", 400));
    }

    return res.status(200).json({
        success: true,
        message: "user soft deleted successfully",
        user,
    });
});