import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Expense from "./models/expense.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
// import expenseRoute from "./routes/expenseRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
// app.use("/api/expenses", expenseRoute);

dotenv.config();
connectDB();

// app.get("/expenses", (req, res) => {
//   Expense.find()
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app.post("/expenses", (req, res) => {
//   Expense.create(req.body)
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app.put("/expenses/:id", (req, res) => {
//   Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

// app.delete("/expenses/:id", (req, res) => {
//   Expense.findByIdAndDelete(req.params.id)
//     .then((result) => res.json(result))
//     .catch((err) => res.json(err));
// });

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
