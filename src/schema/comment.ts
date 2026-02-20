import yup from "yup";

export const commentSchema = yup.object({
  id: yup.string(),
  userId: yup.string(),
  bookId: yup.string().required("Id do livro é obrigatório"),
  userName: yup.string().required("Nome do usuário é obrigatório"),
  evaluation: yup.number().required(),
  text: yup.string().required("Comentário é obrigatório"),
  createdAt: yup.date(),
});
