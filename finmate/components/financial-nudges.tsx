"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, TrendingUp, Coffee, ShoppingBag } from "lucide-react"

const nudges = [
  {
    icon: Lightbulb,
    message: "You've spent 30% more on dining out this week. Consider cooking at home to save more! 🍳",
    color: "text-yellow-500",
  },
  {
    icon: TrendingUp,
    message: "Great job! You're on track to meet your monthly savings goal. Keep it up! 🎯",
    color: "text-green-500",
  },
  {
    icon: Coffee,
    message: "Small daily purchases add up. Your coffee spending is ₹1,200 this month! ☕",
    color: "text-orange-500",
  },
  {
    icon: ShoppingBag,
    message: "Weekend shopping spree? Wait 24 hours before making non-essential purchases. 🛍️",
    color: "text-blue-500",
  },
]

export function FinancialNudges() {
  return (
    <div className="space-y-4">
      {nudges.map((nudge, index) => (
        <Card key={index} className="bg-muted/50">
          <CardContent className="flex items-start gap-4 p-4">
            <div className={`rounded-full p-2 ${nudge.color} bg-background`}>
              <nudge.icon className="h-4 w-4" />
            </div>
            <p className="text-sm">{nudge.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

