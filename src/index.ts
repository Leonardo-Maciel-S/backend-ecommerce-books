import express, { type Request, type Response } from "express";

const app = express();

const port = process.env.PORT;

app.get("/", (_: Request, res: Response) => {
  res.send("Olá mundo");
});

app.listen(port, () => {
  console.log("Api rodando em: http://localhost:" + port);
});
