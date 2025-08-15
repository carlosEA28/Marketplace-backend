import { LoginSchemaData } from "../../global/loginSchema";
import { CreateSellerData } from "../../seller";

export interface ILoginSellerService {
  execute({ email, password }: LoginSchemaData): Promise<
    CreateSellerData & {
      tokens: { accessToken: string; refreshToken: string };
    }
  >;
}
