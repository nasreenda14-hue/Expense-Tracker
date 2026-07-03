import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
});

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
