"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bell, CheckCircle, AlertCircle, Clock, Users, Mail, MessageSquare } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  recipients: number
  status: "sent" | "pending" | "failed"
}

export function NotificationsManagement() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Bulk Upload Completed",
      message: "Successfully uploaded 150 student records from batch 2024-A",
      timestamp: "2024-01-20 14:30:00",
      recipients: 5,
      status: "sent",
    },
    {
      id: "2",
      type: "error",
      title: "Bulk Upload Failed",
      message: "Failed to process 55 records due to validation errors in batch 2024-B upload",
      timestamp: "2024-01-19 09:15:00",
      recipients: 3,
      status: "sent",
    },
    {
      id: "3",
      type: "warning",
      title: "Document Verification Pending",
      message: "45 student documents are pending verification and require admin review",
      timestamp: "2024-01-18 16:45:00",
      recipients: 8,
      status: "sent",
    },
    {
      id: "4",
      type: "info",
      title: "System Maintenance Scheduled",
      message: "Platform maintenance scheduled for January 25th from 2:00 AM to 4:00 AM EST",
      timestamp: "2024-01-17 10:00:00",
      recipients: 1247,
      status: "pending",
    },
  ])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  const getNotificationBadge = (type: Notification["type"]) => {
    const variants = {
      success: "default",
      error: "destructive",
      warning: "secondary",
      info: "outline",
    } as const

    const colors = {
      success: "bg-green-500",
      error: "bg-red-500",
      warning: "bg-orange-500",
      info: "bg-blue-500",
    }

    return (
      <Badge variant={variants[type]} className={`capitalize ${colors[type]}`}>
        {type}
      </Badge>
    )
  }

  const getStatusBadge = (status: Notification["status"]) => {
    const variants = {
      sent: "default",
      pending: "secondary",
      failed: "destructive",
    } as const

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications Management</h1>
        <p className="text-muted-foreground">View and manage system notifications and alerts sent to users.</p>
      </div>

      {/* Notification Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successfully Sent</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21</div>
            <p className="text-xs text-muted-foreground">87.5% success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>System-generated notifications and their delivery status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        {getNotificationBadge(notification.type)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{notification.timestamp}</span>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>{notification.recipients} recipients</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">{getStatusBadge(notification.status)}</div>
                </div>

                {notification.status === "failed" && (
                  <Alert className="mt-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      This notification failed to send. Check system logs for details.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end space-x-2 mt-3">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  {notification.status === "failed" && (
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4 mr-1" />
                      Retry Send
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Different types of automated notifications sent by the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Success Notifications</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Sent when operations complete successfully (bulk uploads, profile updates, etc.)
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <h4 className="font-medium">Error Notifications</h4>
              </div>
              <p className="text-sm text-muted-foreground">Sent when operations fail or encounter critical errors</p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <h4 className="font-medium">Warning Notifications</h4>
              </div>
              <p className="text-sm text-muted-foreground">Sent for issues that need attention but aren't critical</p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Bell className="h-4 w-4 text-blue-500" />
                <h4 className="font-medium">Info Notifications</h4>
              </div>
              <p className="text-sm text-muted-foreground">General information updates and system announcements</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
