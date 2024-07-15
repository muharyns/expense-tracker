import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Function to convert month format ("yyyy-mm") to month name ("Jan", "Feb", etc.)
const getMonthName = (month) => {
  const date = new Date(month);
  return date.toLocaleString("default", { month: "short" });
};

function BarChartDashboard({ budgetList }) {
  // return (
  //   <div className="border rounded-lg p-5">
  //     <h2 className="font-bold text-lg">Activity</h2>
  //     <ResponsiveContainer width={'80%'} height={300}>
  //       <BarChart
  //         data={budgetList}
  //         margin={{
  //           top: 7,
  //         }}
  //       >
  //         <XAxis dataKey="name" />
  //         <YAxis />
  //         <Tooltip />
  //         <Legend />
  //         <Bar dataKey="totalSpend" stackId="a" fill="#5BBCFF" />
  //         <Bar dataKey="amount" stackId="a" fill="#A0DEFF" />
  //       </BarChart>
  //     </ResponsiveContainer>
  //   </div>
  // );
  const data = budgetList.data || [];

  // Transforming data to use month names instead of full dates
  const transformedData = data.map((item) => ({
    ...item,
    month: getMonthName(item.month),
  }));

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Monthly Expenses</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          data={transformedData}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 20,
          }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalAmount" fill="#5BBCFF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
