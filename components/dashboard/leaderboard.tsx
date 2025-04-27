"use client"

import { useState } from "react"
import { Award, Filter, Search, Trophy, Users } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Player {
  id: string
  name: string
  avatar: string
  points: number
  rank: number
  wins: number
  losses: number
  gamesPlayed: number
  favoriteGame: string
  team?: string
}

interface Team {
  id: string
  name: string
  logo: string
  points: number
  rank: number
  wins: number
  losses: number
  members: number
  tournaments: number
}

const players: Player[] = [
  {
    id: "P001",
    name: "Alex 'Destroyer' Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2450,
    rank: 1,
    wins: 48,
    losses: 12,
    gamesPlayed: 60,
    favoriteGame: "Valorant",
    team: "Phoenix Flames",
  },
  {
    id: "P002",
    name: "Sarah 'Viper' Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2310,
    rank: 2,
    wins: 45,
    losses: 15,
    gamesPlayed: 60,
    favoriteGame: "League of Legends",
    team: "Dragon Slayers",
  },
  {
    id: "P003",
    name: "Mike 'Phantom' Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2180,
    rank: 3,
    wins: 42,
    losses: 18,
    gamesPlayed: 60,
    favoriteGame: "CS:GO",
    team: "Phoenix Flames",
  },
  {
    id: "P004",
    name: "Jessica 'Hawk' Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 2050,
    rank: 4,
    wins: 40,
    losses: 20,
    gamesPlayed: 60,
    favoriteGame: "Fortnite",
    team: "Victory Royale",
  },
  {
    id: "P005",
    name: "Tom 'Sniper' Harris",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1980,
    rank: 5,
    wins: 38,
    losses: 22,
    gamesPlayed: 60,
    favoriteGame: "Call of Duty",
  },
  {
    id: "P006",
    name: "Emma 'Shadow' Lewis",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1920,
    rank: 6,
    wins: 36,
    losses: 24,
    gamesPlayed: 60,
    favoriteGame: "Apex Legends",
    team: "Victory Royale",
  },
  {
    id: "P007",
    name: "John 'Titan' Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1850,
    rank: 7,
    wins: 35,
    losses: 25,
    gamesPlayed: 60,
    favoriteGame: "Dota 2",
    team: "Dragon Slayers",
  },
  {
    id: "P008",
    name: "Lisa 'Frost' Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    points: 1790,
    rank: 8,
    wins: 33,
    losses: 27,
    gamesPlayed: 60,
    favoriteGame: "Overwatch 2",
  },
]

const teams: Team[] = [
  {
    id: "T001",
    name: "Phoenix Flames",
    logo: "/placeholder.svg?height=40&width=40",
    points: 4200,
    rank: 1,
    wins: 28,
    losses: 7,
    members: 5,
    tournaments: 12,
  },
  {
    id: "T002",
    name: "Dragon Slayers",
    logo: "/placeholder.svg?height=40&width=40",
    points: 3850,
    rank: 2,
    wins: 25,
    losses: 10,
    members: 5,
    tournaments: 10,
  },
  {
    id: "T003",
    name: "Victory Royale",
    logo: "/placeholder.svg?height=40&width=40",
    points: 3600,
    rank: 3,
    wins: 22,
    losses: 13,
    members: 4,
    tournaments: 9,
  },
  {
    id: "T004",
    name: "Goal Getters",
    logo: "/placeholder.svg?height=40&width=40",
    points: 3200,
    rank: 4,
    wins: 20,
    losses: 15,
    members: 4,
    tournaments: 8,
  },
  {
    id: "T005",
    name: "Cyber Knights",
    logo: "/placeholder.svg?height=40&width=40",
    points: 2950,
    rank: 5,
    wins: 18,
    losses: 17,
    members: 5,
    tournaments: 7,
  },
]

