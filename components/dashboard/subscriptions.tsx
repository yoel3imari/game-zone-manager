"use client"

import { useState } from "react"
import { Filter, Plus, Search, Shield } from "lucide-react"

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
import { Switch } from "@/components/ui/switch"

interface SubscriptionPlan {
  id: string
  name: string
  price: string
  billingCycle: "monthly" | "yearly"
  features: string[]
  color: string
  popular?: boolean
}

interface Subscriber {
  id: string
  name: string
  email: string
  avatar: string
  plan: string
  status: "active" | "expired" | "trial"
  startDate: string
  endDate: string
  autoRenew: boolean
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$19.99",
    billingCycle: "monthly",
    features: [
      "10% discount on all bookings",
      "2 free hours per month",
      "Standard support",
      "Access to regular tournaments",
    ],
    color: "blue",
  },
  {
    id: "premium",
    name: "Premium",
    price: "$49.99",
    billingCycle: "monthly",
    features: [
      "25% discount on all bookings",
      "8 free hours per month",
      "Priority support",
      "Free entry to regular tournaments",
      "Exclusive member events",
      "Bring a friend for free (once per month)",
    ],
    color: "purple",
    popular: true,
  },
  {
    id: "vip",
    name: "VIP",
    price: "$99.99",
    billingCycle: "monthly",
    features: [
      "40% discount on all bookings",
      "20 free hours per month",
      "24/7 premium support",
      "Free entry to all tournaments",
      "Exclusive VIP events",
      "Bring a friend for free (unlimited)",
      "Reserved gaming station",
      "Free snacks and drinks",
    ],
    color: "yellow",
  },
]

const subscribers: Subscriber[] = [
  {
    id: "S001",
    name: "Alex Smith",
    email: "alex.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Premium",
    status: "active",
    startDate: "2025-01-15",
    endDate: "2025-05-15",
    autoRenew: true,
  },
  {
    id: "S002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Basic",
    status: "active",
    startDate: "2025-02-10",
    endDate: "2025-05-10",
    autoRenew: true,
  },
  {
    id: "S003",
    name: "Mike Williams",
    email: "mike.williams@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "VIP",
    status: "active",
    startDate: "2025-03-01",
    endDate: "2025-06-01",
    autoRenew: true,
  },
  {
    id: "S004",
    name: "Jessica Brown",
    email: "jessica.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Premium",
    status: "expired",
    startDate: "2025-01-05",
    endDate: "2025-04-05",
    autoRenew: false,
  },
  {
    id: "S005",
    name: "Tom Harris",
    email: "tom.harris@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "Basic",
    status: "trial",
    startDate: "2025-04-20",
    endDate: "2025-04-27",
    autoRenew: false,
  },
  {
    id: "S006",
    name: "Emma Lewis",
    email: "emma.lewis@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    plan: "VIP",
    status: "active",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    autoRenew: true,
  },
]

