import React from "react";
import { PieChart as RePieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface PieChartProps {
  data: { name: string; value: number; color: string }[];
}

export default function PieChart({ data }: PieChartProps) {
  return (
    <RePieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </RePieChart>
  );
}
