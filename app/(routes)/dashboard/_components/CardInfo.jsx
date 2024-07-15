import { Coins, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ expenseList, monthlyExpense }) {
  const [totalSpend, setTotalSpend] = useState(0);
  useEffect(() => {
    //console.log("monthlyExpense", monthlyExpense);
    expenseList && CalculateCardInfo();
  }, [expenseList]);

  // Get the current month in 'YYYY-MM' format
  const currentDate = new Date();
  const currentMonth = `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}`;

  // Filter the data for the current month
  const currentMonthData = monthlyExpense.data.filter(
    (item) => item.month === currentMonth
  );

  // Sum the totalAmount for the current month
  const totalAmountThisMonth = currentMonthData.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const CalculateCardInfo = () => {
    let totalSpend_ = 0;
    expenseList.forEach((element) => {
      totalSpend_ = totalSpend_ + Number(element.amount);
    });

    setTotalSpend(totalSpend_);
  };
  return (
    <div>
      {expenseList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">This Month Expenses</h2>
              <h2 className="font-bold text-2xl">${totalAmountThisMonth}</h2>
            </div>
            <Coins className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>

          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="font-bold text-2xl">${totalSpend}</h2>
            </div>
            <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>

          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No. of Expense</h2>
              <h2 className="font-bold text-2xl">{expenseList?.length}</h2>
            </div>
            <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[160px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
