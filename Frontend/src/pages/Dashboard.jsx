import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import TransactionForm from "./TransactionForm";
import useExpenses from "../hooks/useExpenses";
import SummaryCards from "../components/SummaryCards";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const { expenses, fetchExpenses, income, expense, balance } = useExpenses();
  const token = localStorage.getItem("token");
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDeleteId(null);
      fetchExpenses();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  const handleEdit = (item) => {
    setEditData(item);
    setShowForm(true);
  };
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

     <SummaryCards
  income={income}
  expense={expense}
  balance={balance}
/>
      {/* Table Section */}
      <div className="mt-10 bg-[#1a1a1a] p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-300">
            Transactions
          </h2>
          <button
            className="bg-lime-800 hover:bg-lime-600 text-white px-5 py-2 rounded-xl font-semibold transition shadow-lg"
            onClick={() => setShowForm(true)}
          >
            + Add Transaction
          </button>
          {showForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
              <TransactionForm
                fetchExpenses={fetchExpenses}
                setShowForm={setShowForm}
                editData={editData}
                setEditData={setEditData}
              />
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-800 hover:bg-[#2a2a2a] transition"
                >
                  {/* Title */}
                  <td className="p-3 text-white">{item.title}</td>

                  {/* Description */}
                  <td className="p-3 text-gray-400">
                    {item.description || "-"}
                  </td>

                  {/* Date */}
                  <td className="p-3 text-gray-300">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  {/* Amount */}
                  <td
                    className={`p-3 font-semibold ${
                      item.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.type === "income" ? "+" : "-"} ${item.amount}
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.type === "income"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-3 flex gap-3">
                    <button
                      className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition"
                      onClick={() => setDeleteId(item._id)}
                    >
                      Delete
                    </button>
                    {deleteId && (
                      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-[#1a1a1a] p-6 rounded-2xl shadow-xl w-full max-w-sm border border-gray-700">
                          <h2 className="text-xl font-semibold text-white mb-3">
                            Delete Transaction?
                          </h2>

                          <p className="text-gray-400 mb-6">
                            Are you sure you want to delete this transaction?
                            This action cannot be undone.
                          </p>

                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setDeleteId(null)}
                              className="px-5 py-2 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-600"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={handleDelete}
                              className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
