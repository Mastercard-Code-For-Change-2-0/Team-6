"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  UserPlus,
  Upload,
  Settings,
} from "lucide-react"

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of platform statistics and recent activities.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,089</div>
            <p className="text-xs text-muted-foreground">87% of total students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Uploaded</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,456</div>
            <p className="text-xs text-muted-foreground">+23% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <UserPlus className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">25 new students registered</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">156 documents uploaded today</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Bulk upload completed</p>
                <p className="text-xs text-muted-foreground">6 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">12 profiles need verification</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Student Data
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage Students
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Platform Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Student Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Active</span>
              <div className="flex items-center space-x-2">
                <Badge variant="default">1,089</Badge>
                <span className="text-xs text-muted-foreground">87%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Inactive</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">158</Badge>
                <span className="text-xs text-muted-foreground">13%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Verified</span>
              <div className="flex items-center space-x-2">
                <Badge variant="default">2,890</Badge>
                <span className="text-xs text-muted-foreground">84%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">566</Badge>
                <span className="text-xs text-muted-foreground">16%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Server Status</span>
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge variant="default" className="bg-green-500">
                <CheckCircle className="h-3 w-3 mr-1" />
                Healthy
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
