const AppError = require("../utils/AppError.js");

const validator = schema => async (req, res, next) => {
    try {
        const { error } = await schema.validate(req.body,{abortEarly: false});
        if (error) {
            const errorMessage = error.errors.join(", ");
            next(new AppError(errorMessage, 400));
        }
        next();
    } catch (error) {
        const errorMessage = error.errors.join(", ");
        next(new AppError(errorMessage, 400));
    }
};

module.exports = validator;