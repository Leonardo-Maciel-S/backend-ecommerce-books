import express, { type Request, type Response } from "express";
import { bookRouter } from "./routes/book.js";
import { userRouter } from "./routes/user.js";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/book", bookRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log("Api rodando em: http://localhost:" + port);
});
