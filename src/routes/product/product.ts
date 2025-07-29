import { Router, Request, Response } from "express";
import { upload } from "../../middlewares/multer";
import { makeCreateProductController } from "../../factories/controllers/product";

export const productRouter = Router();

productRouter.post(
  "/",
  upload.single("image"), // ✅ correto
  async (req: Request, res: Response) => {
    const createProductController = makeCreateProductController();

    const { statusCode, body } = await createProductController.execute(req);

    res.status(statusCode).send(body);
  }
);
