import { Router, Request, Response } from "express";
import { upload } from "../../middlewares/multer";
import {
  makeCreateProductController,
  makeGetAllAnoucedProductsQuantityController,
  makeGetAllSoldProductsQuantityController,
} from "../../factories/controllers/product";

export const productRouter = Router();

productRouter.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const createProductController = makeCreateProductController();

    const { statusCode, body } = await createProductController.execute(req);

    res.status(statusCode).send(body);
  }
);

productRouter.get("/:sellerId", async (req: Request, res: Response) => {
  const getAllAnoucedProductsController =
    makeGetAllAnoucedProductsQuantityController();

  const { statusCode, body } = await getAllAnoucedProductsController.execute(
    req
  );

  res.status(statusCode).send(body);
});

productRouter.get("/", async (req: Request, res: Response) => {
  const getAllSoldProductsController =
    makeGetAllSoldProductsQuantityController();

  const { statusCode, body } = await getAllSoldProductsController.execute(req);

  res.status(statusCode).send(body);
});
