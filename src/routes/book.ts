import express from "express";
import { idValidation } from "../middlewares/idValidations.js";
import { bookService } from "../services/book/index.js";

const bookRoute = express.Router();

bookRoute.get("/", bookService.getAllBooks);
bookRoute.post("/", bookService.createBook);
bookRoute.patch("/:id", idValidation, bookService.patchBook);
bookRoute.delete("/:id", idValidation, bookService.deleteBook);

export { bookRoute };
