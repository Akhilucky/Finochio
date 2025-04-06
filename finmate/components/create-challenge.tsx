"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, X, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const friends = [
  {
    id: "1",
    name: "Priya S.",
    avatar: "/priya.png?height=40&width=40",
    initials: "PS",
  },
  {
    id: "2",
    name: "rahul",
    avatar: "/rahul.png?height=40&width=40",
    initials: "RM",
  },
  {
    id: "3",
    name: "ananya",
    avatar: "/finmate/assets/ananya.png?height=40&width=40",
    initials: "AK",
  },
  {
    id: "4",
    name: "Vikram P.",
    avatar: "/vikram.png?height=40&width=40",
    initials: "VP",
  },
]

export function CreateChallenge() {
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const toggleFriend = (id: string) => {
    if (selectedFriends.includes(id)) {
      setSelectedFriends(selectedFriends.filter((friendId) => friendId !== id))
    } else {
      setSelectedFriends([...selectedFriends, id])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Challenge created!",
        description: "Your friends have been invited to join.",
      })
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Challenge</CardTitle>
        <CardDescription>Set up a savings challenge for you and your friends</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="challenge-name">Challenge Name</Label>
              <Input id="challenge-name" placeholder="e.g., No Takeout Week" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge-duration">Duration (days)</Label>
              <Input id="challenge-duration" type="number" placeholder="7" required min="1" max="30" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="challenge-rules">Challenge Rules</Label>
            <textarea
              id="challenge-rules"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Describe the rules of your challenge..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="challenge-prize">Prize</Label>
            <div className="flex">
              <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">
                ₹
              </div>
              <Input
                id="challenge-prize"
                type="number"
                className="rounded-l-none"
                placeholder="1000"
                required
                min="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Invite Friends</Label>
            <div className="grid gap-2 md:grid-cols-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center justify-between p-2 rounded-md border cursor-pointer ${
                    selectedFriends.includes(friend.id) ? "bg-primary/10 border-primary" : ""
                  }`}
                  onClick={() => toggleFriend(friend.id)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback>{friend.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{friend.name}</span>
                  </div>
                  {selectedFriends.includes(friend.id) ? (
                    <X className="h-4 w-4 text-primary" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
            {selectedFriends.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedFriends.length} {selectedFriends.length === 1 ? "friend" : "friends"} selected
                </span>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Challenge..." : "Create Challenge"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

