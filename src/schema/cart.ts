import yup from "yup";

export const cartSchema = yup.object({
  id: yup.string().required(),
  userId: yup.string().required("Id do usuário é obrigatório"),
  userAddressId: yup.string().required("Id do livro é obrigatório"),
  createdAt: yup.date(),
});
