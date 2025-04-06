"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X } from "lucide-react"

const messagesInit = [
  {
    role: "assistant",
    content: "Hi there! I'm your FinMate. How can I help you with your finances today?",
  },
  {
    role: "user",
    content: "I spent too much on food this week. Any tips?",
  },
  {
    role: "assistant",
    content:
      "I noticed that too! You've spent ₹4,850 on food this week, which is 30% more than your usual. Here are some quick tips:\n\n1. Try meal prepping for the week\n2. Make a grocery list before shopping\n3. Use the 24-hour rule before ordering takeout\n\nWould you like me to help you set a food budget for next week?",
  },
]

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState(messagesInit)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.trim() }),
      })
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      const data = await res.json()

      const botMessage = {
        role: "assistant",
        content: data.response || "Sorry, I couldn’t understand that.",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Please try again later.",
        },
      ])
    }
  }

  return (
    <>
      {isOpen ? (
        <Card className="fixed bottom-20 right-4 w-80 md:w-96 z-50 shadow-lg">
          <CardHeader className="p-3 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="FinMate" />
                <AvatarFallback>FM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">FinMate Assistant</h3>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-3 max-h-80 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[80%] ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="p-3">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </>
  )
}