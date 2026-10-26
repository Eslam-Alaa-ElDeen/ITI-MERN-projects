const AppError = require("../utils/AppError.js");
const catchAsync = require("../utils/catchAsync.js");

const restrictTo = (roles=[]) => catchAsync(async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    if (!roles.includes(user.role)) {
        return next(new AppError("You do not have permission to perform this action", 403));
    }

    next();
});

module.exports = restrictTo;