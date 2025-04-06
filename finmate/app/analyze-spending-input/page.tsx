"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AnalyzeSpendingInputPage() {
  const [amount, setAmount] = useState<number | string>("");
  const [type, setType] = useState<string>("needs");
  const [category, setCategory] = useState<string>("");
  const [spendingHistory, setSpendingHistory] = useState<any[]>([]);

  const fetchSpendingHistory = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        alert("Email is required to fetch spending history.");
        return;
      }

      const response = await fetch("http://127.0.0.1:3000/api/spending-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setSpendingHistory(result.data);
      } else {
        alert(result.message || "Failed to fetch spending history.");
      }
    } catch (error) {
      alert("An unexpected error occurred while fetching spending history.");
    }
  };

  useEffect(() => {
    fetchSpendingHistory();
  }, []);

  const handleSubmit = async () => {
    if (!amount || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const spendingData = {
      amount: Number(amount),
      type,
      category,
    };

    try {
      const response = await fetch("http://127.0.0.1:3000/api/analyze-spending", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spendingData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Spending analysis completed!");
        setAmount("");
        setType("needs");
        setCategory("");
        fetchSpendingHistory(); // Refresh spending history
      } else {
        alert(result.message || "Failed to analyze spending.");
      }
    } catch (error) {
      alert("An unexpected error occurred while analyzing spending.");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-muted/10 rounded-lg max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Analyze Spending</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Type</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="needs">Needs</SelectItem>
              <SelectItem value="wants">Wants</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Category</label>
          <Input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Spending History</h2>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {spendingHistory.map((spending, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">₹{spending.amount}</td>
                <td className="border border-gray-300 px-4 py-2">{spending.category}</td>
                <td className="border border-gray-300 px-4 py-2">{spending.type}</td>
                <td className="border border-gray-300 px-4 py-2">{spending.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
