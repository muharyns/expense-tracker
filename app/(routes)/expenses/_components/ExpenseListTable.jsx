// import { db } from '@/utils/dbConfig'
// import { Expenses } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
import { Trash, Pen } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import { changeToDate } from "@/lib/utils";
import axios from "axios";
import EditExpense from "./EditExpense";
function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const response = await axios.delete(`/api/expenses/${expense.id}`);

      if (response) {
        refreshData();
        toast("Expense Deleted!");
      }
    } catch (error) {
      toast(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-5 bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Category</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div className="grid grid-cols-5 bg-slate-50 p-2" key={index}>
          <h2>{expenses.name}</h2>
          <h2>{expenses.amount}</h2>
          <h2>{expenses.category}</h2>
          <h2>{changeToDate(expenses.createdAt)}</h2>
          <div className="flex">
            <EditExpense
              dataEdit={expenses}
              refreshData={() => refreshData()}
            />

            <Trash
              className="text-red-600 cursor-pointer"
              onClick={() => deleteExpense(expenses)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
