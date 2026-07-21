import React from "react";

export default function SummaryCards({ income, expense, balance }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      
      <div className="bg-[#1a1a1a] p-5 rounded-2xl">
        <p className="text-gray-400">Income</p>
        <h2 className="text-2xl text-green-400 font-bold">
          ${income}
        </h2>
      </div>

      <div className="bg-[#1a1a1a] p-5 rounded-2xl">
        <p className="text-gray-400">Expense</p>
        <h2 className="text-2xl text-red-400 font-bold">
          ${expense}
        </h2>
      </div>

      <div className="bg-[#1a1a1a] p-5 rounded-2xl">
        <p className="text-gray-400">Balance</p>
        <h2 className="text-2xl text-blue-400 font-bold">
          ${balance}
        </h2>
      </div>

    </div>
  );
}