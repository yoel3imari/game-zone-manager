"use client"

import { useState } from "react"
import { Calendar, CreditCard, Gamepad2, Users, Monitor } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<string>("month")
  const [view, setView] = useState<"overview" | "revenue" | "usage" | "games">("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-white">Analytics</h2>
          <p className="text-gray-400">Monitor performance and track key metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800">
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={view} onValueChange={(v) => setView(v as "overview" | "revenue" | "usage" | "games")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$24,580</div>
            <p className="text-xs text-green-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">156</div>
            <p className="text-xs text-blue-500">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">842</div>
            <p className="text-xs text-purple-500">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg. Session Length</CardTitle>
            <Gamepad2 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.4 hrs</div>
            <p className="text-xs text-yellow-500">+0.3 hrs from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={view} className="w-full">
        <TabsContent value="overview" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-white">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full flex-col">
                    <div className="flex justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm text-gray-400">Bookings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-400">Subscriptions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-400">Tournaments</span>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-0 flex items-end justify-between gap-2 pb-6">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                          <div key={i} className="flex w-full flex-col items-center">
                            <div className="relative flex h-full w-full items-end gap-1">
                              <div
                                className="w-full rounded-t bg-purple-500"
                                style={{ height: `${Math.random() * 50 + 30}%` }}
                              ></div>
                              <div
                                className="w-full rounded-t bg-blue-500"
                                style={{ height: `${Math.random() * 40 + 20}%` }}
                              ></div>
                              <div
                                className="w-full rounded-t bg-green-500"
                                style={{ height: `${Math.random() * 30 + 10}%` }}
                              ></div>
                            </div>
                            <span className="mt-2 text-xs text-gray-400">{month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-white">Usage Statistics</CardTitle>
                <CardDescription>Station usage by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full flex-col">
                    <div className="flex justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm text-gray-400">PC Stations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-400">PlayStation Stations</span>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-0">
                        <div className="h-full w-full rounded-md bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-[60%] rounded-md bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 h-[80%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[10%] h-[50%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[20%] h-[40%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[30%] h-[60%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[40%] h-[90%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[50%] h-[70%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[60%] h-[80%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[70%] h-[95%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[80%] h-[75%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-[90%] h-[60%] w-[10%] rounded-md bg-purple-500/30"></div>
                        <div className="absolute bottom-0 left-0 h-[40%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[10%] h-[30%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[20%] h-[20%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[30%] h-[40%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[40%] h-[60%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[50%] h-[50%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[60%] h-[70%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[70%] h-[80%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[80%] h-[60%] w-[10%] rounded-md bg-blue-500/30"></div>
                        <div className="absolute bottom-0 left-[90%] h-[40%] w-[10%] rounded-md bg-blue-500/30"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-400">
                        <span>10 AM</span>
                        <span>12 PM</span>
                        <span>2 PM</span>
                        <span>4 PM</span>
                        <span>6 PM</span>
                        <span>8 PM</span>
                        <span>10 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-white">Popular Games</CardTitle>
                <CardDescription>Most played games this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Valorant", platform: "PC", hours: 420, percentage: 85 },
                    { name: "League of Legends", platform: "PC", hours: 380, percentage: 75 },
                    { name: "FIFA 24", platform: "PS5", hours: 350, percentage: 70 },
                    { name: "Call of Duty", platform: "Both", hours: 320, percentage: 65 },
                    { name: "Fortnite", platform: "Both", hours: 290, percentage: 60 },
                  ].map((game, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Gamepad2 className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-white">{game.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{game.hours} hours</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                          style={{ width: `${game.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-white">Subscription Growth</CardTitle>
                <CardDescription>New subscriptions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full flex-col">
                    <div className="flex justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-400">New Subscriptions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm text-gray-400">Cancellations</span>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-0">
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-[50%] left-0 right-0 h-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-[75%] left-0 right-0 h-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-[100%] left-0 right-0 h-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-0 left-0 h-[60%] w-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-0 left-[20%] h-[40%] w-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-0 left-[40%] h-[70%]  bg-gray-800"></div>
                        <div className="absolute bottom-0 left-[40%] h-[70%] w-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-0 left-[60%] h-[50%] w-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-0 left-[80%] h-[80%] w-[1px] bg-gray-800"></div>
                        <div className="absolute bottom-0 left-[100%] h-[30%] w-[1px] bg-gray-800"></div>

                        <div className="absolute bottom-0 left-[5%] h-[45%] w-[10%] rounded-t-md bg-green-500/70"></div>
                        <div className="absolute bottom-0 left-[25%] h-[60%] w-[10%] rounded-t-md bg-green-500/70"></div>
                        <div className="absolute bottom-0 left-[45%] h-[75%] w-[10%] rounded-t-md bg-green-500/70"></div>
                        <div className="absolute bottom-0 left-[65%] h-[85%] w-[10%] rounded-t-md bg-green-500/70"></div>
                        <div className="absolute bottom-0 left-[85%] h-[65%] w-[10%] rounded-t-md bg-green-500/70"></div>

                        <div className="absolute bottom-0 left-[5%] h-[15%] w-[10%] rounded-t-md bg-red-500/70"></div>
                        <div className="absolute bottom-0 left-[25%] h-[20%] w-[10%] rounded-t-md bg-red-500/70"></div>
                        <div className="absolute bottom-0 left-[45%] h-[10%] w-[10%] rounded-t-md bg-red-500/70"></div>
                        <div className="absolute bottom-0 left-[65%] h-[25%] w-[10%] rounded-t-md bg-red-500/70"></div>
                        <div className="absolute bottom-0 left-[85%] h-[15%] w-[10%] rounded-t-md bg-red-500/70"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-400">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="revenue" className="mt-0">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-white">Revenue Analysis</CardTitle>
              <CardDescription>Detailed revenue breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="h-[400px] w-full">
                  <div className="flex h-full flex-col">
                    <div className="flex justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                        <span className="text-sm text-gray-400">Bookings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-gray-400">Subscriptions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-400">Tournaments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm text-gray-400">Merchandise</span>
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-0 flex items-end justify-between gap-2 pb-6">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                          (month, i) => (
                            <div key={i} className="flex w-full flex-col items-center">
                              <div className="relative flex h-full w-full items-end gap-1">
                                <div
                                  className="w-full rounded-t bg-purple-500"
                                  style={{ height: `${Math.random() * 50 + 30}%` }}
                                ></div>
                                <div
                                  className="w-full rounded-t bg-blue-500"
                                  style={{ height: `${Math.random() * 40 + 20}%` }}
                                ></div>
                                <div
                                  className="w-full rounded-t bg-green-500"
                                  style={{ height: `${Math.random() * 30 + 10}%` }}
                                ></div>
                                <div
                                  className="w-full rounded-t bg-yellow-500"
                                  style={{ height: `${Math.random() * 20 + 5}%` }}
                                ></div>
                              </div>
                              <span className="mt-2 text-xs text-gray-400">{month}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-center">
                    <div className="text-sm text-gray-400">Bookings</div>
                    <div className="text-2xl font-bold text-purple-500">$12,450</div>
                    <div className="text-xs text-green-500">+15% from last month</div>
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-center">
                    <div className="text-sm text-gray-400">Subscriptions</div>
                    <div className="text-2xl font-bold text-blue-500">$7,800</div>
                    <div className="text-xs text-green-500">+8% from last month</div>
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-center">
                    <div className="text-sm text-gray-400">Tournaments</div>
                    <div className="text-2xl font-bold text-green-500">$3,200</div>
                    <div className="text-xs text-green-500">+20% from last month</div>
                  </div>
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-4 text-center">
                    <div className="text-sm text-gray-400">Merchandise</div>
                    <div className="text-2xl font-bold text-yellow-500">$1,130</div>
                    <div className="text-xs text-red-500">-5% from last month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usage" className="mt-0">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-white">Station Usage</CardTitle>
              <CardDescription>Detailed usage statistics by station type and time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="font-medium text-white">PC Stations Usage</h3>
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                      <div className="h-[200px] w-full">
                        <div className="relative h-full w-full">
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 h-[80%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[10%] h-[50%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[20%] h-[40%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[30%] h-[60%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[40%] h-[90%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[50%] h-[70%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[60%] h-[80%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[70%] h-[95%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[80%] h-[75%] w-[10%] rounded-md bg-purple-500/30"></div>
                          <div className="absolute bottom-0 left-[90%] h-[60%] w-[10%] rounded-md bg-purple-500/30"></div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-400">
                        <span>10 AM</span>
                        <span>12 PM</span>
                        <span>2 PM</span>
                        <span>4 PM</span>
                        <span>6 PM</span>
                        <span>8 PM</span>
                        <span>10 PM</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-white">PlayStation Stations Usage</h3>
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                      <div className="h-[200px] w-full">
                        <div className="relative h-full w-full">
                          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 h-[40%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[10%] h-[30%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[20%] h-[20%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[30%] h-[40%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[40%] h-[60%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[50%] h-[50%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[60%] h-[70%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[70%] h-[80%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[80%] h-[60%] w-[10%] rounded-md bg-blue-500/30"></div>
                          <div className="absolute bottom-0 left-[90%] h-[40%] w-[10%] rounded-md bg-blue-500/30"></div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-gray-400">
                        <span>10 AM</span>
                        <span>12 PM</span>
                        <span>2 PM</span>
                        <span>4 PM</span>
                        <span>6 PM</span>
                        <span>8 PM</span>
                        <span>10 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="mb-4 font-medium text-white">Station Utilization by Day</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, i) => (
                      <div key={i} className="space-y-2 text-center">
                        <div className="text-sm text-gray-400">{day}</div>
                        <div className="mx-auto h-32 w-6 rounded-full bg-gray-800">
                          <div
                            className="rounded-full bg-gradient-to-t from-purple-600 to-blue-600"
                            style={{ height: `${i === 5 || i === 6 ? 90 : 50 + i * 5}%`, width: "100%" }}
                          ></div>
                        </div>
                        <div className="text-sm font-medium text-white">
                          {i === 5 || i === 6 ? "90%" : `${50 + i * 5}%`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="games" className="mt-0">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-white">Game Analytics</CardTitle>
              <CardDescription>Most popular games and player preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-medium text-white">Top PC Games</h3>
                    {[
                      { name: "Valorant", hours: 420, percentage: 85 },
                      { name: "League of Legends", hours: 380, percentage: 75 },
                      { name: "CS:GO", hours: 320, percentage: 65 },
                      { name: "Dota 2", hours: 280, percentage: 55 },
                      { name: "Fortnite", hours: 250, percentage: 50 },
                    ].map((game, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-blue-500" />
                            <span className="font-medium text-white">{game.name}</span>
                          </div>
                          <span className="text-sm text-gray-400">{game.hours} hours</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                            style={{ width: `${game.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-white">Top PlayStation Games</h3>
                    {[
                      { name: "FIFA 24", hours: 350, percentage: 70 },
                      { name: "Call of Duty", hours: 320, percentage: 65 },
                      { name: "NBA 2K24", hours: 290, percentage: 60 },
                      { name: "GTA V", hours: 260, percentage: 55 },
                      { name: "Fortnite", hours: 240, percentage: 50 },
                    ].map((game, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Gamepad2 className="h-4 w-4 text-purple-500" />
                            <span className="font-medium text-white">{game.name}</span>
                          </div>
                          <span className="text-sm text-gray-400">{game.hours} hours</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                            style={{ width: `${game.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="mb-4 font-medium text-white">Game Popularity by Age Group</h3>
                  <div className="h-[300px] w-full">
                    <div className="flex h-full flex-col">
                      <div className="flex justify-between pb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm text-gray-400">FPS Games</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm text-gray-400">MOBA Games</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-400">Sports Games</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <span className="text-sm text-gray-400">Battle Royale</span>
                        </div>
                      </div>
                      <div className="relative flex-1">
                        <div className="absolute inset-0 flex items-end justify-between gap-2 pb-6">
                          {["13-17", "18-24", "25-34", "35-44", "45+"].map((age, i) => (
                            <div key={i} className="flex w-full flex-col items-center">
                              <div className="relative flex h-full w-full items-end gap-1">
                                <div
                                  className="w-full rounded-t bg-blue-500"
                                  style={{
                                    height:
                                      i === 0 ? "70%" : i === 1 ? "85%" : i === 2 ? "60%" : i === 3 ? "40%" : "20%",
                                  }}
                                ></div>
                                <div
                                  className="w-full rounded-t bg-purple-500"
                                  style={{
                                    height:
                                      i === 0 ? "60%" : i === 1 ? "75%" : i === 2 ? "50%" : i === 3 ? "30%" : "15%",
                                  }}
                                ></div>
                                <div
                                  className="w-full rounded-t bg-green-500"
                                  style={{
                                    height:
                                      i === 0 ? "40%" : i === 1 ? "50%" : i === 2 ? "65%" : i === 3 ? "55%" : "45%",
                                  }}
                                ></div>
                                <div
                                  className="w-full rounded-t bg-yellow-500"
                                  style={{
                                    height:
                                      i === 0 ? "80%" : i === 1 ? "70%" : i === 2 ? "45%" : i === 3 ? "25%" : "10%",
                                  }}
                                ></div>
                              </div>
                              <span className="mt-2 text-xs text-gray-400">{age}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
