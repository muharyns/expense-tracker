"use client";
import axios from "axios";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import LineChartDashboard from "./_components/LineChartDashboard";
import DonutChartDashboard from "./_components/DonutChartDashboard";
import ExpenseListTable from "../expenses/_components/ExpenseListTable";
function Dashboard() {
  const [expensesList, setExpensesList] = useState([]);
  const [monthlyExpense, setMonthlyExpense] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [categoryExpenses, setCategoryExpenses] = useState([]);

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
    (async () => {
      try {
        const monthlyExpenses = await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses/monthly`)
          .then((response) => response.data);

        setMonthlyExpense(monthlyExpenses);

        const categoryExpensesData = await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/api/expenses/category`)
          .then((response) => response.data);
        setCategoryExpenses(categoryExpensesData);

        setisLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      getExpenseList();
    })();
  }, []);

  if (!isLoading)
    return (
      <div className="p-8">
        <h2 className="font-bold text-3xl">Hi, {user?.fullName} ✌🏻</h2>
        <p className="text-gray-500">
          Here's what happening with your money, Let's Manage your expense
        </p>

        <CardInfo expenseList={expensesList} monthlyExpense={monthlyExpense} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-6 gap-5">
          <LineChartDashboard monthlyExpense={monthlyExpense} />
          <DonutChartDashboard budgetList={categoryExpenses} />
          <div className="md:col-span-2">
            {/* <BarChartDashboard budgetList={budgetList} /> */}
            <ExpenseListTable
              expensesList={expensesList}
              refreshData={() => getExpenseList()}
            />
          </div>

          <div className="grid gap-5"> </div>
        </div>
      </div>
    );
}

export default Dashboard;
