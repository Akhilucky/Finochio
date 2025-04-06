"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#FF8042"];

export function NeedsVsWantsChart() {
  const [spendingData, setSpendingData] = useState([
    { name: "Needs", value: 0 },
    { name: "Wants", value: 0 },
  ]);

  useEffect(() => {
    // Mock API call to fetch spending data
    const fetchSpendingData = async () => {
      const response = await fetch("http://127.0.0.1:3000/api/spending-data");
      const data = await response.json();
      setSpendingData([
        { name: "Needs", value: data.needs },
        { name: "Wants", value: data.wants },
      ]);
    };

    fetchSpendingData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={spendingData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {spendingData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
