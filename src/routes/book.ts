import express from "express";
import { createBook } from "../services/book/create.js";
import { getAll } from "../services/book/getAll.js";
import { patchBook } from "../services/book/patch.js";
import { idValidation } from "../middlewares/idValidations.js";

const bookRoute = express.Router();

bookRoute.get("/", getAll);
bookRoute.post("/", createBook);
bookRoute.patch("/:id", idValidation, patchBook);

export { bookRoute };
