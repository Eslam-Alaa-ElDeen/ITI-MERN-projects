export const globalErrorHandling = (error, req, res, next) => {
  const status = error.cause?.status || 500;
  return res
    .status(status)
    .json({
      error,
      error_message: error.message || "something went wrong",
      stack: error.stack,
    });
};
