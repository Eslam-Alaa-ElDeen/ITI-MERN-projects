const productModel = require("../models/product.js");
const ApiFeatures = require("../utils/ApiFeatures.js");
const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

exports.getAllProduct = catchAsync(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(productModel.find({ isDeleted: false }), req.query);
    const products = await apiFeatures.filter().sort().limitFields().paginate().search().query;

    const productCount = await productModel.countDocuments({ isDeleted: false });
    res.status(200).json({
        success: true,
        results: products.length,
        total: productCount,
        products,
    });
});

exports.getOneProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findOne({ _id: id, isDeleted: false });

    if (!product) {
        return next(new AppError("no matched product", 400));
    }

    return res.status(200).json({
        success: true,
        product,
    });
});

exports.createProduct = catchAsync(async (req, res, next) => {
    const data = req.body;
    const product = await productModel.create({ ...data, createdAt: Date.now() });

    return res.status(201).json({
        success: true,
        message: "product created successfully",
        product,
    });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
    const data = req.body;
    const product = await productModel.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { ...data, updatedAt: Date.now() },
        { returnDocument: "after", runValidators: true }
    );

    if (!product) {
        return next(new AppError("no matched product", 400));
    }

    return res.status(200).json({
        success: true,
        message: "product updated successfully",
        product,
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await productModel.findOneAndDelete({ _id: req.params.id, isDeleted: false });

    if (!product) {
        return next(new AppError("no matched product", 400));
    }
    return res.status(200).json({
        success: true,
        message: "product deleted successfully",
        product,
    });
});

exports.softDeleteProduct = catchAsync(async (req, res, next) => {
    const product = await productModel.findOneAndUpdate(
        { _id: req.params.id, isDeleted: false },
        { isDeleted: true, updatedAt: Date.now() },
        { returnDocument: "after", runValidators: true }
    );

    if (!product) {
        return next(new AppError("no matched product", 400));
    }

    return res.status(200).json({
        success: true,
        message: "product deleted(soft) successfully",
        product,
    });
});
