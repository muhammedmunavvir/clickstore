export const ErrorHandlingMiddilware = (error, req, res, next) => {
  // console.log("didint log any error",error)
  const statusCode = error.statusCode || 500;

  const response = {
    status: "error",
    message: error.message || "Something went wrong!",
  };

  return res.status(statusCode).json(response);
};
