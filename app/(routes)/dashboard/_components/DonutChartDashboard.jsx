import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../../custom.css";
function DonutChartDashboard({ budgetList }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  const totalAmount = budgetList.data.reduce(
    (acc, curr) => acc + curr.totalAmount,
    0
  );
  // Custom legend formatter to display category and amount
  const renderLegend = (value, entry) => {
    const { color } = entry;
    const amount =
      budgetList.data.find((d) => d.category === value)?.totalAmount || 0;
    const percentage = ((amount / totalAmount) * 100).toFixed(2);
    return (
      // <div
      //   style={{
      //     display: "flex",
      //     justifyContent: "space-between",
      //     width: "200px",
      //     padding: "4px 0",
      //   }}
      // >

      // </div>

      <div className="grid grid-cols-3 gap-4">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "250px",
            padding: "4px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: color,
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "8px",
              }}
            ></span>
            <span className={{ wordWrap: "break-word" }}>{value}</span>
          </div>
          <span style={{ textAlign: "right" }}>
            {amount} ({percentage}%)
          </span>
        </div>
        {/* <span style={{ wordWrap: "break-word" }}>{value}</span>
        <span style={{ textAlign: "right" }}>{amount}</span>
        <span>({percentage}%)</span> */}
      </div>
    );
  };
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg">Expenses by Category</h2>
      <ResponsiveContainer
        width={"100%"}
        height={300}
        className={"category-chart"}
      >
        <PieChart>
          <Pie
            data={budgetList.data}
            dataKey="totalAmount"
            nameKey="category"
            innerRadius={60}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          >
            {budgetList.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={renderLegend}
            wrapperStyle={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonutChartDashboard;
