import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react"; // Add icons

export function FinancialClutch() {
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateInput = () => {
    if (amount < 1000) {
      setError("Minimum loan amount is ₹1,000");
      return false;
    }
    if (amount > 50000) {
      setError("Maximum loan amount is ₹50,000");
      return false;
    }
    if (reason.length < 10) {
      setError("Please provide a detailed reason for the loan");
      return false;
    }
    return true;
  };

  const handleLoanRequest = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!validateInput()) {
        setLoading(false);
        return;
      }

      const balanceResponse = await fetch("http://127.0.0.1:3000/api/update-balance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });

      const balanceData = await balanceResponse.json();
      
      if (balanceResponse.ok) {
        alert(`Loan approved! Added ₹${amount} to your balance`);
        setAmount(0);
        setReason("");
        // Update balance in dashboard
        window.dispatchEvent(new CustomEvent('balanceUpdate', { 
          detail: { amount: amount }
        }));
      } else {
        setError("Loan is being processed by Banks. Please wait a few minutes for approval.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Financial Clutch</CardTitle>
        <CardDescription>Need quick cash? Request a short-term loan @ Just 4% p.m </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 p-3 text-sm bg-red-50 text-red-600 rounded-md">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="amount">Loan Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            min="1000"
            max="50000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount needed"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason">Purpose of Loan</Label>
          <Input
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Brief description of why you need the loan"
          />
        </div>
        <Button 
          onClick={handleLoanRequest}
          className="w-full bg-primary"
          disabled={loading || !amount || !reason}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Request Loan"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
