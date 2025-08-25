"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, LogOut, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  userRole: "student" | "admin" | "clerical"
  userName?: string
}

export function Header({ userRole, userName = "User" }: HeaderProps) {
  const handleLogout = () => {
    localStorage.removeItem("userRole")
    window.location.href = "/"
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">Y4D Platform</h1>
          <span className="text-sm text-muted-foreground capitalize">• {userRole} Portal</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{userName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
