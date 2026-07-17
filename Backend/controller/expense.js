// // controllers/expenseController.js
// import Expense from "../models/Expense.js";

// // ADD
// export const addExpense = async (req, res) => {
//   try {
//     const expense = await Expense.create({
//       ...req.body,
//       user: req.user.id,
//     });

//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // GET ALL
// export const getExpenses = async (req, res) => {
//   try {
//     const expenses = await Expense.find({ user: req.user.id });
//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // DELETE
// export const deleteExpense = async (req, res) => {
//   try {
//     await Expense.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE
// export const updateExpense = async (req, res) => {
//   try {
//     const updated = await Expense.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };