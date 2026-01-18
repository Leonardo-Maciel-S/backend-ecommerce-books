import express from "express";
import { commentService } from "../services/comment/index.js";
import { loginValidation } from "../middlewares/login-validation.js";
import { idValidation } from "../middlewares/id-validations.js";

const commentRouter = express.Router();

commentRouter.get("/:id", idValidation, commentService.getAllCommentsByBookId);
commentRouter.post("/", loginValidation, commentService.createComment);

export { commentRouter };
