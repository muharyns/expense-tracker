import React from "react";
import {
  Line,
  LineChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function LineChartDashboard({ monthlyExpense }) {
  // Assuming monthlyExpense.data is the array containing monthly data
  const data = monthlyExpense.data || [];

  // Function to convert month format ("yyyy-mm") to month name ("Jan", "Feb", etc.)
  const getMonthName = (month) => {
    const date = new Date(month);

    return date.toLocaleString("default", { month: "short" });
  };

  // Transforming data to use month names instead of full dates
  const transformedData = data.map((item) => ({
    ...item,
    month: getMonthName(item.month),
  }));

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Monthly Expenses</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
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
          <Line type="monotone" dataKey="totalAmount" stroke="#5BBCFF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartDashboard;
