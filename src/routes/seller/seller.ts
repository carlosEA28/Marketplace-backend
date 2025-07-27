import { Router } from "express";
import { Request, Response } from "express";
import { makeCreateSellerController } from "../../factories/controllers/seller";

export const sellerRouter = Router();

sellerRouter.post("/", async (req: Request, res: Response) => {
  const createSellerController = makeCreateSellerController();

  const { statusCode, body } = await createSellerController.execute(req);

  console.log(statusCode);

  res.status(statusCode).send(body);
});
