import { Activity, Calendar, CreditCard, Gamepad2, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { LiveZoneMonitor } from "./live-zone-monitor"

export function DashboardOverview() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-white">Dashboard</h2>
          <p className="text-gray-400">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Calendar className="mr-2 h-4 w-4" />
            Create Booking
          </Button>
          <Button variant="outline">
            <Trophy className="mr-2 h-4 w-4" />
            New Competition
          </Button>
          <Button variant="outline">
            <Gamepad2 className="mr-2 h-4 w-4" />
            Add Game
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-gray-400">+5% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenue Today</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$1,240</div>
            <p className="text-xs text-gray-400">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">156</div>
            <p className="text-xs text-gray-400">+3 new today</p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Ongoing Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-gray-400">2 starting today</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur md:col-span-4">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Activity Overview</CardTitle>
            <CardDescription>Gaming zone activity for the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="flex h-full items-center justify-center">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="h-16 w-16 text-gray-700" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] rounded-md bg-gradient-to-t from-purple-500/20 to-transparent" />
                  <div className="absolute bottom-0 left-[10%] right-[70%] h-[40%] rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-0 left-[20%] right-[60%] h-[70%] rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-0 left-[30%] right-[50%] h-[50%] rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-0 left-[40%] right-[40%] h-[80%] rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-0 left-[50%] right-[30%] h-[60%] rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-0 left-[60%] right-[20%] h-[90%] rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-0 left-[70%] right-[10%] h-[75%] rounded-md bg-purple-500/30" />
                  <div className="absolute bottom-0 left-[80%] right-0 h-[65%] rounded-md bg-purple-500/30" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur md:col-span-3">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Live Zone Monitor</CardTitle>
            <CardDescription>Current status of gaming stations</CardDescription>
          </CardHeader>
          <CardContent>
            <LiveZoneMonitor />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Upcoming Tournaments</CardTitle>
            <CardDescription>Next 3 scheduled competitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Fortnite Battle Royale",
                  date: "Today, 7:00 PM",
                  participants: "16/32",
                  prize: "$500",
                },
                {
                  title: "League of Legends 5v5",
                  date: "Tomorrow, 6:00 PM",
                  participants: "8/10",
                  prize: "$750",
                },
                {
                  title: "CS:GO Tournament",
                  date: "Saturday, 2:00 PM",
                  participants: "12/20",
                  prize: "$1,000",
                },
              ].map((tournament, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">{tournament.title}</h3>
                    <p className="text-sm text-gray-400">{tournament.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{tournament.prize}</div>
                    <div className="text-xs text-gray-400">{tournament.participants} Teams</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Top Players</CardTitle>
            <CardDescription>This month's leaderboard</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Alex 'Destroyer' Smith",
                  points: "2,450",
                  rank: "1",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  name: "Sarah 'Viper' Johnson",
                  points: "2,310",
                  rank: "2",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  name: "Mike 'Phantom' Williams",
                  points: "2,180",
                  rank: "3",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
                {
                  name: "Jessica 'Hawk' Brown",
                  points: "2,050",
                  rank: "4",
                  avatar: "/placeholder.svg?height=40&width=40",
                },
              ].map((player, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                    {player.rank}
                  </div>
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      fill
                      src={player.avatar || "/placeholder.svg"}
                      alt={player.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{player.name}</h3>
                    <p className="text-sm text-gray-400">{player.points} points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
