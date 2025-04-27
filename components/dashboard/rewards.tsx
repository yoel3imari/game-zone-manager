"use client"

import { useState } from "react"
import { Filter, Gift, Plus, Search, Star } from "lucide-react"

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
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface RewardItem {
  id: string
  name: string
  description: string
  pointsCost: number
  category: "session" | "merchandise" | "discount" | "special"
  image: string
  stock: number
  popularity: number
  isNew?: boolean
}

interface RedemptionHistory {
  id: string
  rewardName: string
  pointsCost: number
  redeemedDate: string
  status: "pending" | "completed" | "cancelled"
}

const rewardItems: RewardItem[] = [
  {
    id: "R001",
    name: "1 Hour Free Gaming",
    description: "Redeem for a free hour of gaming on any PC or PlayStation station.",
    pointsCost: 500,
    category: "session",
    image: "/placeholder.svg?height=150&width=150",
    stock: 999,
    popularity: 95,
  },
  {
    id: "R002",
    name: "Gaming Zone T-Shirt",
    description: "Exclusive Gaming Zone branded t-shirt. Available in multiple sizes.",
    pointsCost: 1500,
    category: "merchandise",
    image: "/placeholder.svg?height=150&width=150",
    stock: 25,
    popularity: 80,
    isNew: true,
  },
  {
    id: "R003",
    name: "25% Off Next Booking",
    description: "Get 25% off your next gaming session booking.",
    pointsCost: 800,
    category: "discount",
    image: "/placeholder.svg?height=150&width=150",
    stock: 999,
    popularity: 90,
  },
  {
    id: "R004",
    name: "Gaming Mouse",
    description: "High-performance gaming mouse with RGB lighting.",
    pointsCost: 3000,
    category: "merchandise",
    image: "/placeholder.svg?height=150&width=150",
    stock: 10,
    popularity: 85,
  },
  {
    id: "R005",
    name: "Free Tournament Entry",
    description: "Free entry to any standard tournament of your choice.",
    pointsCost: 1200,
    category: "special",
    image: "/placeholder.svg?height=150&width=150",
    stock: 50,
    popularity: 88,
  },
  {
    id: "R006",
    name: "Gaming Headset",
    description: "Premium gaming headset with surround sound.",
    pointsCost: 4000,
    category: "merchandise",
    image: "/placeholder.svg?height=150&width=150",
    stock: 5,
    popularity: 92,
    isNew: true,
  },
  {
    id: "R007",
    name: "3 Hours Free Gaming",
    description: "Redeem for three free hours of gaming on any PC or PlayStation station.",
    pointsCost: 1200,
    category: "session",
    image: "/placeholder.svg?height=150&width=150",
    stock: 999,
    popularity: 93,
  },
  {
    id: "R008",
    name: "50% Off Snack Bar",
    description: "Get 50% off your next purchase at our snack bar.",
    pointsCost: 600,
    category: "discount",
    image: "/placeholder.svg?height=150&width=150",
    stock: 100,
    popularity: 75,
  },
]

const redemptionHistory: RedemptionHistory[] = [
  {
    id: "H001",
    rewardName: "1 Hour Free Gaming",
    pointsCost: 500,
    redeemedDate: "2025-04-20T14:30:00",
    status: "completed",
  },
  {
    id: "H002",
    rewardName: "25% Off Next Booking",
    pointsCost: 800,
    redeemedDate: "2025-04-15T10:45:00",
    status: "completed",
  },
  {
    id: "H003",
    rewardName: "Gaming Zone T-Shirt",
    pointsCost: 1500,
    redeemedDate: "2025-04-10T16:20:00",
    status: "pending",
  },
  {
    id: "H004",
    rewardName: "Free Tournament Entry",
    pointsCost: 1200,
    redeemedDate: "2025-03-28T11:15:00",
    status: "cancelled",
  },
]

