import yup from "yup";

export const itemCartSchema = yup.object({
  id: yup.string(),
  cartId: yup.string().required("Id do carrinho é obrigatório"),
  bookId: yup.string().required("Id do livro é obrigatório"),
  quantity: yup.number().required(),
  createdAt: yup.date(),
});
