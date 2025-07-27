import express from "express";
import { sellerRouter } from "./routes/seller/seller";

export const app = express();

app.use(express.json());

app.use("/api/sellers", sellerRouter);
