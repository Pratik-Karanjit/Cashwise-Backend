import { HTTP_STATUS } from "../config/constants.js";

const errorResponse = (res, statusCode, message, error) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    result: null,
    error
  });
};

export default errorResponse;