import express from "express";

import cookieParse from "cookie-parser";
import cors from "cors";

import { bookRouter } from "./routes/book.js";
import { userRouter } from "./routes/user.js";

const app = express();

const port = process.env.PORT;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["Content-type", "Authorization"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParse());

app.use("/book", bookRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Api rodando em: http://localhost:" + port);
});
