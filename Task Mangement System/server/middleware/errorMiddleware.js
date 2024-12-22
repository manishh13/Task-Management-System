export const routeNotFound = (req, res, next) => {
  const error = new Error(`Routes not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    //this is for checking if the error is coming from our database
    statusCode = 404;
    message = "Resource not found";
  }
  res.status(statusCode).json({
    message: message,
  });
};


