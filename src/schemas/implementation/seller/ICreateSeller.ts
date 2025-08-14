import { CreateSellerData } from "../../seller";

export interface CreateSellerServiceInterface {
  execute(
    createSellerParams: CreateSellerData & {
      imageBuffer: Buffer;
      imageMimeType: string;
    }
  ): Promise<CreateSellerData>;
}
