// import mongoose from "mongoose";

// const ExpenseSchema = new mongoose.Schema({
//   title: String,
//   amount: Number,
// });

// const Expense = mongoose.model("Expense", ExpenseSchema);
// export default Expense;
// models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    description: String,
    amount: Number,
    type: {
      type: String,
      enum: ["income", "expense"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);