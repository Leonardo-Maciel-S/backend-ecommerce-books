import * as y from "yup";

export const userSchema = y.object({
  id: y.string().optional(),
  name: y.string().required("Nome é obrigatório"),
  email: y.string().email("Email Inválido").required("Email é obrigatório"),
  password: y
    .string()
    .required("Senha é é obrigatório")
    .nonNullable()
    .min(8, "Senha precisa ter pelo menos 8 caracteres."),
});
