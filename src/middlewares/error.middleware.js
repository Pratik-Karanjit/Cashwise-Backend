import { HTTP_STATUS } from "../config/constants.js";
import errorResponse from "../utils/errorResponse.js";

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message;
  let error = err.message;

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Validation Error';
    error = Object.values(err.errors).map(val => val.message);
  } else if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid ID format';
    error = err.message;
  } else if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    message = 'Duplicate field value';
    error = err.message;
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
    error = err.message;
  } else if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
    error = err.message;
  }

  console.error(`Error: ${message}`, err);

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    error = {
      message: error,
      stack: err.stack
    };
  }

  return errorResponse(res, statusCode, message, error);
};

export default errorMiddleware;