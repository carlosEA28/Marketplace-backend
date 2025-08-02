import { Router, Request, Response } from "express";
import { upload } from "../../middlewares/multer";
import {
  makeGetAllSellerProductsByType,
  makeUpdateProductController,
} from "../../factories/controllers/product";
import {
  makeCreateProductController,
  makeGetAllAnoucedProductsQuantityController,
  makeGetAllSellerProductsController,
  makeGetAllSoldProductsQuantityController,
} from "../../factories/controllers/product";

export const productRouter = Router();

productRouter.get("/me", async (req: Request, res: Response) => {
  const getAllSellerProductsByTypeController = makeGetAllSellerProductsByType();

  const { body, statusCode } =
    await getAllSellerProductsByTypeController.execute(req);

  res.status(statusCode).send(body);
});

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

productRouter.get("/me/:sellerId", async (req: Request, res: Response) => {
  const getAllSellerProductsController = makeGetAllSellerProductsController();

  const { body, statusCode } = await getAllSellerProductsController.execute(
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

productRouter.put(
  "/:sellerId",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const updateProductController = makeUpdateProductController();

    const { statusCode, body } = await updateProductController.execute(req);

    res.status(statusCode).send(body);
  }
);
