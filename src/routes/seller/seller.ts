import { Router } from "express";
import { Request, Response } from "express";
import { makeCreateSellerController } from "../../factories/controllers/seller";

export const sellerRouter = Router();

sellerRouter.post("/", async (req: Request, res: Response) => {
  const createSellerController = makeCreateSellerController();

  const body = await createSellerController.execute(req);

  res.status(201).send(body);
});
