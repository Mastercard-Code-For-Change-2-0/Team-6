"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { StudentSidebar } from "@/components/student-sidebar"
import { StudentOverview } from "@/components/student-overview"

export default function StudentDashboard() {
  return (
    <AuthGuard allowedRoles={["student"]}>
      <div className="min-h-screen bg-background">
        <Header userRole="student" userName="Sonali Priya" />
        <div className="flex">
          <StudentSidebar />
          <main className="flex-1 p-6">
            <StudentOverview />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
