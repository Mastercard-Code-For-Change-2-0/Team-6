"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { StudentDataManagement } from "@/components/student-data-management"

export default function AdminStudents() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Header userRole="admin" userName="Admin User" />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <StudentDataManagement />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