export function SubscriptionsPage() {
  const [view, setView] = useState<"plans" | "subscribers">("subscribers")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [planFilter, setPlanFilter] = useState<string>("all")
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null)

  const filteredSubscribers = subscribers.filter((subscriber) => {
    // Apply search filter
    const matchesSearch =
      subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscriber.id.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || subscriber.status === statusFilter

    // Apply plan filter
    const matchesPlan = planFilter === "all" || subscriber.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  const getStatusBadge = (status: Subscriber["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Active
          </Badge>
        )
      case "expired":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Expired
          </Badge>
        )
      case "trial":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Trial
          </Badge>
        )
      default:
        return null
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Basic":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Basic
          </Badge>
        )
      case "Premium":
        return (
          <Badge variant="outline" className="border-purple-500 text-purple-500">
            Premium
          </Badge>
        )
      case "VIP":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            VIP
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
          <h2 className="font-heading text-3xl tracking-tight text-white">Subscriptions</h2>
          <p className="text-gray-400">Manage subscription plans and members</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Subscription
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-white">Create New Subscription</DialogTitle>
                <DialogDescription>Add a new subscription for a customer.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="new">Add New Customer</SelectItem>
                      <SelectItem value="alex">Alex Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                      <SelectItem value="mike">Mike Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plan">Subscription Plan</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="basic">Basic ($19.99/month)</SelectItem>
                      <SelectItem value="premium">Premium ($49.99/month)</SelectItem>
                      <SelectItem value="vip">VIP ($99.99/month)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="1">1 Month</SelectItem>
                        <SelectItem value="3">3 Months</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="autoRenew" defaultChecked />
                  <Label htmlFor="autoRenew">Auto-renew subscription</Label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input id="notes" placeholder="Add notes" className="bg-gray-800 border-gray-700" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700">
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Create Subscription</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Tabs value={view} onValueChange={(v) => setView(v as "plans" | "subscribers")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={view} className="w-full">
        <TabsContent value="subscribers" className="mt-0">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="font-heading text-xl text-white">Subscribers</CardTitle>
                    <div className="flex flex-col gap-4 md:flex-row">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Search subscribers..."
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
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                            <SelectItem value="trial">Trial</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={planFilter} onValueChange={setPlanFilter}>
                          <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Plan" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="all">All Plans</SelectItem>
                            <SelectItem value="Basic">Basic</SelectItem>
                            <SelectItem value="Premium">Premium</SelectItem>
                            <SelectItem value="VIP">VIP</SelectItem>
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
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Subscriber</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Plan</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Start Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">End Date</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Auto-Renew</th>
                            <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredSubscribers.map((subscriber, i) => (
                            <tr
                              key={subscriber.id}
                              className={`cursor-pointer border-b border-gray-800 ${
                                i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/60"
                              } ${selectedSubscriber?.id === subscriber.id ? "bg-gray-800" : ""}`}
                              onClick={() => setSelectedSubscriber(subscriber)}
                            >
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={subscriber.avatar || "/placeholder.svg"} alt={subscriber.name} />
                                    <AvatarFallback className="bg-purple-700">
                                      {subscriber.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium text-white">{subscriber.name}</div>
                                    <div className="text-xs text-gray-400">{subscriber.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">{getPlanBadge(subscriber.plan)}</td>
                              <td className="px-4 py-3 text-sm">{getStatusBadge(subscriber.status)}</td>
                              <td className="px-4 py-3 text-sm text-gray-300">
                                {new Date(subscriber.startDate).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-300">
                                {new Date(subscriber.endDate).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-300">
                                {subscriber.autoRenew ? (
                                  <Badge variant="outline" className="border-green-500 text-green-500">
                                    Yes
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="border-red-500 text-red-500">
                                    No
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <Button variant="outline" size="sm" className="h-8 border-gray-700">
                                  Edit
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-heading text-xl text-white">Subscriber Details</CardTitle>
                  <CardDescription>View and manage subscriber information</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSubscriber ? (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <Avatar className="h-20 w-20">
                          <AvatarImage
                            src={selectedSubscriber.avatar || "/placeholder.svg"}
                            alt={selectedSubscriber.name}
                          />
                          <AvatarFallback className="bg-purple-700 text-lg">
                            {selectedSubscriber.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{selectedSubscriber.name}</h2>
                          <p className="text-gray-400">{selectedSubscriber.email}</p>
                        </div>
                        <div className="flex gap-2">
                          {getPlanBadge(selectedSubscriber.plan)}
                          {getStatusBadge(selectedSubscriber.status)}
                        </div>
                      </div>
                      <div className="space-y-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-400">Start Date</div>
                            <div className="font-medium text-white">
                              {new Date(selectedSubscriber.startDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">End Date</div>
                            <div className="font-medium text-white">
                              {new Date(selectedSubscriber.endDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Auto-Renew</div>
                            <div className="font-medium text-white">{selectedSubscriber.autoRenew ? "Yes" : "No"}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Subscription ID</div>
                            <div className="font-medium text-white">{selectedSubscriber.id}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-white">Subscription Benefits</h3>
                        <div className="space-y-2 rounded-lg border border-gray-800 bg-gray-950 p-4">
                          <ul className="space-y-2">
                            {subscriptionPlans
                              .find((plan) => plan.name === selectedSubscriber.plan)
                              ?.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                  <Shield className="h-4 w-4 text-purple-500" />
                                  {feature}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 border-gray-700">
                          Edit Subscription
                        </Button>
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Renew</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                      <Shield className="mx-auto h-12 w-12 text-gray-600" />
                      <h3 className="mt-4 text-lg font-medium text-white">No subscriber selected</h3>
                      <p className="mt-2 text-gray-400">Select a subscriber to view details</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="plans" className="mt-0">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-white">Subscription Plans</CardTitle>
              <CardDescription>Manage available subscription plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative overflow-hidden rounded-lg border ${
                      plan.popular ? "border-purple-500 ring-1 ring-purple-500" : "border-gray-800"
                    } bg-gray-950 transition-all hover:border-gray-700`}
                  >
                    {plan.popular && (
                      <div className="absolute right-0 top-0 bg-purple-600 px-3 py-1 text-xs font-medium text-white">
                        Popular
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <div className="mt-2 flex items-baseline">
                        <span className="text-3xl font-bold text-white">{plan.price}</span>
                        <span className="ml-1 text-sm text-gray-400">/{plan.billingCycle}</span>
                      </div>
                      <div className="mt-6 space-y-4">
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6 flex gap-2">
                        <Button variant="outline" className="flex-1 border-gray-700">
                          Edit
                        </Button>
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Subscribe</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
