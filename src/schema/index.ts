import yup, { type InferType } from "yup";

export const bookSchema = yup.object({
  id: yup.string(),
  title: yup.string().min(4).required("Título é obrigatório"),
  author: yup.string().min(2).required("Autor é obrigatório"),
  synopsis: yup.string().required("Sinopse é obrigatório"),
  priceInCents: yup.number().required("Preço é obrigatório"),
  coverImg: yup.string().required("Imagem é obrigatório"),
  evaluation: yup.number(),
});

export type Book = InferType<typeof bookSchema>;
export type BookBody = Omit<Book, "id">;
