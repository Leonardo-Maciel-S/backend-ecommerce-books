import express from "express";
import { idValidation } from "../middlewares/idValidations.js";
import { bookService } from "../services/book/index.js";
import { loginValidation } from "../middlewares/login-validation.js";

const bookRouter = express.Router();

bookRouter.get("/", loginValidation, bookService.getAllBooks);
bookRouter.get("/:id", idValidation, bookService.getAllByUserId);

bookRouter.post("/", bookService.createBook);

bookRouter.patch("/:id", idValidation, bookService.patchBook);

bookRouter.delete("/:id", idValidation, bookService.deleteBook);

export { bookRouter };
