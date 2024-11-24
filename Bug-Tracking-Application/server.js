import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
const app = express();
import morgan from "morgan";
import cookieParser from "cookie-parser";

//routers
import reportRouter from "./routes/reportRouter.js";
import authRouter from "./routes/authRouter.js";
import softwareRouter from "./routes/softwareRouter.js";
import userRouter from "./routes/userRouter.js";

//middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

app.use(cookieParser());
app.use(express.json()); //middleware for express connection

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/reports", authenticateUser, reportRouter); //middleware for report router
app.use("/api/v1/admin/software", authenticateUser, softwareRouter); ////middleware for software input router
app.use("/api/v1/users/", authenticateUser, userRouter); ////middleware for software input router
app.use("/api/v1/auth", authRouter); ////middleware for authentication router

//fallback middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({ msg: err });
// });

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
