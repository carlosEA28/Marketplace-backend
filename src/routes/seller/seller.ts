import { Router } from "express";
import { Request, Response } from "express";
import {
  makeCreateSellerController,
  makeLoginSellerContrller,
  makeRefreshTokenController,
} from "../../factories/controllers/seller";
import { upload } from "../../middlewares/multer";
import { auth } from "../../middlewares/auth";

export const sellerRouter = Router();

sellerRouter.post(
  "/",
  upload.single("image"),
  auth,
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

sellerRouter.post("/refresh-token", async (req: Request, res: Response) => {
  const refreshTokenController = makeRefreshTokenController();

  const { statusCode, body } = await refreshTokenController.execute(req);

  res.status(statusCode).send(body);
});
