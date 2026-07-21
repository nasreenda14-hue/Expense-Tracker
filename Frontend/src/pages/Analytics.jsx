import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useExpenses from "../hooks/useExpenses";
import SummaryCards from "../components/SummaryCards";

export default function Analytics() {
  const { expenses, fetchExpenses, income, expense, balance } = useExpenses();

  // Data for chart

  const chartData = [
    {
      name: "Income",
      amount: income,
    },

    {
      name: "Expense",
      amount: expense,
    },

    {
      name: "Balance",
      amount: balance,
    },
  ];
  const totalTransactions = expenses.length;

  const averageTransaction =
    expenses.length > 0
      ? expenses.reduce((sum, item) => sum + item.amount, 0) / expenses.length
      : 0;

  const highestExpense =
    expenses.filter((item) => item.type === "expense").length > 0
      ? Math.max(
          ...expenses
            .filter((item) => item.type === "expense")
            .map((item) => item.amount),
        )
      : 0;

  const highestIncome =
    expenses.filter((item) => item.type === "income").length > 0
      ? Math.max(
          ...expenses
            .filter((item) => item.type === "income")
            .map((item) => item.amount),
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 relative">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

      <SummaryCards income={income} expense={expense} balance={balance} />

      {/* Bar Chart */}

      <div className="mt-8 bg-[#1a1a1a] p-6 rounded-2xl">
        <h2 className="text-lg mb-5 text-gray-300">Money Overview</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="amount" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Statistics Section */}

      <div className="mt-8 grid md:grid-cols-4 gap-6">
        <div className="bg-[#1a1a1a] p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Total Transactions</p>

          <h2 className="text-2xl font-bold mt-2">{totalTransactions}</h2>
        </div>

        <div className="bg-[#1a1a1a] p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Average Transaction</p>

          <h2 className="text-2xl font-bold mt-2 text-blue-400">
            ${averageTransaction.toFixed(2)}
          </h2>
        </div>

        <div className="bg-[#1a1a1a] p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Highest Income</p>

          <h2 className="text-2xl font-bold mt-2 text-green-400">
            ${highestIncome}
          </h2>
        </div>

        <div className="bg-[#1a1a1a] p-5 rounded-2xl">
          <p className="text-gray-400 text-sm">Highest Expense</p>

          <h2 className="text-2xl font-bold mt-2 text-red-400">
            ${highestExpense}
          </h2>
        </div>
      </div>
    </div>
  );
}
