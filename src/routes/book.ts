import express, { type Request, type Response } from "express";
import { createBook } from "../services/book/create.js";

const bookRoute = express.Router();

bookRoute.post("/", createBook);

export { bookRoute };
