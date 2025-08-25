"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, User, FileText, Shield, ChevronLeft, ChevronRight } from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Profile",
    href: "/student/profile",
    icon: User,
  },
  {
    name: "Documents",
    href: "/student/documents",
    icon: FileText,
  },
  {
    name: "Privacy",
    href: "/student/privacy",
    icon: Shield,
  },
]

export function StudentSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("bg-card border-r border-border transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4">
          {!collapsed && <h2 className="text-lg font-semibold text-card-foreground">Student Portal</h2>}
          <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}
                >
                  <item.icon className={cn("h-4 w-4", collapsed ? "" : "mr-2")} />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
