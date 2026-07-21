import { useEffect, useState } from "react";
import axios from "axios";

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(
       `${import.meta.env.VITE_API_URL}/api/expenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses(res.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchExpenses();
  }, []);


  const income = expenses
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);


  const expense = expenses
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);


  const balance = income - expense;


  return {
    expenses,
    setExpenses,
    fetchExpenses,
    income,
    expense,
    balance,
  };
}