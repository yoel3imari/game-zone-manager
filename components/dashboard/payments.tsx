"use client"

import { useState } from "react"
import { Calendar, CreditCard, Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Payment {
  id: string
  user: {
    name: string
    email: string
    avatar: string
  }
  amount: number
  date: string
  method: "credit_card" | "paypal" | "cash" | "bank_transfer"
  status: "completed" | "pending" | "failed" | "refunded"
  type: "booking" | "subscription" | "tournament" | "merchandise"
  description: string
}

const payments: Payment[] = [
  {
    id: "P001",
    user: {
      name: "Alex Smith",
      email: "alex.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 25.0,
    date: "2025-04-27T14:30:00",
    method: "credit_card",
    status: "completed",
    type: "booking",
    description: "2-hour PC gaming session",
  },
  {
    id: "P002",
    user: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 49.99,
    date: "2025-04-26T10:15:00",
    method: "paypal",
    status: "completed",
    type: "subscription",
    description: "Premium Monthly Subscription",
  },
  {
    id: "P003",
    user: {
      name: "Mike Williams",
      email: "mike.williams@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 20.0,
    date: "2025-04-26T16:45:00",
    method: "credit_card",
    status: "pending",
    type: "tournament",
    description: "Valorant Tournament Entry Fee",
  },
  {
    id: "P004",
    user: {
      name: "Jessica Brown",
      email: "jessica.brown@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 35.0,
    date: "2025-04-25T13:20:00",
    method: "cash",
    status: "completed",
    type: "booking",
    description: "3-hour PlayStation gaming session",
  },
  {
    id: "P005",
    user: {
      name: "Tom Harris",
      email: "tom.harris@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 29.99,
    date: "2025-04-25T11:10:00",
    method: "credit_card",
    status: "failed",
    type: "merchandise",
    description: "Gaming Zone T-Shirt",
  },
  {
    id: "P006",
    user: {
      name: "Emma Lewis",
      email: "emma.lewis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 15.0,
    date: "2025-04-24T18:30:00",
    method: "paypal",
    status: "refunded",
    type: "booking",
    description: "1-hour PC gaming session",
  },
  {
    id: "P007",
    user: {
      name: "John Davis",
      email: "john.davis@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 99.99,
    date: "2025-04-24T09:45:00",
    method: "credit_card",
    status: "completed",
    type: "subscription",
    description: "VIP Monthly Subscription",
  },
  {
    id: "P008",
    user: {
      name: "Lisa Wilson",
      email: "lisa.wilson@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    amount: 45.0,
    date: "2025-04-23T14:15:00",
    method: "bank_transfer",
    status: "completed",
    type: "tournament",
    description: "FIFA Tournament Entry Fee",
  },
]

export function PaymentsPage() {
  const [view, setView] = useState<"all" | "subscriptions" | "bookings" | "tournaments">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [methodFilter, setMethodFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const filteredPayments = payments.filter((payment) => {
    // Apply search filter
    const matchesSearch =
      payment.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    // Apply method filter
    const matchesMethod = methodFilter === "all" || payment.method === methodFilter

    // Apply type filter based on view
    const matchesType =
      view === "all" ||
      (view === "subscriptions" && payment.type === "subscription") ||
      (view === "bookings" && payment.type === "booking") ||
      (view === "tournaments" && payment.type === "tournament")

    // Apply date filter (in a real app, you'd have more sophisticated date filtering)
    const matchesDate = dateFilter === "all" || true // Simplified for this example

    return matchesSearch && matchesStatus && matchesMethod && matchesType && matchesDate
  })

  const totalAmount = filteredPayments.reduce((sum, payment) => {
    if (payment.status === "completed") {
      return sum + payment.amount
    }
    return sum
  }, 0)

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Failed
          </Badge>
        )
      case "refunded":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Refunded
          </Badge>
        )
      default:
        return null
    }
  }

  const getMethodBadge = (method: Payment["method"]) => {
    switch (method) {
      case "credit_card":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            <CreditCard className="mr-1 h-3 w-3" />
            Credit Card
          </Badge>
        )
      case "paypal":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            PayPal
          </Badge>
        )
      case "cash":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Cash
          </Badge>
        )
      case "bank_transfer":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-400">
            Bank Transfer
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeBadge = (type: Payment["type"]) => {
    switch (type) {
      case "booking":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Booking
          </Badge>
        )
      case "subscription":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Subscription
          </Badge>
        )
      case "tournament":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Tournament
          </Badge>
        )
      case "merchandise":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Merchandise
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-white">Payments</h2>
          <p className="text-gray-400">Manage and track all financial transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Tabs value={view} onValueChange={(v) => setView(v as "all" | "subscriptions" | "bookings" | "tournaments")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="font-heading text-xl text-white">Transactions</CardTitle>
              <CardDescription>
                {filteredPayments.length} transactions • ${totalAmount.toFixed(2)} total
              </CardDescription>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 bg-gray-950">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Transaction ID</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Customer</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Method</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment, i) => (
                    <tr
                      key={payment.id}
                      className={`border-b border-gray-800 ${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/60"}`}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-white">{payment.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={payment.user.avatar || "/placeholder.svg"} alt={payment.user.name} />
                            <AvatarFallback className="bg-purple-700">
                              {payment.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">{payment.user.name}</div>
                            <div className="text-xs text-gray-400">{payment.user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-white">${payment.amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {new Date(payment.date).toLocaleDateString()}
                        <div className="text-xs text-gray-400">
                          {new Date(payment.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{getMethodBadge(payment.method)}</td>
                      <td className="px-4 py-3 text-sm">{getTypeBadge(payment.type)}</td>
                      <td className="px-4 py-3 text-sm">{getStatusBadge(payment.status)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="outline" size="sm" className="h-8 border-gray-700">
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                        No transactions found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Payment Methods</CardTitle>
            <CardDescription>Distribution of payment methods used</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="flex h-full items-center justify-center">
                <div className="relative h-64 w-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-gray-900"></div>
                  </div>
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                      clipPath: "polygon(50% 50%, 100% 0, 100% 50%)",
                      background: "linear-gradient(to right, #9333ea, #a855f7)",
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                      clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                      background: "linear-gradient(to right, #3b82f6, #60a5fa)",
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                      clipPath: "polygon(50% 50%, 50% 100%, 0 100%, 0 50%)",
                      background: "linear-gradient(to right, #22c55e, #4ade80)",
                    }}
                  ></div>
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{
                      clipPath: "polygon(50% 50%, 0 50%, 0 0, 50% 0)",
                      background: "linear-gradient(to right, #64748b, #94a3b8)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-400">Credit Card (45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-400">PayPal (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-400">Cash (20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                <span className="text-sm text-gray-400">Bank Transfer (10%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Revenue by Category</CardTitle>
            <CardDescription>Distribution of revenue by transaction type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="font-medium text-white">Bookings</span>
                  </div>
                  <span className="text-sm text-gray-400">$8,750</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="h-full w-[35%] rounded-full bg-blue-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span className="font-medium text-white">Subscriptions</span>
                  </div>
                  <span className="text-sm text-gray-400">$12,500</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="h-full w-[50%] rounded-full bg-purple-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="font-medium text-white">Tournaments</span>
                  </div>
                  <span className="text-sm text-gray-400">$2,500</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="h-full w-[10%] rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="font-medium text-white">Merchandise</span>
                  </div>
                  <span className="text-sm text-gray-400">$1,250</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                  <div className="h-full w-[5%] rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
