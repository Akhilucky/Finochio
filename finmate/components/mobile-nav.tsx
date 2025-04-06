"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Zap } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export function MobileNav() {
  return (
    <header className="flex h-14 items-center px-4 border-b md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2 mx-auto">
        <Zap className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">FinMate</h1>
      </div>
    </header>
  )
}

