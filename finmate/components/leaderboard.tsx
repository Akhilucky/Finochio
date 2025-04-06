"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Plus } from "lucide-react"

const leaderboardData = [
  {
    name: "Priya S.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
    saved: "₹12,450",
    rank: 1,
    isUser: false,
  },
  {
    name: "Rahul M.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RM",
    saved: "₹10,800",
    rank: 2,
    isUser: false,
  },
  {
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JD",
    saved: "₹9,650",
    rank: 3,
    isUser: true,
  },
  {
    name: "Ananya K.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AK",
    saved: "₹8,200",
    rank: 4,
    isUser: false,
  },
  {
    name: "Vikram P.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VP",
    saved: "₹7,500",
    rank: 5,
    isUser: false,
  },
]

const challenges = [
  {
    title: "No Spend Weekend",
    participants: 12,
    prize: "₹500 Cashback",
    daysLeft: 3,
  },
  {
    title: "Coffee Budget Challenge",
    participants: 24,
    prize: "₹1000 Cashback",
    daysLeft: 7,
  },
]

export function Leaderboard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Savings Leaderboard</CardTitle>
              <CardDescription>This month's top savers</CardDescription>
            </div>
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${user.isUser ? "bg-muted" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                    {user.rank}
                  </div>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {user.name} {user.isUser && <span className="text-xs text-muted-foreground">(You)</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">Saved {user.saved} this month</p>
                  </div>
                </div>
                {user.rank <= 3 && (
                  <Badge variant="outline" className="ml-auto">
                    {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Challenges</CardTitle>
              <CardDescription>Join savings challenges</CardDescription>
            </div>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <div key={index} className="rounded-lg border p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{challenge.title}</h4>
                  <Badge variant="outline">{challenge.daysLeft}d left</Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{challenge.participants} participants</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{challenge.prize}</span>
                  <Button size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Join
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

