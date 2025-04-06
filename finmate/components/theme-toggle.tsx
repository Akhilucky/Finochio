"use client"

import { Moon, Sun, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (theme === "brainrot") {
      document.body.classList.add("brainrot-mode")

      // Replace normal text with brainrot slang
      const textElements = document.querySelectorAll("p, h1, h2, h3, h4, span, button")
      textElements.forEach((el) => {
        if (!el.dataset.originalText) {
          el.dataset.originalText = el.textContent || ""
        }

        // Only modify if not already modified
        if (!el.dataset.brainrotified) {
          const text = el.dataset.originalText
          if (text && text.length > 5 && !text.includes("₹")) {
            // Random chance to add different slang terms
            const rand = Math.random()
            if (rand < 0.2) {
              el.textContent = text + " no cap fr fr"
            } else if (rand < 0.4) {
              el.textContent = "skibidi " + text
            } else if (rand < 0.6) {
              el.textContent = text + " gyatt"
            } else if (rand < 0.8) {
              el.textContent = text + " rizz"
            } else {
              el.textContent = "sigma " + text
            }
            el.dataset.brainrotified = "true"
          }
        }
      })
    } else {
      document.body.classList.remove("brainrot-mode")

      // Restore original text
      const textElements = document.querySelectorAll("[data-original-text]")
      textElements.forEach((el) => {
        if (el.dataset.brainrotified === "true") {
          el.textContent = el.dataset.originalText
          el.dataset.brainrotified = "false"
        }
      })
    }
  }, [theme])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Zap
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all data-[visible=true]:rotate-0 data-[visible=true]:scale-100"
            data-visible={theme === "brainrot"}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("brainrot")}>Brainrot</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

