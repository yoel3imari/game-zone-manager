"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Award,
  Bell,
  Calendar,
  CreditCard,
  Gamepad2,
  Gift,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  Shield,
  Trophy,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DashboardOverview } from "./dashboard/overview";
import { BookingsPage } from "./dashboard/bookings";
import { GamesLibrary } from "./dashboard/games-library";
import { TeamsPage } from "./dashboard/teams";
import { CompetitionsPage } from "./dashboard/competitions";
import { SupportPage } from "./dashboard/support";
import { SubscriptionsPage } from "./dashboard/subscriptions";
import { LeaderboardPage } from "./dashboard/leaderboard";
import { RewardsPage } from "./dashboard/rewards";
import { AnalyticsPage } from "./dashboard/analytics";
import { PaymentsPage } from "./dashboard/payments";
import Image from "next/image";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  variant: "default" | "ghost";
}

export function DashboardShell() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState<"admin" | "player">("admin");

  const navItems: NavItem[] = [
    {
      title: "Overview",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      variant: activeTab === "overview" ? "default" : "ghost",
    },
    {
      title: "Bookings",
      href: "/bookings",
      icon: <Calendar className="h-5 w-5" />,
      variant: activeTab === "bookings" ? "default" : "ghost",
    },
    {
      title: "Payments",
      href: "/payments",
      icon: <CreditCard className="h-5 w-5" />,
      variant: activeTab === "payments" ? "default" : "ghost",
    },
    {
      title: "Games Library",
      href: "/games",
      icon: <Gamepad2 className="h-5 w-5" />,
      variant: activeTab === "games" ? "default" : "ghost",
    },
    {
      title: "Teams",
      href: "/teams",
      icon: <Users className="h-5 w-5" />,
      variant: activeTab === "teams" ? "default" : "ghost",
    },
    {
      title: "Competitions",
      href: "/competitions",
      icon: <Trophy className="h-5 w-5" />,
      variant: activeTab === "competitions" ? "default" : "ghost",
    },
    {
      title: "Support",
      href: "/support",
      icon: <HelpCircle className="h-5 w-5" />,
      variant: activeTab === "support" ? "default" : "ghost",
    },
    {
      title: "Subscriptions",
      href: "/subscriptions",
      icon: <Shield className="h-5 w-5" />,
      variant: activeTab === "subscriptions" ? "default" : "ghost",
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      icon: <Award className="h-5 w-5" />,
      variant: activeTab === "leaderboard" ? "default" : "ghost",
    },
    {
      title: "Rewards",
      href: "/rewards",
      icon: <Gift className="h-5 w-5" />,
      variant: activeTab === "rewards" ? "default" : "ghost",
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <PieChart className="h-5 w-5" />,
      variant: activeTab === "analytics" ? "default" : "ghost",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-950 to-gray-900">
      <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-950/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-950 overflow-auto border-gray-800">
                <div className="flex h-16 items-center border-b border-gray-800 px-6">
                  <Link href="/" className="flex items-center gap-2 font-bold">
                    <Image
                      src="/logo.png"
                      width={50}
                      height={50}
                      alt="GameZone"
                    />
                    <span className="font-heading text-xl tracking-wider text-pink-500 uppercase">
                      GameZone
                    </span>
                  </Link>
                </div>
                <nav className="grid gap-2 py-6">
                  {navItems.map((item, index) => (
                    <Button
                      key={index}
                      variant={item.variant}
                      className={cn(
                        "flex h-10 items-center justify-start gap-2 px-4 font-medium",
                        item.variant === "default" &&
                          "bg-purple-600 hover:bg-purple-700 text-white"
                      )}
                      onClick={() => setActiveTab(item.title.toLowerCase())}
                    >
                      {item.icon}
                      {item.title}
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="hidden items-center gap-2 md:flex">
              <Image src="/logo.png" width={50} height={50} alt="GameZone" />
              <span className="font-heading text-xl tracking-wider font-bold uppercase">
                <span className="text-pink-500">game</span>
                <span className="text-sky-500">Zone</span>
              </span>
            </Link>
            <div className="hidden md:flex">
              <Tabs
                value={viewMode}
                onValueChange={(value) =>
                  setViewMode(value as "admin" | "player")
                }
                className="w-[400px]"
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
                  <TabsTrigger value="admin" className="font-medium">
                    <Shield className="mr-2 h-4 w-4" />
                    Admin View
                  </TabsTrigger>
                  <TabsTrigger value="player" className="font-medium">
                    <Gamepad2 className="mr-2 h-4 w-4" />
                    Player View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search games, players, teams..."
                  className="w-[300px] bg-gray-900 pl-8 focus-visible:ring-purple-500"
                />
              </div>
            </form>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-purple-600 text-white p-0 text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Avatar"
                    />
                    <AvatarFallback className="bg-purple-700">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-gray-900 border-gray-800"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Messages</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Activity Log</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1 relative overflow-hidden">
        <aside className="hidden overflow-auto fixed h-screen w-64 border-r border-gray-800 bg-gray-950 md:block">
          <nav className="grid gap-2 p-4">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant={item.variant}
                className={cn(
                  "flex h-10 items-center justify-start gap-2 px-4 font-medium",
                  item.variant === "default" &&
                    "bg-purple-600 hover:bg-purple-700 text-white"
                )}
                onClick={() => setActiveTab(item.title.toLowerCase())}
              >
                {item.icon}
                {item.title}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto h-full ps-64">
          <div className="container p-4 md:p-6">
            {activeTab === "overview" && <DashboardOverview />}
            {activeTab === "bookings" && <BookingsPage />}
            {activeTab === "payments" && <PaymentsPage />}
            {activeTab === "games library" && <GamesLibrary />}
            {activeTab === "teams" && <TeamsPage />}
            {activeTab === "competitions" && <CompetitionsPage />}
            {activeTab === "support" && <SupportPage />}
            {activeTab === "subscriptions" && <SubscriptionsPage />}
            {activeTab === "leaderboard" && <LeaderboardPage />}
            {activeTab === "rewards" && <RewardsPage />}
            {activeTab === "analytics" && <AnalyticsPage />}
          </div>
        </main>
      </div>
    </div>
  );
}
