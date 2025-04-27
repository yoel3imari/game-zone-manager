import type React from "react"
import { Mona_Sans as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Custom gaming font for headings
const fontHeading = localFont({
  src: "../public/fonts/Orbitron-Bold.ttf",
  variable: "--font-heading",
})

export const metadata = {
  title: "Agadir GameZone",
  description: "Manage your gaming zone with our comprehensive dashboard",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
