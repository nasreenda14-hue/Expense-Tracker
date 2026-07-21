import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import Expense from "./models/expense.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import expenseRoute from "./routes/expenseRoute.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/expenses", expenseRoute);

connectDB();

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
