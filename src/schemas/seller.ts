import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js";
import { cpf } from "cpf-cnpj-validator";

export const CreateSellerProps = z.object({
  full_name: z.string().min(1, { message: "O nome completo é obrigatório" }),
  phone: z.string().superRefine((br, ctx) => {
    const phone = parsePhoneNumberFromString(br, {
      defaultCountry: "BR",
      extract: false,
    });

    if (!phone || !phone.isValid()) {
      ctx.addIssue({
        code: "custom",
        message: "Número de telefone inválido",
      });
    }
  }),
  email: z
    .email({ message: "Email inválido" })
    .trim()
    .min(1, { message: "O email é obrigatório" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "A senha tem que conter no mínimo 6 caractéres" }),
  cpf: z.string().refine(
    (value) => {
      const clean = value.replace(/\D/g, "");
      return cpf.isValid(clean);
    },
    { message: "CPF inválido" }
  ),
  avatarImg: z.string().optional(),
});
