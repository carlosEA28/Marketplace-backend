import { Router, Request, Response } from "express";
import { makeCreateCategoryController } from "../../factories/controllers/category";

export const categoryRouter = Router();

categoryRouter.post("/", async (req: Request, res: Response) => {
  const createCategoryController = makeCreateCategoryController();

  const { body, statusCode } = await createCategoryController.execute(req);

  res.status(statusCode).send(body);
});
