"use client"

import { useState } from "react"
import { Filter, Plus, Search, Shield, Trophy, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

interface Team {
  id: string
  name: string
  logo: string
  members: TeamMember[]
  wins: number
  losses: number
  ranking: number
  joinRequests?: number
  description?: string
  tags: string[]
}

const teams: Team[] = [
  {
    id: "T001",
    name: "Phoenix Flames",
    logo: "/placeholder.svg?height=80&width=80",
    members: [
      {
        id: "U001",
        name: "Alex Smith",
        role: "Captain",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U002",
        name: "Sarah Johnson",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U003",
        name: "Mike Williams",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U004",
        name: "Jessica Brown",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U005",
        name: "Tom Harris",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    wins: 24,
    losses: 6,
    ranking: 1,
    joinRequests: 3,
    description: "Top-ranked competitive team specializing in FPS games.",
    tags: ["FPS", "Competitive", "Valorant", "CS:GO"],
  },
  {
    id: "T002",
    name: "Dragon Slayers",
    logo: "/placeholder.svg?height=80&width=80",
    members: [
      {
        id: "U006",
        name: "Emma Lewis",
        role: "Captain",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U007",
        name: "John Davis",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U008",
        name: "Lisa Wilson",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    wins: 18,
    losses: 12,
    ranking: 3,
    joinRequests: 1,
    description: "MOBA specialists with a focus on League of Legends tournaments.",
    tags: ["MOBA", "League of Legends", "Competitive"],
  },
  {
    id: "T003",
    name: "Victory Royale",
    logo: "/placeholder.svg?height=80&width=80",
    members: [
      {
        id: "U009",
        name: "David Clark",
        role: "Captain",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U010",
        name: "Amanda White",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U011",
        name: "Kevin Moore",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U012",
        name: "Rachel Taylor",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    wins: 20,
    losses: 10,
    ranking: 2,
    joinRequests: 2,
    description: "Battle Royale experts specializing in Fortnite and Apex Legends.",
    tags: ["Battle Royale", "Fortnite", "Apex Legends"],
  },
  {
    id: "T004",
    name: "Goal Getters",
    logo: "/placeholder.svg?height=80&width=80",
    members: [
      {
        id: "U013",
        name: "James Anderson",
        role: "Captain",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "U014",
        name: "Robert Martin",
        role: "Member",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
    wins: 15,
    losses: 15,
    ranking: 4,
    joinRequests: 0,
    description: "Sports game enthusiasts focusing on FIFA and NBA 2K tournaments.",
    tags: ["Sports", "FIFA", "NBA 2K"],
  },
]

export function TeamsPage() {
  const [view, setView] = useState<"all" | "my">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [rankingFilter, setRankingFilter] = useState<string>("all")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const filteredTeams = teams.filter((team) => {
    // Apply search filter
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      team.members.some((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()))

    // Apply ranking filter
    const matchesRanking =
      rankingFilter === "all" ||
      (rankingFilter === "top" && team.ranking <= 3) ||
      (rankingFilter === "mid" && team.ranking > 3 && team.ranking <= 10) ||
      (rankingFilter === "new" && team.ranking > 10)

    return matchesSearch && matchesRanking
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-white">Teams</h2>
          <p className="text-gray-400">Manage gaming teams and their members</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-white">Create New Team</DialogTitle>
                <DialogDescription>Fill in the details to create a new gaming team.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input id="teamName" placeholder="Enter team name" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Team Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter team description"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="logo">Team Logo URL</Label>
                  <Input id="logo" placeholder="Enter logo URL" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="FPS, Competitive, etc." className="bg-gray-800 border-gray-700" />
                </div>
                <div className="grid gap-2">
                  <Label>Initial Members</Label>
                  <div className="rounded-md border border-gray-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                          <AvatarFallback className="bg-purple-700">JD</AvatarFallback>
                        </Avatar>
                        <span className="text-white">You (Captain)</span>
                      </div>
                      <Badge className="bg-purple-600">Captain</Badge>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full border-gray-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Member
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700">
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Create Team</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Tabs value={view} onValueChange={(v) => setView(v as "all" | "my")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="all">All Teams</TabsTrigger>
              <TabsTrigger value="my">My Teams</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle className="font-heading text-xl text-white">Teams</CardTitle>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search teams..."
                      className="w-full bg-gray-800 border-gray-700 pl-8 md:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={rankingFilter} onValueChange={setRankingFilter}>
                    <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Ranking" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="all">All Rankings</SelectItem>
                      <SelectItem value="top">Top Ranked</SelectItem>
                      <SelectItem value="mid">Mid Tier</SelectItem>
                      <SelectItem value="new">New Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    className={`cursor-pointer rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all hover:border-gray-700 ${
                      selectedTeam?.id === team.id ? "border-purple-500 ring-1 ring-purple-500" : ""
                    }`}
                    onClick={() => setSelectedTeam(team)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relativeh-16 w-16 overflow-hidden rounded-lg border border-gray-800">
                        <Image
                        fill
                          src={team.logo || "/placeholder.svg"}
                          alt={team.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{team.name}</h3>
                          <Badge className="bg-purple-600">Rank #{team.ranking}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">{team.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {team.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="border-gray-700 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="hidden text-right md:block">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Users className="h-4 w-4" />
                          <span>{team.members.length} members</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span>
                            {team.wins}W - {team.losses}L
                          </span>
                        </div>
                        {team.joinRequests ? (
                          <div className="mt-1 flex items-center gap-2 text-sm text-blue-400">
                            <Shield className="h-4 w-4" />
                            <span>{team.joinRequests} join requests</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredTeams.length === 0 && (
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                    <Users className="mx-auto h-12 w-12 text-gray-600" />
                    <h3 className="mt-4 text-lg font-medium text-white">No teams found</h3>
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
              <CardTitle className="font-heading text-xl text-white">Team Details</CardTitle>
              <CardDescription>View and manage team information</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTeam ? (
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="relativeh-24 w-24 overflow-hidden rounded-lg border border-gray-800">
                      <Image
                      fill
                        src={selectedTeam.logo || "/placeholder.svg"}
                        alt={selectedTeam.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedTeam.name}</h2>
                      <p className="text-gray-400">{selectedTeam.description}</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{selectedTeam.wins}</div>
                        <div className="text-sm text-gray-400">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{selectedTeam.losses}</div>
                        <div className="text-sm text-gray-400">Losses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">#{selectedTeam.ranking}</div>
                        <div className="text-sm text-gray-400">Ranking</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-white">Team Members</h3>
                    <div className="space-y-2">
                      {selectedTeam.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="bg-purple-700">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{member.name}</div>
                              <div className="text-xs text-gray-400">{member.role}</div>
                            </div>
                          </div>
                          {member.role === "Captain" ? (
                            <Badge className="bg-purple-600">Captain</Badge>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-red-400 hover:bg-red-950 hover:text-red-300"
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 border-gray-700">
                      Edit Team
                    </Button>
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Join Team</Button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-600" />
                  <h3 className="mt-4 text-lg font-medium text-white">No team selected</h3>
                  <p className="mt-2 text-gray-400">Select a team to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
