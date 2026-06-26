const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Expense = require("./models/expense");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/expns")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/expenses", (req, res) => {
  Expense.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/expenses", (req, res) => {
  Expense.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/expenses/:id", (req, res) => {
  Expense.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/expenses/:id", (req, res) => {
  Expense.findByIdAndDelete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
