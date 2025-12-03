import * as yup from "yup";

export const userAddressSchema = yup.object({
  id: yup.string(),
  userId: yup.string(),
  number: yup.number(),
  street: yup.string().required("Rua é obrigatório."),
  complement: yup.string(),
  neighborhood: yup.string().required("Bairro é obrigatório."),
  city: yup.string().required("Cidade é obrigatório."),
  state: yup.string().required("Estado é obrigatório."),
  zipCode: yup.string().required("Cep é obrigatório."),
  phone: yup.string().required("Telefone é obrigatório."),
  recipientName: yup.string().required("Nome de quem receberá é obrigatório."),
  cpfOrCnpj: yup.string().required("Cpf ou CNPJ é obrigatório."),
});
