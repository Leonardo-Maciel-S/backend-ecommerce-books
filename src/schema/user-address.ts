import * as yup from "yup";

export const userAddressSchema = yup.object({
  id: yup.string(),
  userId: yup.string().required(),
  number: yup.number(),
  street: yup.string().required(),
  complement: yup.string(),
  neighborhood: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
  phone: yup.string().required(),
  recipientName: yup.string().required(),
  cpfOrCnpj: yup.string().required(),
});
