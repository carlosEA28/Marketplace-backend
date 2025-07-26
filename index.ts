import dotenv from "dotenv";
dotenv.config();

import { app } from "./src/app";

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
