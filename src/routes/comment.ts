import express from "express";
import { commentService } from "../services/comment/index.js";
import { loginValidation } from "../middlewares/login-validation.js";
import { idValidation } from "../middlewares/id-validations.js";

const commentRouter = express.Router();

commentRouter.post("/", loginValidation, commentService.createComment);

commentRouter.get("/:id", idValidation, commentService.getAllCommentsByBookId);

commentRouter.delete(
  "/:id",
  loginValidation,
  idValidation,
  commentService.deleteById,
);

export { commentRouter };
