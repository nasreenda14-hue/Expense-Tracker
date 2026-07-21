import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionForm({
  fetchExpenses,
  setShowForm,
  editData,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    type: "expense",
    date: "",
  });
 const token = localStorage.getItem("token");
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title,
        description: editData.description,
        amount: editData.amount,
        type: editData.type,
        date: editData.date.split("T")[0], 
      });
    }
  }, [editData]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/expenses/${editData._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        
        await axios.post(`${import.meta.env.VITE_API_URL}/api/expenses`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      fetchExpenses();
      setShowForm(false);
      setEditData(null); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold text-gray-200 mb-5">
        {" "}
        Add Transaction{" "}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-[#111] text-white p-3 rounded-xl outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-[#111] text-white p-3 rounded-xl outline-none"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full bg-[#111] text-white p-3 rounded-xl outline-none"
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full bg-[#111] text-white p-3 rounded-xl outline-none"
        >
          <option value="expense"> Expense </option>
          <option value="income"> Income </option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-lime-700 hover:bg-lime-500 px-5 py-2 rounded-xl font-semibold"
          >
            {" "}
            Save Transaction
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-5 py-2 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
