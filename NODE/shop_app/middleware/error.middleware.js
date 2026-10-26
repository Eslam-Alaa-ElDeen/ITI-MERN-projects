const AppError = require("../utils/AppError.js");

const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.kind === "ObjectId") {
        message = `Resource not found with id of ${err.value}`;
        statusCode = 400;
    }

    if (err.code === 11000) {
        message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(", ")}`;
        statusCode = 400;
    }

    if (err.name === "ValidationError") {
        message = Object.values(err.errors).map((val) => val.message).join(", ");
        statusCode = 400;
    }

    if (err.name === "CastError") {
        message = `Resource not found with id of ${err.value}`;
        statusCode = 400;
    }

    if(err.name === "JsonWebTokenError"){
        message = "Invalid token. Please log in again!";
        statusCode = 401;
    }

    if(err.name === "TokenExpiredError"){
        message = "Your token has expired! Please log in again.";
        statusCode = 401;
    }

    if (err.name === "SyntaxError" && err.status === 400 && "body" in err) {
        message = "Invalid JSON payload";
        statusCode = 400;
    }


    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.DEVELOPMENT === "development" ? err.stack : undefined,
        error: err
    });
};

module.exports = globalErrorHandler;