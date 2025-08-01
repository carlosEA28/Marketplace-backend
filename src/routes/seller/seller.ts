import { Router } from "express";
import { Request, Response } from "express";
import {
  makeCreateSellerController,
  makeLoginSellerContrller,
} from "../../factories/controllers/seller";
import { upload } from "../../middlewares/multer";

export const sellerRouter = Router();

sellerRouter.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const createSellerController = makeCreateSellerController();

    const { statusCode, body } = await createSellerController.execute(req);

    res.status(statusCode).send(body);
  }
);

sellerRouter.post("/login", async (req: Request, res: Response) => {
  const loginSellerController = makeLoginSellerContrller();

  const { statusCode, body } = await loginSellerController.execute(req);

  res.status(statusCode).send(body);
});
