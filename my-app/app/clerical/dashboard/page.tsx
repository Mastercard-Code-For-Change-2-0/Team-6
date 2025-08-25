"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { ClericalSidebar } from "@/components/clerical-sidebar"
import { ClericalOverview } from "@/components/clerical-overview"

export default function ClericalDashboard() {
  return (
    <AuthGuard allowedRoles={["clerical"]}>
      <div className="min-h-screen bg-background">
        <Header userRole="clerical" userName="Clerical User" />
        <div className="flex">
          <ClericalSidebar />
          <main className="flex-1 p-6">
            <ClericalOverview />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