export function RewardsPage() {
  const [view, setView] = useState<"catalog" | "history">("catalog")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popularity")

  // User points (in a real app, this would come from the user's profile)
  const userPoints = 2850

  const filteredRewards = rewardItems
    .filter((reward) => {
      // Apply search filter
      const matchesSearch =
        reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply category filter
      const matchesCategory = categoryFilter === "all" || reward.category === categoryFilter

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "popularity") {
        return b.popularity - a.popularity
      } else if (sortBy === "price-low") {
        return a.pointsCost - b.pointsCost
      } else if (sortBy === "price-high") {
        return b.pointsCost - a.pointsCost
      }
      return 0
    })

  const getStatusBadge = (status: RedemptionHistory["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Cancelled
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
          <h2 className="font-heading text-3xl tracking-tight text-white">Rewards</h2>
          <p className="text-gray-400">Earn and redeem points for rewards</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Reward
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-white">Add New Reward</DialogTitle>
                <DialogDescription>Fill in the details to add a new reward to the catalog.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Reward Name</Label>
                  <Input id="name" placeholder="Enter reward name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter reward description"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="pointsCost">Points Cost</Label>
                    <Input id="pointsCost" type="number" placeholder="500" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="session">Gaming Session</SelectItem>
                        <SelectItem value="merchandise">Merchandise</SelectItem>
                        <SelectItem value="discount">Discount</SelectItem>
                        <SelectItem value="special">Special</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Stock</Label>
                    <Input id="stock" type="number" placeholder="100" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" placeholder="Enter image URL" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isNew" className="h-4 w-4 rounded border-gray-700 bg-gray-800" />
                  <Label htmlFor="isNew">Mark as New</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700">
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Add Reward</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Tabs value={view} onValueChange={(v) => setView(v as "catalog" | "history")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="catalog">Rewards Catalog</TabsTrigger>
              <TabsTrigger value="history">Redemption History</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
                <Gift className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <CardTitle className="font-heading text-xl text-white">Your Reward Points</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">{userPoints.toLocaleString()}</span>
                  <span className="text-sm text-gray-400">points available</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Next tier: VIP (5,000 points)</span>
                <span className="text-sm text-white">{userPoints}/5000</span>
              </div>
              <Progress value={(userPoints / 5000) * 100} className="h-2 w-[250px]" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={view} className="w-full">
        <TabsContent value="catalog" className="mt-0">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle className="font-heading text-xl text-white">Rewards Catalog</CardTitle>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search rewards..."
                      className="w-full bg-gray-800 border-gray-700 pl-8 md:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="session">Gaming Sessions</SelectItem>
                        <SelectItem value="merchandise">Merchandise</SelectItem>
                        <SelectItem value="discount">Discounts</SelectItem>
                        <SelectItem value="special">Special</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="popularity">Popularity</SelectItem>
                        <SelectItem value="price-low">Points: Low to High</SelectItem>
                        <SelectItem value="price-high">Points: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="group overflow-hidden rounded-lg border border-gray-800 bg-gray-950 transition-all hover:border-gray-700"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                      fill
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-60" />
                      {reward.isNew && <Badge className="absolute right-2 top-2 bg-green-600">New</Badge>}
                    </div>
                    <div className="p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium text-white">{reward.name}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="mr-1 h-4 w-4 fill-yellow-500" />
                          <span className="text-sm">{reward.popularity / 10}</span>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-gray-400 line-clamp-2">{reward.description}</p>
                      <div className="mb-3 flex items-center justify-between">
                        <Badge variant="outline" className="border-gray-700 text-gray-400">
                          {reward.category === "session"
                            ? "Gaming Session"
                            : reward.category === "merchandise"
                              ? "Merchandise"
                              : reward.category === "discount"
                                ? "Discount"
                                : "Special"}
                        </Badge>
                        <span className="text-sm text-gray-400">Stock: {reward.stock}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-purple-500">
                          {reward.pointsCost.toLocaleString()} pts
                        </div>
                        <Button
                          size="sm"
                          className={
                            userPoints >= reward.pointsCost
                              ? "bg-purple-600 hover:bg-purple-700"
                              : "bg-gray-700 text-gray-300 cursor-not-allowed"
                          }
                          disabled={userPoints < reward.pointsCost}
                        >
                          Redeem
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-0">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-white">Redemption History</CardTitle>
              <CardDescription>Your past reward redemptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-950">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Reward</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Points</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {redemptionHistory.map((history, i) => (
                        <tr
                          key={history.id}
                          className={`border-b border-gray-800 ${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/60"}`}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-white">{history.rewardName}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{history.pointsCost.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {new Date(history.redeemedDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm">{getStatusBadge(history.status)}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="outline" size="sm" className="h-8 border-gray-700">
                              Details
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
