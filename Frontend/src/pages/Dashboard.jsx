import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Dashboard() {
  const [expense, setExpense] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!title || !amount) {
      alert("Please enter title and amount");
      return;
    }

    if (editId) {
      // UPDATE
      axios
        .put(`http://localhost:5000/expenses/${editId}`, { title, amount })
        .then((res) => {
          setExpense((prev) =>
            prev.map((exp) => (exp._id === editId ? res.data : exp)),
          );
          setEditId(null);
          setTitle("");
          setAmount("");
        })
        .catch((err) => console.log(err));
    } else {
      // CREATE
      axios
        .post("http://localhost:5000/expenses", { title, amount })
        .then((res) => {
          setExpense((prev) => [...prev, res.data]);
          setTitle("");
          setAmount("");
        });
    }
  };
  const handleEdit = (exp) => {
    setTitle(exp.title);
    setAmount(exp.amount);
    setEditId(exp._id);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/expenses/${id}`)
      .then((res) => {
        setExpense((prev) => prev.filter((exp) => exp._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/expenses")
      .then((res) => setExpense(res.data));
  }, []);

  const total = expense.reduce((sum, exp) => sum + Number(exp.amount), 0);
  return (
    <div>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleAdd} disabled={!title || !amount}>
        {editId ? "Update" : "Add"}
      </button>
      <h3 className="total">Total Amount:AED {total}</h3>
      <div className="expense-list">
        {expense.map((exp) => (
          <div key={exp._id} className="expense-item">
            <p>
              {exp.title} - ₹{exp.amount}
            </p>
            <div className="btn-group">
              <button className="edit-btn" onClick={() => handleEdit(exp)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(exp._id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
