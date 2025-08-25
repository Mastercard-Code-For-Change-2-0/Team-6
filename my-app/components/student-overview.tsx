"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { User, FileText, CheckCircle, AlertCircle, TrendingUp, Calendar, Shield } from "lucide-react"

export function StudentOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
        <p className="text-muted-foreground">Here's an overview of your career journey progress.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/5</div>
            <p className="text-xs text-muted-foreground">Uploaded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">Account verified</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Career Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8</div>
            <p className="text-xs text-muted-foreground">Out of 10</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Tasks */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Profile updated</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Certificate uploaded</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-4 w-4 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">Training session completed</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Complete profile</p>
                  <p className="text-xs text-muted-foreground">Add missing information</p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Upload degree certificate</p>
                  <p className="text-xs text-muted-foreground">Required document</p>
                </div>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Review privacy settings</p>
                  <p className="text-xs text-muted-foreground">Update consent preferences</p>
                </div>
              </div>
              <Badge variant="outline">Optional</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
