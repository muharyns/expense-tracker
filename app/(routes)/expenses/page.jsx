import React from "react";
import ExpenseList from "./_components/ExpenseList";
function Expense() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <ExpenseList />
    </div>
  );
}

export default Expense;
