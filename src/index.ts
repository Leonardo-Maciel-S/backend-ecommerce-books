import express, { type Request, type Response } from "express";
import { bookRoute } from "./routes/book.js";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/book", bookRoute);

app.listen(port, () => {
  console.log("Api rodando em: http://localhost:" + port);
});
