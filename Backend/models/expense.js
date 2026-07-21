import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["expense", "income"],
    default: "expense",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;