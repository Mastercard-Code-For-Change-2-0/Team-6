"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  GraduationCap,
  Calendar,
  BarChart3,
  PieChart,
  Clock,
} from "lucide-react"

interface ReportTemplate {
  id: string
  name: string
  description: string
  type: "career" | "dropout" | "performance" | "demographics"
  icon: any
  lastGenerated?: string
  size?: string
}

export function ReportsManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState("last-month")
  const [selectedBatch, setSelectedBatch] = useState("all")
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const reportTemplates: ReportTemplate[] = [
    {
      id: "career-progress",
      name: "Career Progress Report",
      description: "Detailed analysis of student career advancement and placement rates",
      type: "career",
      icon: TrendingUp,
      lastGenerated: "2024-01-20",
      size: "2.3 MB",
    },
    {
      id: "dropout-analysis",
      name: "Dropout Cases Report",
      description: "Analysis of student dropout patterns and contributing factors",
      type: "dropout",
      icon: TrendingDown,
      lastGenerated: "2024-01-18",
      size: "1.8 MB",
    },
    {
      id: "performance-metrics",
      name: "Performance Metrics",
      description: "Overall platform performance and student engagement statistics",
      type: "performance",
      icon: BarChart3,
      lastGenerated: "2024-01-22",
      size: "3.1 MB",
    },
    {
      id: "demographics",
      name: "Demographics Report",
      description: "Student demographics breakdown by location, batch, and training partner",
      type: "demographics",
      icon: PieChart,
      lastGenerated: "2024-01-19",
      size: "1.5 MB",
    },
  ]

  const handleGenerateReport = (reportId: string) => {
    setIsGenerating(reportId)

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(null)
      console.log(`Generated report: ${reportId}`)
    }, 3000)
  }

  const getTypeColor = (type: ReportTemplate["type"]) => {
    const colors = {
      career: "bg-green-500",
      dropout: "bg-red-500",
      performance: "bg-blue-500",
      demographics: "bg-purple-500",
    }
    return colors[type]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports Management</h1>
        <p className="text-muted-foreground">
          Generate and download comprehensive reports on student data and platform performance.
        </p>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Report Configuration</span>
          </CardTitle>
          <CardDescription>Configure global settings for report generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Time Period</Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Batch Filter</Label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  <SelectItem value="2024-A">2024-A</SelectItem>
                  <SelectItem value="2024-B">2024-B</SelectItem>
                  <SelectItem value="2023-A">2023-A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-transparent" variant="outline">
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dropout Rate</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8%</div>
            <p className="text-xs text-muted-foreground">-2% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2 mo</div>
            <p className="text-xs text-muted-foreground">-0.3 mo from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <div className="grid gap-6 md:grid-cols-2">
        {reportTemplates.map((template) => {
          const IconComponent = template.icon
          const isCurrentlyGenerating = isGenerating === template.id

          return (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(template.type)}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="text-sm">{template.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {template.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {template.lastGenerated && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Last generated: {template.lastGenerated}</span>
                    <span>Size: {template.size}</span>
                  </div>
                )}

                {isCurrentlyGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Generating report...</span>
                      <Clock className="h-4 w-4" />
                    </div>
                    <Progress value={66} />
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleGenerateReport(template.id)}
                    disabled={isCurrentlyGenerating}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isCurrentlyGenerating ? "Generating..." : "Generate Report"}
                  </Button>
                  {template.lastGenerated && (
                    <Button variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports available for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Career Progress Report - January 2024", date: "2024-01-20", size: "2.3 MB", type: "career" },
              { name: "Demographics Report - January 2024", date: "2024-01-19", size: "1.5 MB", type: "demographics" },
              { name: "Dropout Analysis - December 2023", date: "2024-01-18", size: "1.8 MB", type: "dropout" },
              { name: "Performance Metrics - Q4 2023", date: "2024-01-15", size: "3.1 MB", type: "performance" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Generated on {report.date} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="capitalize">
                    {report.type}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
