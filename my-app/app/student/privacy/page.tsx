"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { StudentSidebar } from "@/components/student-sidebar"
import { ConsentPrivacy } from "@/components/consent-privacy"

export default function StudentPrivacy() {
  return (
    <AuthGuard allowedRoles={["student"]}>
      <div className="min-h-screen bg-background">
        <Header userRole="student" userName="John Doe" />
        <div className="flex">
          <StudentSidebar />
          <main className="flex-1 p-6">
            <ConsentPrivacy />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
