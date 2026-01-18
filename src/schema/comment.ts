import yup from "yup";

export const comment = yup.object({
  id: yup.string(),
  userId: yup.string(),
  bookId: yup.string(),
  userName: yup.string().min(4, "Nome do usuário é obrigatório"),
  evaluation: yup.number(),
  text: yup.string().required("Comentário é obrigatório"),
});
