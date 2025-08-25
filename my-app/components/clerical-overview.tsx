"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Upload, FileText, Bell, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function ClericalOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Clerical Dashboard</h1>
        <p className="text-muted-foreground">Manage bulk uploads, notifications, and basic student data operations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Processed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads Today</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 successful, 1 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Processed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Sent this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common clerical tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Student Data
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Send Notifications
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              View Student List
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Process Documents
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your recent clerical activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Uploaded 25 student records</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Sent verification notifications</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Processed document batch</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task Status */}
      <Card>
        <CardHeader>
          <CardTitle>Task Status</CardTitle>
          <CardDescription>Current status of ongoing clerical tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Batch 2024-C Upload</p>
                  <p className="text-xs text-muted-foreground">Processing 45 records</p>
                </div>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Document Verification</p>
                  <p className="text-xs text-muted-foreground">23 documents verified</p>
                </div>
              </div>
              <Badge variant="default">Completed</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">3 failed deliveries</p>
                </div>
              </div>
              <Badge variant="destructive">Needs Attention</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
