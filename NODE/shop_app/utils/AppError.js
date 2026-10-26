class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}

module.exports = AppError;