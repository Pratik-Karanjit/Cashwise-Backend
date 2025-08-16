import { HTTP_STATUS } from "../config/constants.js";

let errorMiddleware = (error, req, res, next) => {
  res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "internal server error",
  });
};

export default errorMiddleware;
