"use client"

import { useState } from "react"
import { Calendar, Filter, Plus, Search, Trophy, Users } from "lucide-react"

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

interface Participant {
  id: string
  name: string
  avatar: string
  type: "team" | "player"
  members?: number
}

interface Competition {
  id: string
  title: string
  game: string
  type: "solo" | "team"
  startDate: string
  endDate: string
  status: "upcoming" | "ongoing" | "completed"
  participants: Participant[]
  maxParticipants: number
  prizePool: string
  entryFee: string
  description: string
  image: string
}

const competitions: Competition[] = [
  {
    id: "C001",
    title: "Valorant Championship",
    game: "Valorant",
    type: "team",
    startDate: "2025-04-30T18:00:00",
    endDate: "2025-04-30T22:00:00",
    status: "upcoming",
    participants: [
      {
        id: "T001",
        name: "Phoenix Flames",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "team",
        members: 5,
      },
      {
        id: "T002",
        name: "Dragon Slayers",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "team",
        members: 5,
      },
      {
        id: "T003",
        name: "Victory Royale",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "team",
        members: 5,
      },
    ],
    maxParticipants: 8,
    prizePool: "$500",
    entryFee: "$20",
    description: "5v5 team-based Valorant tournament. Double elimination bracket.",
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "C002",
    title: "Fortnite Solo Cup",
    game: "Fortnite",
    type: "solo",
    startDate: "2025-05-02T16:00:00",
    endDate: "2025-05-02T20:00:00",
    status: "upcoming",
    participants: [
      {
        id: "P001",
        name: "Alex Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
      {
        id: "P002",
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
      {
        id: "P003",
        name: "Mike Williams",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
      {
        id: "P004",
        name: "Jessica Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
    ],
    maxParticipants: 16,
    prizePool: "$300",
    entryFee: "$10",
    description: "Solo Fortnite battle royale tournament. Points based on eliminations and placement.",
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "C003",
    title: "League of Legends Tournament",
    game: "League of Legends",
    type: "team",
    startDate: "2025-04-27T14:00:00",
    endDate: "2025-04-27T20:00:00",
    status: "ongoing",
    participants: [
      {
        id: "T001",
        name: "Phoenix Flames",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "team",
        members: 5,
      },
      {
        id: "T002",
        name: "Dragon Slayers",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "team",
        members: 5,
      },
    ],
    maxParticipants: 4,
    prizePool: "$750",
    entryFee: "$25",
    description: "5v5 team-based League of Legends tournament. Single elimination bracket.",
    image: "/placeholder.svg?height=150&width=250",
  },
  {
    id: "C004",
    title: "FIFA 24 Championship",
    game: "FIFA 24",
    type: "solo",
    startDate: "2025-04-25T17:00:00",
    endDate: "2025-04-25T21:00:00",
    status: "completed",
    participants: [
      {
        id: "P005",
        name: "Tom Harris",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
      {
        id: "P006",
        name: "Emma Lewis",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
      {
        id: "P007",
        name: "John Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
      {
        id: "P008",
        name: "Lisa Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        type: "player",
      },
    ],
    maxParticipants: 8,
    prizePool: "$200",
    entryFee: "$15",
    description: "1v1 FIFA 24 tournament. Double elimination bracket.",
    image: "/placeholder.svg?height=150&width=250",
  },
]

export function CompetitionsPage() {
  const [view, setView] = useState<"all" | "my">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null)

  const filteredCompetitions = competitions.filter((competition) => {
    // Apply search filter
    const matchesSearch =
      competition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      competition.game.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || competition.status === statusFilter

    // Apply type filter
    const matchesType = typeFilter === "all" || competition.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: Competition["status"]) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Upcoming
          </Badge>
        )
      case "ongoing":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Ongoing
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-400">
            Completed
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
          <h2 className="font-heading text-3xl tracking-tight text-white">Competitions</h2>
          <p className="text-gray-400">Manage tournaments and competitive events</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Competition
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-white">Create New Competition</DialogTitle>
                <DialogDescription>Fill in the details to create a new tournament or event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Competition Title</Label>
                  <Input id="title" placeholder="Enter competition title" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="game">Game</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select game" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="valorant">Valorant</SelectItem>
                        <SelectItem value="fortnite">Fortnite</SelectItem>
                        <SelectItem value="lol">League of Legends</SelectItem>
                        <SelectItem value="csgo">CS:GO</SelectItem>
                        <SelectItem value="fifa">FIFA 24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="solo">Solo</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <Input id="startDate" type="datetime-local" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date & Time</Label>
                    <Input id="endDate" type="datetime-local" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="prizePool">Prize Pool</Label>
                    <Input id="prizePool" placeholder="$500" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="entryFee">Entry Fee</Label>
                    <Input id="entryFee" placeholder="$20" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="maxParticipants">Max Participants</Label>
                    <Input id="maxParticipants" type="number" placeholder="8" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" placeholder="Enter image URL" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="Enter competition description"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700">
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Create Competition</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Tabs value={view} onValueChange={(v) => setView(v as "all" | "my")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="all">All Competitions</TabsTrigger>
              <TabsTrigger value="my">My Competitions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle className="font-heading text-xl text-white">Competitions</CardTitle>
                <div className="flex flex-col gap-4 md:flex-row">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search competitions..."
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
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="solo">Solo</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCompetitions.map((competition) => (
                  <div
                    key={competition.id}
                    className={`cursor-pointer rounded-lg border border-gray-800 bg-gray-950 p-4 transition-all hover:border-gray-700 ${
                      selectedCompetition?.id === competition.id ? "border-purple-500 ring-1 ring-purple-500" : ""
                    }`}
                    onClick={() => setSelectedCompetition(competition)}
                  >
                    <div className="flex gap-4">
                      <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-gray-800">
                        <Image
                          src={competition.image || "/placeholder.svg"}
                          alt={competition.title}
                          fill
                          className="absolute h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-white">{competition.title}</h3>
                          {getStatusBadge(competition.status)}
                        </div>
                        <p className="mt-1 text-sm text-gray-400">
                          {competition.game} • {competition.type === "solo" ? "Solo" : "Team"}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(competition.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span>{competition.prizePool}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Users className="h-4 w-4" />
                            <span>
                              {competition.participants.length}/{competition.maxParticipants}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredCompetitions.length === 0 && (
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                    <Trophy className="mx-auto h-12 w-12 text-gray-600" />
                    <h3 className="mt-4 text-lg font-medium text-white">No competitions found</h3>
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
              <CardTitle className="font-heading text-xl text-white">Competition Details</CardTitle>
              <CardDescription>View and manage competition information</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCompetition ? (
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-lg border border-gray-800">
                    <Image
                      fill
                      src={selectedCompetition.image || "/placeholder.svg"}
                      alt={selectedCompetition.title}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCompetition.title}</h2>
                    <p className="mt-1 text-gray-400">{selectedCompetition.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
                      <div className="text-sm text-gray-400">Prize Pool</div>
                      <div className="text-xl font-bold text-yellow-500">{selectedCompetition.prizePool}</div>
                    </div>
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
                      <div className="text-sm text-gray-400">Entry Fee</div>
                      <div className="text-xl font-bold text-white">{selectedCompetition.entryFee}</div>
                    </div>
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
                      <div className="text-sm text-gray-400">Start Date</div>
                      <div className="text-md font-medium text-white">
                        {new Date(selectedCompetition.startDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(selectedCompetition.startDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-800 bg-gray-950 p-3 text-center">
                      <div className="text-sm text-gray-400">End Date</div>
                      <div className="text-md font-medium text-white">
                        {new Date(selectedCompetition.endDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(selectedCompetition.endDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 font-medium text-white">
                      Participants ({selectedCompetition.participants.length}/{selectedCompetition.maxParticipants})
                    </h3>
                    <div className="space-y-2">
                      {selectedCompetition.participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                              <AvatarFallback className="bg-purple-700">
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{participant.name}</div>
                              <div className="flex items-center text-xs text-gray-400">
                                {participant.type === "team" ? (
                                  <>
                                    <Users className="mr-1 h-3 w-3" />
                                    <span>{participant.members} members</span>
                                  </>
                                ) : (
                                  <span>Solo Player</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {selectedCompetition.status === "upcoming" && (
                      <>
                        <Button variant="outline" className="flex-1 border-gray-700">
                          Edit
                        </Button>
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700">Register</Button>
                      </>
                    )}
                    {selectedCompetition.status === "ongoing" && (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">View Brackets</Button>
                    )}
                    {selectedCompetition.status === "completed" && (
                      <Button className="w-full bg-green-600 hover:bg-green-700">View Results</Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-8 text-center">
                  <Trophy className="mx-auto h-12 w-12 text-gray-600" />
                  <h3 className="mt-4 text-lg font-medium text-white">No competition selected</h3>
                  <p className="mt-2 text-gray-400">Select a competition to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
