import express, { type Request, type Response } from "express";
import { createBook } from "../services/book/create.js";
import { getAll } from "../services/book/getAll.js";

const bookRoute = express.Router();

bookRoute.get("/", getAll);
bookRoute.post("/", createBook);

export { bookRoute };
