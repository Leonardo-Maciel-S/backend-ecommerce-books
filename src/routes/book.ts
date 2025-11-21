import express from "express";
import { idValidation } from "../middlewares/id-validations.js";
import { bookService } from "../services/book/index.js";
import { loginValidation } from "../middlewares/login-validation.js";

const bookRouter = express.Router();

bookRouter.get("/", bookService.getAllBooks);
bookRouter.get("/:id", idValidation, bookService.getAllByUserId);

bookRouter.post("/", loginValidation, bookService.createBook);

bookRouter.patch("/:id", loginValidation, idValidation, bookService.patchBook);

bookRouter.delete(
  "/:id",
  loginValidation,
  idValidation,
  bookService.deleteBook
);

export { bookRouter };