export function LeaderboardPage() {
  const [view, setView] = useState<"players" | "teams">("players")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeFilter, setTimeFilter] = useState<string>("all-time")
  const [gameFilter, setGameFilter] = useState<string>("all")

  const filteredPlayers = players.filter((player) => {
    // Apply search filter
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (player.team && player.team.toLowerCase().includes(searchQuery.toLowerCase()))

    // Apply game filter (in a real app, you'd have more game data)
    const matchesGame = gameFilter === "all" || player.favoriteGame.toLowerCase().includes(gameFilter.toLowerCase())

    return matchesSearch && matchesGame
  })

  const filteredTeams = teams.filter((team) => {
    // Apply search filter
    return team.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-white">Leaderboard</h2>
          <p className="text-gray-400">Top players and teams rankings</p>
        </div>
        <div className="flex gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "players" | "teams")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="font-heading text-xl text-white">
              {view === "players" ? "Top Players" : "Top Teams"}
            </CardTitle>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder={`Search ${view}...`}
                  className="w-full bg-gray-800 border-gray-700 pl-8 md:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="monthly">This Month</SelectItem>
                    <SelectItem value="weekly">This Week</SelectItem>
                  </SelectContent>
                </Select>
                {view === "players" && (
                  <Select value={gameFilter} onValueChange={setGameFilter}>
                    <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Game" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="all">All Games</SelectItem>
                      <SelectItem value="valorant">Valorant</SelectItem>
                      <SelectItem value="league">League of Legends</SelectItem>
                      <SelectItem value="csgo">CS:GO</SelectItem>
                      <SelectItem value="fortnite">Fortnite</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={view} className="w-full">
            <TabsContent value="players" className="mt-0">
              <div className="rounded-md border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-950">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Player</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Team</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Points</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">W/L</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Favorite Game</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlayers.map((player, i) => (
                        <tr
                          key={player.id}
                          className={`border-b border-gray-800 ${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/60"}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 font-bold text-white">
                              {player.rank}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                                <AvatarFallback className="bg-purple-700">
                                  {player.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium text-white">{player.name}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {player.team ? (
                              <Badge variant="outline" className="border-purple-500 text-purple-400">
                                {player.team}
                              </Badge>
                            ) : (
                              <span className="text-gray-500">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-white">{player.points.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {player.wins}W - {player.losses}L
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">{player.favoriteGame}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="outline" size="sm" className="h-8 border-gray-700">
                              View Profile
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="teams" className="mt-0">
              <div className="rounded-md border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-950">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Rank</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Team</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Points</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">W/L</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Members</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Tournaments</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTeams.map((team, i) => (
                        <tr
                          key={team.id}
                          className={`border-b border-gray-800 ${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/60"}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 font-bold text-white">
                              {team.rank}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-700">
                                <Image
                                fill
                                  src={team.logo || "/placeholder.svg"}
                                  alt={team.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="font-medium text-white">{team.name}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-white">{team.points.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">
                            {team.wins}W - {team.losses}L
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">{team.members}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{team.tournaments}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="outline" size="sm" className="h-8 border-gray-700">
                              View Team
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Top Performers</CardTitle>
            <CardDescription>Players with the highest win rates this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {players.slice(0, 5).map((player, i) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 font-bold text-white">
                      {i + 1}
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback className="bg-purple-700">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-white">{player.name}</div>
                      <div className="text-sm text-gray-400">{player.favoriteGame}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">{player.points.toLocaleString()} pts</div>
                    <div className="text-sm text-gray-400">
                      {player.wins}W - {player.losses}L
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="font-heading text-xl text-white">Recent Achievements</CardTitle>
            <CardDescription>Latest player milestones and awards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  player: "Alex 'Destroyer' Smith",
                  avatar: "/placeholder.svg?height=40&width=40",
                  achievement: "Tournament MVP",
                  game: "Valorant Championship",
                  date: "2 days ago",
                  icon: <Trophy className="h-5 w-5 text-yellow-500" />,
                },
                {
                  player: "Sarah 'Viper' Johnson",
                  avatar: "/placeholder.svg?height=40&width=40",
                  achievement: "10 Win Streak",
                  game: "League of Legends",
                  date: "3 days ago",
                  icon: <Award className="h-5 w-5 text-blue-500" />,
                },
                {
                  player: "Phoenix Flames",
                  avatar: "/placeholder.svg?height=40&width=40",
                  achievement: "Tournament Champions",
                  game: "CS:GO Tournament",
                  date: "1 week ago",
                  icon: <Trophy className="h-5 w-5 text-yellow-500" />,
                },
                {
                  player: "Mike 'Phantom' Williams",
                  avatar: "/placeholder.svg?height=40&width=40",
                  achievement: "Most Valuable Player",
                  game: "Fortnite Solo Cup",
                  date: "1 week ago",
                  icon: <Award className="h-5 w-5 text-blue-500" />,
                },
                {
                  player: "Dragon Slayers",
                  avatar: "/placeholder.svg?height=40&width=40",
                  achievement: "Team of the Month",
                  game: "All Games",
                  date: "2 weeks ago",
                  icon: <Users className="h-5 w-5 text-purple-500" />,
                },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                      {achievement.icon}
                    </div>
                    <div>
                      <div className="font-medium text-white">{achievement.player}</div>
                      <div className="text-sm text-gray-400">
                        {achievement.achievement} • {achievement.game}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{achievement.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
