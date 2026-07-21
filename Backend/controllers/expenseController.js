import Expense from "../models/expense.js";



// Add Expense
export const addExpense = async (req, res) => {
  try {
    const { title, description, amount, type } = req.body;

    // validation
    if (!title || !amount || !type) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const expense = await Expense.create({
      user: req.user.id,  
      title,
      description,
      amount,
      type,
      date: new Date(),    
    });

    res.status(201).json({
      message: "Transaction added successfully",
      expense,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};