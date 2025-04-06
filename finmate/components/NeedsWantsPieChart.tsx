import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const NeedsWantsPieChart = ({ needs, wants }: { needs: number; wants: number }) => {
  const data = {
    labels: ["Needs", "Wants"],
    datasets: [
      {
        data: [needs, wants],
        backgroundColor: ["#4CAF50", "#FF9800"],
        hoverBackgroundColor: ["#45A049", "#FF8C00"],
      },
    ],
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <h3 className="text-center text-lg font-semibold mb-4">Needs vs Wants</h3>
      <Pie data={data} />
    </div>
  );
};

export default NeedsWantsPieChart;
