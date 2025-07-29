import express from "express";
import { sellerRouter } from "./routes/seller/seller";
import { productRouter } from "./routes/product/product";

export const app = express();

app.use(express.json());

app.use("/api/sellers", sellerRouter);
app.use("/api/products", productRouter);
