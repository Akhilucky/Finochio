import React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import "@/app/globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactElement<{ childProp?: { segment?: string } }>
}) {
  const isAuthenticated = false; // Set to false to make login page the starting page
  const isLoginPage =
    React.isValidElement(children) &&
    children.props?.childProp?.segment === "login";

  if (!isAuthenticated && !isLoginPage) {
    // Uncomment to enable redirection
    // redirect('/login');
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>FinMate - Your AI Financial Assistant</title>
        <meta
          name="description"
          content="AI-powered financial assistant to help you control spending and boost savings"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
