"use client"

import { useState } from "react"
import { Filter, Gamepad2, Monitor, Plus, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import Image from "next/image"

interface Game {
  id: string
  title: string
  platform: "PC" | "PS5" | "Both"
  genre: string
  releaseYear: number
  publisher: string
  tags: string[]
  image: string
  popularity: number
  isNew?: boolean
}

const games: Game[] = [
  {
    id: "G001",
    title: "Valorant",
    platform: "PC",
    genre: "FPS",
    releaseYear: 2020,
    publisher: "Riot Games",
    tags: ["Competitive", "Tactical", "Popular"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 95,
    isNew: false,
  },
  {
    id: "G002",
    title: "League of Legends",
    platform: "PC",
    genre: "MOBA",
    releaseYear: 2009,
    publisher: "Riot Games",
    tags: ["Competitive", "Team-based", "Popular"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 90,
    isNew: false,
  },
  {
    id: "G003",
    title: "FIFA 24",
    platform: "Both",
    genre: "Sports",
    releaseYear: 2023,
    publisher: "EA Sports",
    tags: ["Sports", "Multiplayer", "Popular"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 88,
    isNew: true,
  },
  {
    id: "G004",
    title: "Call of Duty: Modern Warfare III",
    platform: "Both",
    genre: "FPS",
    releaseYear: 2023,
    publisher: "Activision",
    tags: ["Action", "Multiplayer", "Popular"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 92,
    isNew: true,
  },
  {
    id: "G005",
    title: "Fortnite",
    platform: "Both",
    genre: "Battle Royale",
    releaseYear: 2017,
    publisher: "Epic Games",
    tags: ["Battle Royale", "Multiplayer", "Popular"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 85,
    isNew: false,
  },
  {
    id: "G006",
    title: "Counter-Strike 2",
    platform: "PC",
    genre: "FPS",
    releaseYear: 2023,
    publisher: "Valve",
    tags: ["Competitive", "Tactical", "Popular"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 94,
    isNew: true,
  },
  {
    id: "G007",
    title: "Dota 2",
    platform: "PC",
    genre: "MOBA",
    releaseYear: 2013,
    publisher: "Valve",
    tags: ["Competitive", "Team-based", "Strategy"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 82,
    isNew: false,
  },
  {
    id: "G008",
    title: "NBA 2K24",
    platform: "Both",
    genre: "Sports",
    releaseYear: 2023,
    publisher: "2K Sports",
    tags: ["Sports", "Simulation", "Multiplayer"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 80,
    isNew: true,
  },
  {
    id: "G009",
    title: "Minecraft",
    platform: "Both",
    genre: "Sandbox",
    releaseYear: 2011,
    publisher: "Mojang",
    tags: ["Sandbox", "Creative", "Multiplayer"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 78,
    isNew: false,
  },
  {
    id: "G010",
    title: "Apex Legends",
    platform: "Both",
    genre: "Battle Royale",
    releaseYear: 2019,
    publisher: "Electronic Arts",
    tags: ["Battle Royale", "FPS", "Team-based"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 86,
    isNew: false,
  },
  {
    id: "G011",
    title: "Overwatch 2",
    platform: "Both",
    genre: "FPS",
    releaseYear: 2022,
    publisher: "Blizzard Entertainment",
    tags: ["Team-based", "Hero Shooter", "Competitive"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 83,
    isNew: false,
  },
  {
    id: "G012",
    title: "Rocket League",
    platform: "Both",
    genre: "Sports",
    releaseYear: 2015,
    publisher: "Psyonix",
    tags: ["Sports", "Competitive", "Vehicles"],
    image: "/placeholder.svg?height=150&width=250",
    popularity: 79,
    isNew: false,
  },
]

export function GamesLibrary() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [platformFilter, setPlatformFilter] = useState<string>("all")
  const [genreFilter, setGenreFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("popularity")

  const filteredGames = games
    .filter((game) => {
      // Apply search filter
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase())

      // Apply platform filter
      const matchesPlatform =
        platformFilter === "all" ||
        (platformFilter === "pc" && (game.platform === "PC" || game.platform === "Both")) ||
        (platformFilter === "ps5" && (game.platform === "PS5" || game.platform === "Both"))

      // Apply genre filter
      const matchesGenre = genreFilter === "all" || game.genre.toLowerCase() === genreFilter.toLowerCase()

      return matchesSearch && matchesPlatform && matchesGenre
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortBy === "popularity") {
        return b.popularity - a.popularity
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      } else if (sortBy === "newest") {
        return b.releaseYear - a.releaseYear
      }
      return 0
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-heading text-3xl tracking-tight text-white">Games Library</h2>
          <p className="text-gray-400">Manage all available games for your gaming zone</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Game
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl text-white">Add New Game</DialogTitle>
                <DialogDescription>Fill in the details to add a new game to your library.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Game Title</Label>
                  <Input id="title" placeholder="Enter game title" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="pc">PC</SelectItem>
                        <SelectItem value="ps5">PS5</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="fps">FPS</SelectItem>
                        <SelectItem value="moba">MOBA</SelectItem>
                        <SelectItem value="battle-royale">Battle Royale</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="rpg">RPG</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="sandbox">Sandbox</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input id="publisher" placeholder="Enter publisher" className="bg-gray-800 border-gray-700" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="releaseYear">Release Year</Label>
                    <Input id="releaseYear" type="number" placeholder="2025" className="bg-gray-800 border-gray-700" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    placeholder="Competitive, Multiplayer, etc."
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Game Image URL</Label>
                  <Input id="image" placeholder="Enter image URL" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isNew" className="h-4 w-4 rounded border-gray-700 bg-gray-800" />
                  <Label htmlFor="isNew">Mark as New Release</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" className="border-gray-700">
                  Cancel
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">Add Game</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Tabs value={view} onValueChange={(v) => setView(v as "grid" | "list")}>
            <TabsList className="bg-gray-800/50">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle className="font-heading text-xl text-white">All Games</CardTitle>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search games..."
                  className="w-full bg-gray-800 border-gray-700 pl-8 md:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="pc">PC</SelectItem>
                    <SelectItem value="ps5">PS5</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="fps">FPS</SelectItem>
                    <SelectItem value="moba">MOBA</SelectItem>
                    <SelectItem value="battle royale">Battle Royale</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="sandbox">Sandbox</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[130px] bg-gray-800 border-gray-700">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={view} className="w-full">
            <TabsContent value="grid" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-950 transition-all hover:border-gray-700"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                      fill
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-60" />
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        {game.platform === "PC" || game.platform === "Both" ? (
                          <Badge variant="outline" className="border-blue-500 bg-blue-950/50 text-blue-400">
                            <Monitor className="mr-1 h-3 w-3" />
                            PC
                          </Badge>
                        ) : null}
                        {game.platform === "PS5" || game.platform === "Both" ? (
                          <Badge variant="outline" className="border-indigo-500 bg-indigo-950/50 text-indigo-400">
                            <Gamepad2 className="mr-1 h-3 w-3" />
                            PS5
                          </Badge>
                        ) : null}
                      </div>
                      {game.isNew && <Badge className="absolute right-2 top-2 bg-green-600">New</Badge>}
                    </div>
                    <div className="p-4 flex-1 grow h-full flex flex-col">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="font-medium text-white">{game.title}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="mr-1 h-4 w-4 fill-yellow-500" />
                          <span className="text-sm">{game.popularity / 10}</span>
                        </div>
                      </div>
                      <div className="mb-3 flex items-center text-sm text-gray-400">
                        <span>{game.genre}</span>
                        <span className="mx-2">•</span>
                        <span>{game.releaseYear}</span>
                      </div>
                      <div className="flex-1 flex flex-wrap gap-1">
                        {game.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="outline" className="border-gray-700 text-gray-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm" className="border-gray-700 w-full">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list" className="mt-0">
              <div className="rounded-md border border-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800 bg-gray-950">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Title</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Platform</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Genre</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Release Year</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Publisher</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Tags</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Popularity</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGames.map((game, i) => (
                        <tr
                          key={game.id}
                          className={`border-b border-gray-800 ${i % 2 === 0 ? "bg-gray-900/30" : "bg-gray-900/60"}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="relative h-10 w-10 overflow-hidden rounded">
                                <Image
                                  fill
                                  src={game.image || "/placeholder.svg"}
                                  alt={game.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="font-medium text-white">
                                {game.title}
                                {game.isNew && <Badge className="ml-2 bg-green-600">New</Badge>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {game.platform === "PC" || game.platform === "Both" ? (
                                <Badge variant="outline" className="border-blue-500 bg-blue-950/50 text-blue-400">
                                  <Monitor className="mr-1 h-3 w-3" />
                                  PC
                                </Badge>
                              ) : null}
                              {game.platform === "PS5" || game.platform === "Both" ? (
                                <Badge variant="outline" className="border-indigo-500 bg-indigo-950/50 text-indigo-400">
                                  <Gamepad2 className="mr-1 h-3 w-3" />
                                  PS5
                                </Badge>
                              ) : null}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-300">{game.genre}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{game.releaseYear}</td>
                          <td className="px-4 py-3 text-sm text-gray-300">{game.publisher}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {game.tags.slice(0, 2).map((tag, i) => (
                                <Badge key={i} variant="outline" className="border-gray-700 text-gray-400">
                                  {tag}
                                </Badge>
                              ))}
                              {game.tags.length > 2 && (
                                <Badge variant="outline" className="border-gray-700 text-gray-400">
                                  +{game.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center text-yellow-500">
                              <Star className="mr-1 h-4 w-4 fill-yellow-500" />
                              <span>{game.popularity / 10}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" className="h-8 border-gray-700">
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-red-800 text-red-500 hover:bg-red-950 hover:text-red-400"
                              >
                                Remove
                              </Button>
                            </div>
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
    </div>
  )
}
