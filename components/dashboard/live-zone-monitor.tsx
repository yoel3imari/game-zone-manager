import { Gamepad2, Monitor } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type StationType = "PC" | "PS5"
type StationStatus = "Available" | "Occupied" | "Maintenance"

interface GamingStation {
  id: number
  type: StationType
  status: StationStatus
  user?: string
  timeRemaining?: string
  game?: string
}

// Sample data for the gaming stations
const stations: GamingStation[] = [
  { id: 1, type: "PC", status: "Occupied", user: "Alex S.", timeRemaining: "1h 20m", game: "Valorant" },
  { id: 2, type: "PC", status: "Available" },
  { id: 3, type: "PC", status: "Occupied", user: "Mike W.", timeRemaining: "45m", game: "CS:GO" },
  { id: 4, type: "PC", status: "Occupied", user: "Sarah J.", timeRemaining: "2h 10m", game: "League of Legends" },
  { id: 5, type: "PC", status: "Available" },
  { id: 6, type: "PC", status: "Maintenance" },
  { id: 7, type: "PC", status: "Occupied", user: "John D.", timeRemaining: "30m", game: "Fortnite" },
  { id: 8, type: "PC", status: "Available" },
  { id: 9, type: "PS5", status: "Occupied", user: "Emma L.", timeRemaining: "1h 45m", game: "FIFA 24" },
  { id: 10, type: "PS5", status: "Available" },
  { id: 11, type: "PS5", status: "Occupied", user: "Tom H.", timeRemaining: "55m", game: "Call of Duty" },
  { id: 12, type: "PS5", status: "Maintenance" },
]

export function LiveZoneMonitor() {
  const getStatusColor = (status: StationStatus) => {
    switch (status) {
      case "Available":
        return "bg-green-500"
      case "Occupied":
        return "bg-blue-500"
      case "Maintenance":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-green-500 text-green-500">
            <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
            Available
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
            Occupied
          </Badge>
          <Badge variant="outline" className="border-red-500 text-red-500">
            <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
            Maintenance
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <TooltipProvider>
          {stations.map((station) => (
            <Tooltip key={station.id}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "flex h-16 flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-950 p-2 transition-all hover:border-gray-700",
                    station.status === "Occupied" && "ring-1 ring-blue-500/50",
                  )}
                >
                  {station.type === "PC" ? (
                    <Monitor className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Gamepad2 className="h-6 w-6 text-gray-400" />
                  )}
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-xs font-medium">
                      {station.type} {station.id}
                    </span>
                    <span className={cn("h-2 w-2 rounded-full", getStatusColor(station.status))}></span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-gray-900 border-gray-800">
                <div className="space-y-1 p-1">
                  <p className="font-medium text-white">
                    {station.type} Station #{station.id}
                  </p>
                  <p className="text-sm text-gray-400">Status: {station.status}</p>
                  {station.user && (
                    <>
                      <p className="text-sm text-gray-400">User: {station.user}</p>
                      <p className="text-sm text-gray-400">Game: {station.game}</p>
                      <p className="text-sm text-gray-400">Time Left: {station.timeRemaining}</p>
                    </>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}
