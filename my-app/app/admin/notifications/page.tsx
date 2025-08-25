"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { NotificationsManagement } from "@/components/notifications-management"

export default function AdminNotifications() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen bg-background">
        <Header userRole="admin" userName="Admin User" />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <NotificationsManagement />
          </main>
        </div>
      </div>
    </AuthGuard>
  )
}
