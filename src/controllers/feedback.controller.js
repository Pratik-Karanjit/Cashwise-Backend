import expressAsyncHandler from "express-async-handler";
import axios from "axios";
import { HTTP_STATUS } from "../config/constants.js";
import successResponse from "../utils/successResponse.js";

import { config } from "dotenv";

config();
const LAMBDA_EMAIL_URL = process.env.LAMBDA_EMAIL_URL;

export let saveContactUs = expressAsyncHandler(async (req, res, next) => {
  try {
    console.log("LAMBDA_EMAIL_URL", LAMBDA_EMAIL_URL)
    const data = req.body;
    console.log("data", data)
    const sender = data.name;

   const response = await axios.post(LAMBDA_EMAIL_URL, {
      from: `"${sender}" <${data.email}>`,
      to: "pratikkaranjit@gmail.com",
      subject: "Feedback Form Submission",
      html: `<h3>Hi, Admin</h3>
            <p>${data.message}</p>
            <h3>Sender: ${data.name}</h3>
            <h3>Email: ${data.email}</h3>`,
    });

    console.log("response is", response.data)

    const message = {
        data: response.data,
        info: response.info
    }

    successResponse(res, HTTP_STATUS.CREATED, "Form submitted successfully!");
  } catch (error) {
    console.log("error came", error)
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while submitting the form.",
      error: error.message,
    });
  }
});