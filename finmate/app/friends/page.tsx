import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Users, Trophy, UserPlus, Bell, Search } from "lucide-react"
import { CreateChallenge } from "@/components/create-challenge"

const friendsList = [
  {
    name: "Priya S.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "PS",
    status: "Saved ₹12,450 this month",
    badge: "🥇 Top Saver",
  },
  {
    name: "Rahul M.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RM",
    status: "Saved ₹10,800 this month",
    badge: "🔥 5-day streak",
  },
  {
    name: "Ananya K.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AK",
    status: "Saved ₹8,200 this month",
    badge: "🎯 Goal Crusher",
  },
  {
    name: "Vikram P.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "VP",
    status: "Saved ₹7,500 this month",
    badge: "🆕 New Friend",
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

const friendRequests = [
  {
    name: "Arjun T.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AT",
    mutualFriends: 3,
  },
  {
    name: "Meera K.",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MK",
    mutualFriends: 1,
  },
]

export default function FriendsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Friends & Challenges</h1>
        <p className="text-muted-foreground">Connect with friends and compete in savings challenges</p>
      </div>

      <Tabs defaultValue="friends">
        <TabsList>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Friends</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search friends..." className="w-[200px] pl-8" />
              </div>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Friend
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {friendsList.map((friend, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{friend.name}</h3>
                        <p className="text-xs text-muted-foreground">{friend.status}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{friend.badge}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Savings Leaderboard</h2>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">This Month</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {friendsList.map((friend, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${index === 2 ? "bg-muted" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                        {index + 1}
                      </div>
                      <Avatar>
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback>{friend.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {friend.name} {index === 2 && <span className="text-xs text-muted-foreground">(You)</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">{friend.status}</p>
                      </div>
                    </div>
                    {index < 3 && (
                      <Badge variant="outline" className="ml-auto">
                        {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Active Challenges</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Challenge
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {challenges.map((challenge, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{challenge.title}</CardTitle>
                    <Badge variant="outline">{challenge.daysLeft}d left</Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center text-xs">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{challenge.participants} participants</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Prize: {challenge.prize}</span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <CreateChallenge />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Friend Requests</h2>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <Badge>{friendRequests.length}</Badge>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {friendRequests.map((request, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback>{request.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{request.name}</h3>
                        <p className="text-xs text-muted-foreground">{request.mutualFriends} mutual friends</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Ignore
                      </Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

