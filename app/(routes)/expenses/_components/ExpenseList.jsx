"use client";
import React, { useEffect, useState } from "react";
import CreateExpense from "./CreateExpense";
// import { db } from "@/utils/dbConfig";
// import { desc, eq, getTableColumns, sql } from "drizzle-orm";
// import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";

import axios from "axios";
import ExpenseItem from "./ExpenseItem";

function ExpenseList() {
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  const getExpenseList = async () => {
    const ExpensesAll = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
    setExpensesList(ExpensesAll);
  };
  useEffect(() => {
    user && getExpenseList();
  }, []);

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateExpense refreshData={() => getExpenseList()} />
        {expensesList?.length > 0
          ? expensesList.map((budget, index) => (
              <ExpenseItem budget={budget} key={index} />
            ))
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[180px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default ExpenseList;
