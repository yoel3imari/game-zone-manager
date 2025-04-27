"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Filter, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

interface Booking {
  id: string
  customer: string
  station: string
  date: string
  time: string
  duration: string
  status: "pending" | "confirmed" | "paid" | "cancelled"
  game?: string
}

const bookings: Booking[] = [
  {
    id: "B-1001",
    customer: "Alex Smith",
    station: "PC #3",
    date: "2025-04-27",
    time: "14:00",
    duration: "2 hours",
    status: "confirmed",
    game: "Valorant",
  },
  {
    id: "B-1002",
    customer: "Sarah Johnson",
    station: "PC #4",
    date: "2025-04-27",
    time: "15:30",
    duration: "3 hours",
    status: "paid",
    game: "League of Legends",
  },
  {
    id: "B-1003",
    customer: "Mike Williams",
    station: "PS5 #2",
    date: "2025-04-27",
    time: "18:00",
    duration: "2 hours",
    status: "pending",
    game: "FIFA 24",
  },
  {
    id: "B-1004",
    customer: "Jessica Brown",
    station: "PC #7",
    date: "2025-04-28",
    time: "10:00",
    duration: "4 hours",
    status: "confirmed",
    game: "Fortnite",
  },
  {
    id: "B-1005",
    customer: "Tom Harris",
    station: "PS5 #1",
    date: "2025-04-28",
    time: "13:00",
    duration: "2 hours",
    status: "cancelled",
    game: "Call of Duty",
  },
  {
    id: "B-1006",
    customer: "Emma Lewis",
    station: "PC #2",
    date: "2025-04-28",
    time: "16:00",
    duration: "3 hours",
    status: "paid",
    game: "CS:GO",
  },
  {
    id: "B-1007",
    customer: "John Davis",
    station: "PC #5",
    date: "2025-04-29",
    time: "11:00",
    duration: "2 hours",
    status: "confirmed",
    game: "Dota 2",
  },
  {
    id: "B-1008",
    customer: "Lisa Wilson",
    station: "PS5 #3",
    date: "2025-04-29",
    time: "14:00",
    duration: "2 hours",
    status: "pending",
    game: "NBA 2K24",
  },
]

export function BookingsPage() {
  const [view, setView] = useState<"list" | "calendar">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [stationFilter, setStationFilter] = useState<string>("all")

  const filteredBookings = bookings.filter((booking) => {
    // Apply search filter
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.station.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.game && booking.game.toLowerCase().includes(searchQuery.toLowerCase()))

    // Apply status filter
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    // Apply station filter
    const matchesStation =
      stationFilter === "all" ||
      (stationFilter === "pc" && booking.station.includes("PC")) ||
      (stationFilter === "ps5" && booking.station.includes("PS5"))

    return matchesSearch && matchesStatus && matchesStation
  })

  const getStatusBadge = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Confirmed
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Paid
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
          <h2 className="font-heading text-3xl tracking-tight text-white">Bookings</h2>
          <p className="text-gray-400">Manage all gaming station bookings</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-white">Create New Booking</DialogTitle>
                <DialogDescription>Fill in the details to create a new gaming session booking.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input id="customer" placeholder="Enter customer name" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="station">Station</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select station" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="pc1">PC #1</SelectItem>
                        <SelectItem value="pc2">PC #2</SelectItem>
                        <SelectItem value="pc3">PC #3</SelectItem>
                        <SelectItem value="ps1">PS5 #1</SelectItem>
                        <SelectItem value="ps2">PS5 #2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="game">Game (Optional)</Label>
                    <Input id="game" placeholder="Enter game name" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700">
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Create Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Tabs value={view} onValueChange={(v) => setView(v as "list" | "calendar")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="font-heading text-xl text-white">All Bookings</CardTitle>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search bookings..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={stationFilter} onValueChange={setStationFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Station" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Stations</SelectItem>
                    <SelectItem value="pc">PC Stations</SelectItem>
                    <SelectItem value="ps5">PS5 Stations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={view} className="w-full">
            <TabsContent value="list" className="mt-0">
              <div className="rounded-md border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-950">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Booking ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Customer</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Station</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Date & Time</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Duration</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Game</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking, i) => (
                          <tr
                            key={booking.id}
                            className={`border-b border-gray-800 ${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/60"}`}
                          >
                            <td className="px-4 py-3 text-sm font-medium text-white">{booking.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{booking.customer}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{booking.station}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">
                              {new Date(booking.date).toLocaleDateString()} {booking.time}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-300">{booking.duration}</td>
                            <td className="px-4 py-3 text-sm text-gray-300">{booking.game || "-"}</td>
                            <td className="px-4 py-3 text-sm">{getStatusBadge(booking.status)}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" className="h-8 border-gray-700">
                                  Edit
                                </Button>
                                {booking.status !== "cancelled" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 border-red-800 text-red-500 hover:bg-red-950 hover:text-red-400"
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-4 py-6 text-center text-gray-400">
                            No bookings found matching your filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-white">April 2025</h3>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 border-gray-700">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous month</span>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-gray-700">
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next month</span>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-400">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div
                      key={`empty-start-${i}`}
                      className="h-24 rounded-md border border-gray-800 bg-gray-900/30 p-1 opacity-50"
                    />
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1
                    const isToday = day === 27 // Assuming today is the 27th
                    const hasBookings = bookings.some((b) => {
                      const bookingDay = new Date(b.date).getDate()
                      return bookingDay === day
                    })

                    const dayBookings = bookings.filter((b) => {
                      const bookingDay = new Date(b.date).getDate()
                      return bookingDay === day
                    })

                    return (
                      <div
                        key={`day-${day}`}
                        className={`h-24 overflow-hidden rounded-md border border-gray-800 p-1 ${
                          isToday ? "border-purple-500 bg-purple-900/20" : "bg-gray-900/30"
                        }`}
                      >
                        <div className="flex justify-between">
                          <span className={`text-sm font-medium ${isToday ? "text-purple-400" : "text-gray-300"}`}>
                            {day}
                          </span>
                          {hasBookings && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-medium text-white">
                              {dayBookings.length}
                            </span>
                          )}
                        </div>
                        <div className="mt-1 space-y-1">
                          {dayBookings.slice(0, 2).map((booking, i) => (
                            <div
                              key={`booking-${day}-${i}`}
                              className="truncate rounded bg-gray-800 px-1 py-0.5 text-xs text-gray-300"
                            >
                              {booking.time} - {booking.station}
                            </div>
                          ))}
                          {dayBookings.length > 2 && (
                            <div className="text-center text-xs text-gray-400">+{dayBookings.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={`empty-end-${i}`}
                      className="h-24 rounded-md border border-gray-800 bg-gray-900/30 p-1 opacity-50"
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
