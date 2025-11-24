import yup from "yup";

export const bookSchema = yup.object({
  id: yup.string(),
  title: yup
    .string()
    .min(4, "Título precisa ter pelo menos 4 caracteres")
    .required("Título é obrigatório"),
  author: yup
    .string()
    .min(2, "Autor precisa ter pelo menos 2 caracteres")
    .required("Autor é obrigatório"),
  synopsis: yup.string().required("Sinopse é obrigatório"),
  priceInCents: yup.number().required("Preço é obrigatório"),
  coverImg: yup.string().required("Imagem é obrigatório"),
  evaluation: yup.number(),
  userId: yup.string(),
});
