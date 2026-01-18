import express from "express";
import { commentService } from "../services/comment/index.js";
import { loginValidation } from "../middlewares/login-validation.js";

const commentRouter = express.Router();

commentRouter.post("/", loginValidation, commentService.createComment);

export { commentRouter };
