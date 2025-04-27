"use client"

import { useState } from "react"
import { Filter, HelpCircle, MessageSquare, Plus, Search, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

interface SupportTicket {
  id: string
  subject: string
  description: string
  status: "open" | "in-progress" | "resolved" | "closed"
  priority: "low" | "medium" | "high"
  category: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    avatar: string
  }
  messages: {
    id: string
    content: string
    timestamp: string
    sender: "user" | "staff"
    senderName: string
    senderAvatar: string
  }[]
}

const supportTickets: SupportTicket[] = [
  {
    id: "T001",
    subject: "PC #3 not working properly",
    description: "The PC keeps crashing when playing Valorant. It happens every 15-20 minutes.",
    status: "open",
    priority: "high",
    category: "Technical Issue",
    createdAt: "2025-04-26T10:30:00",
    updatedAt: "2025-04-26T10:30:00",
    user: {
      id: "U001",
      name: "Alex Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    messages: [
      {
        id: "M001",
        content:
          "The PC keeps crashing when playing Valorant. It happens every 15-20 minutes. I've tried restarting it but the issue persists.",
        timestamp: "2025-04-26T10:30:00",
        sender: "user",
        senderName: "Alex Smith",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "T002",
    subject: "Subscription renewal issue",
    description:
      "I tried to renew my premium subscription but the payment failed. My card is working fine for other purchases.",
    status: "in-progress",
    priority: "medium",
    category: "Billing",
    createdAt: "2025-04-25T14:15:00",
    updatedAt: "2025-04-26T09:45:00",
    user: {
      id: "U002",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    messages: [
      {
        id: "M002",
        content:
          "I tried to renew my premium subscription but the payment failed. My card is working fine for other purchases.",
        timestamp: "2025-04-25T14:15:00",
        sender: "user",
        senderName: "Sarah Johnson",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "M003",
        content:
          "Hi Sarah, I'm looking into this issue for you. Could you please confirm which payment method you were using?",
        timestamp: "2025-04-25T15:30:00",
        sender: "staff",
        senderName: "Support Team",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "M004",
        content:
          "I was using my Visa credit card ending in 4582. It works for all other payments but fails here with an error code 'Payment declined'.",
        timestamp: "2025-04-26T09:45:00",
        sender: "user",
        senderName: "Sarah Johnson",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "T003",
    subject: "Tournament registration question",
    description: "I want to register my team for the upcoming Valorant tournament but I'm not sure how to do it.",
    status: "resolved",
    priority: "low",
    category: "Competition",
    createdAt: "2025-04-24T11:20:00",
    updatedAt: "2025-04-25T13:10:00",
    user: {
      id: "U003",
      name: "Mike Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    messages: [
      {
        id: "M005",
        content:
          "I want to register my team for the upcoming Valorant tournament but I'm not sure how to do it. Can you help?",
        timestamp: "2025-04-24T11:20:00",
        sender: "user",
        senderName: "Mike Williams",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "M006",
        content:
          "Hi Mike! You can register your team by going to the Competitions page, selecting the Valorant tournament, and clicking the 'Register' button. Make sure all your team members have active accounts.",
        timestamp: "2025-04-24T12:45:00",
        sender: "staff",
        senderName: "Support Team",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "M007",
        content: "Thanks! I found it and registered my team successfully.",
        timestamp: "2025-04-25T10:30:00",
        sender: "user",
        senderName: "Mike Williams",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "M008",
        content: "Great! Let me know if you need anything else. Good luck in the tournament!",
        timestamp: "2025-04-25T13:10:00",
        sender: "staff",
        senderName: "Support Team",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "T004",
    subject: "Game installation request",
    description: "Can you please install Apex Legends on the PC stations? Many players have been requesting it.",
    status: "closed",
    priority: "medium",
    category: "Game Request",
    createdAt: "2025-04-22T16:40:00",
    updatedAt: "2025-04-23T14:20:00",
    user: {
      id: "U004",
      name: "Jessica Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    messages: [
      {
        id: "M009",
        content: "Can you please install Apex Legends on the PC stations? Many players have been requesting it.",
        timestamp: "2025-04-22T16:40:00",
        sender: "user",
        senderName: "Jessica Brown",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "M010",
        content:
          "Thanks for the suggestion, Jessica! We'll add Apex Legends to our installation queue and should have it available within the next 48 hours.",
        timestamp: "2025-04-22T17:30:00",
        sender: "staff",
        senderName: "Support Team",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "M011",
        content: "Great news! Apex Legends has been installed on all PC stations and is now available to play.",
        timestamp: "2025-04-23T14:20:00",
        sender: "staff",
        senderName: "Support Team",
        senderAvatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
]

const faqs = [
  {
    question: "How do I book a gaming session?",
    answer:
      "You can book a gaming session through our website or mobile app. Simply select the date, time, duration, and gaming station (PC or PlayStation). You can also book in person at the front desk.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, mobile payments (Apple Pay, Google Pay), and cash for in-person payments. Subscription members can use their credits for bookings.",
  },
  {
    question: "How do I join or create a team?",
    answer:
      "To create a team, go to the Teams section and click 'Create Team'. To join an existing team, search for the team name and click 'Request to Join'. Team captains will need to approve your request.",
  },
  {
    question: "What happens if I need to cancel my booking?",
    answer:
      "Bookings can be cancelled up to 2 hours before the scheduled time for a full refund. Cancellations made less than 2 hours in advance will incur a 50% fee.",
  },
  {
    question: "How do I register for tournaments?",
    answer:
      "Go to the Competitions section to view all upcoming tournaments. Select the tournament you're interested in and click 'Register'. You can register as an individual or as a team depending on the tournament type.",
  },
  {
    question: "What subscription plans do you offer?",
    answer:
      "We offer three subscription tiers: Basic, Premium, and VIP. Each tier provides different benefits including discounted rates, priority bookings, and free tournament entries. Visit the Subscriptions page for details.",
  },
  {
    question: "Can I bring my own peripherals?",
    answer:
      "Yes, you're welcome to bring your own keyboard, mouse, headset, or controller. Our stations are equipped with standard peripherals, but many players prefer using their own equipment.",
  },
  {
    question: "Do you serve food and drinks?",
    answer:
      "Yes, we have a snack bar offering drinks, snacks, and light meals. Outside food and drinks are not permitted except for water in closed containers.",
  },
]

export function SupportPage() {
  const [view, setView] = useState<"tickets" | "faqs">("tickets")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const filteredTickets = supportTickets.filter((ticket) => {
    // Apply search filter
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.user.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    // Apply category filter
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const filteredFaqs = faqs.filter((faq) => {
    return (
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Resolved
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-400">
            Closed
          </Badge>
        )
      default:
        return null
    }
  }

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            High
          </Badge>
        )
      default:
        return null
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return

    // In a real app, this would send the message to the server
    console.log("Sending message:", newMessage)
    setNewMessage("")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-white">Support Center</h2>
          <p className="text-gray-400">Manage support tickets and help resources</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-white">Create Support Ticket</DialogTitle>
                <DialogDescription>Fill in the details to create a new support ticket.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter ticket subject" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="game">Game Request</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your issue in detail"
                    className="min-h-[100px] bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700">
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Submit Ticket</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Tabs value={view} onValueChange={(v) => setView(v as "tickets" | "faqs")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={view} className="w-full">
        <TabsContent value="tickets" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="font-heading text-xl text-white">Support Tickets</CardTitle>
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Search tickets..."
                          className="w-full bg-gray-800 border-gray-700 pl-8 md:w-[200px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                          <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Technical Issue">Technical</SelectItem>
                            <SelectItem value="Billing">Billing</SelectItem>
                            <SelectItem value="Competition">Competition</SelectItem>
                            <SelectItem value="Game Request">Game Request</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`cursor-pointer rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all hover:border-gray-700 ${
                          selectedTicket?.id === ticket.id ? "border-purple-500 ring-1 ring-purple-500" : ""
                        }`}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={ticket.user.avatar || "/placeholder.svg"} alt={ticket.user.name} />
                            <AvatarFallback className="bg-purple-700">
                              {ticket.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">{ticket.subject}</h3>
                              {getStatusBadge(ticket.status)}
                            </div>
                            <p className="mt-1 text-sm text-gray-400 line-clamp-1">{ticket.description}</p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                              <span>{ticket.user.name}</span>
                              <span>•</span>
                              <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{ticket.category}</span>
                              <span className="ml-auto">{getPriorityBadge(ticket.priority)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredTickets.length === 0 && (
                      <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                        <MessageSquare className="mx-auto h-12 w-12 text-gray-600" />
                        <h3 className="mt-4 text-lg font-medium text-white">No tickets found</h3>
                        <p className="mt-2 text-gray-400">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-white">Ticket Details</CardTitle>
                  <CardDescription>View and respond to support tickets</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedTicket ? (
                    <div className="flex h-[500px] flex-col">
                      <div className="mb-4 space-y-2 border-b border-gray-800 pb-4">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-white">{selectedTicket.subject}</h2>
                          {getStatusBadge(selectedTicket.status)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>Ticket #{selectedTicket.id}</span>
                          <span>•</span>
                          <span>{selectedTicket.category}</span>
                          <span>•</span>
                          <span>{getPriorityBadge(selectedTicket.priority)}</span>
                        </div>
                        <p className="text-sm text-gray-300">{selectedTicket.description}</p>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {selectedTicket.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.sender === "user" ? "flex-row" : "flex-row-reverse"}`}
                          >
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarImage src={message.senderAvatar || "/placeholder.svg"} alt={message.senderName} />
                              <AvatarFallback className={message.sender === "user" ? "bg-blue-700" : "bg-purple-700"}>
                                {message.senderName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 max-w-[80%] ${
                                message.sender === "user"
                                  ? "bg-blue-900/30 border border-blue-800"
                                  : "bg-purple-900/30 border border-purple-800"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-sm font-medium text-white">{message.senderName}</span>
                                <span className="text-xs text-gray-400">
                                  {new Date(message.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                              <p className="mt-1 text-sm text-gray-300">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedTicket.status !== "closed" && selectedTicket.status !== "resolved" && (
                        <div className="mt-4 flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-800 border-gray-700"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                          />
                          <Button
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                          >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                          </Button>
                        </div>
                      )}
                      {(selectedTicket.status === "closed" || selectedTicket.status === "resolved") && (
                        <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-3 text-center text-gray-400">
                          This ticket is {selectedTicket.status}. No further responses can be added.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                      <MessageSquare className="mx-auto h-12 w-12 text-gray-600" />
                      <h3 className="mt-4 text-lg font-medium text-white">No ticket selected</h3>
                      <p className="mt-2 text-gray-400">Select a ticket to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="faqs" className="mt-0">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle className="font-heading text-xl text-white">Frequently Asked Questions</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search FAQs..."
                    className="w-full bg-gray-800 border-gray-700 pl-8 md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600">
                        <HelpCircle className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{faq.question}</h3>
                        <p className="mt-2 text-sm text-gray-400">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredFaqs.length === 0 && (
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                    <HelpCircle className="mx-auto h-12 w-12 text-gray-600" />
                    <h3 className="mt-4 text-lg font-medium text-white">No FAQs found</h3>
                    <p className="mt-2 text-gray-400">Try adjusting your search</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
