import { Router, Request, Response } from "express";
import { upload } from "../../middlewares/multer";
import {
  makeGetAllProductsController,
  makeGetAllSellerProductsByType,
  makeGetProductsByCategoryController,
  makeGetProductsByPriceRangeController,
  makeUpdateProductController,
} from "../../factories/controllers/product";
import {
  makeCreateProductController,
  makeGetAllAnoucedProductsQuantityController,
  makeGetAllSellerProductsController,
  makeGetAllSoldProductsQuantityController,
} from "../../factories/controllers/product";
import { auth } from "../../middlewares/auth";

export const productRouter = Router();

productRouter.get("/", async (_req: Request, res: Response) => {
  const getAllProductsController = makeGetAllProductsController();

  const { body, statusCode } = await getAllProductsController.execute();

  res.status(statusCode).send(body);
});

productRouter.get("/me", auth, async (req: Request, res: Response) => {
  const getAllSellerProductsByTypeController = makeGetAllSellerProductsByType();

  const { body, statusCode } =
    await getAllSellerProductsByTypeController.execute(req);

  res.status(statusCode).send(body);
});

productRouter.get("/by-category", async (req: Request, res: Response) => {
  const getProductsByCategoryController = makeGetProductsByCategoryController();

  const { statusCode, body } = await getProductsByCategoryController.execute(
    req
  );

  res.status(statusCode).send(body);
});

productRouter.get("/by-price-range", async (req: Request, res: Response) => {
  const getProductsByPriceRangeController =
    makeGetProductsByPriceRangeController();

  const { statusCode, body } = await getProductsByPriceRangeController.execute(
    req
  );

  res.status(statusCode).send(body);
});

productRouter.post(
  "/",
  upload.single("image"),
  auth,
  async (req: Request, res: Response) => {
    const createProductController = makeCreateProductController();

    const { statusCode, body } = await createProductController.execute(req);

    res.status(statusCode).send(body);
  }
);

productRouter.get("/:sellerId", auth, async (req: Request, res: Response) => {
  const getAllAnoucedProductsController =
    makeGetAllAnoucedProductsQuantityController();

  const { statusCode, body } = await getAllAnoucedProductsController.execute(
    req
  );

  res.status(statusCode).send(body);
});

productRouter.get(
  "/me/:sellerId",
  auth,
  async (req: Request, res: Response) => {
    const getAllSellerProductsController = makeGetAllSellerProductsController();

    const { body, statusCode } = await getAllSellerProductsController.execute(
      req
    );

    res.status(statusCode).send(body);
  }
);

productRouter.get("/", auth, async (req: Request, res: Response) => {
  const getAllSoldProductsController =
    makeGetAllSoldProductsQuantityController();

  const { statusCode, body } = await getAllSoldProductsController.execute(req);

  res.status(statusCode).send(body);
});

productRouter.put(
  "/:sellerId",
  upload.single("image"),
  auth,
  async (req: Request, res: Response) => {
    const updateProductController = makeUpdateProductController();

    const { statusCode, body } = await updateProductController.execute(req);

    res.status(statusCode).send(body);
  }
);
