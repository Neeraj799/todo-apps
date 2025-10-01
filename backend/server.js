import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import envConfig from "./config/envConfig.js";
import todoRouter from "../backend/routes/todo.routes.js";
import userRouter from "../backend/routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(envConfig.db.URL)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error", err);
  });

const PORT = envConfig.general.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/todos", todoRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
