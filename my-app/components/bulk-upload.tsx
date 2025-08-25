"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, AlertCircle, Download, Users } from "lucide-react"

interface UploadResult {
  id: string
  filename: string
  status: "success" | "error" | "processing"
  recordsProcessed: number
  totalRecords: number
  errors: string[]
  timestamp: string
}

export function BulkUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([
    {
      id: "1",
      filename: "students_batch_2024_A.csv",
      status: "success",
      recordsProcessed: 150,
      totalRecords: 150,
      errors: [],
      timestamp: "2024-01-20 14:30:00",
    },
    {
      id: "2",
      filename: "students_batch_2024_B.csv",
      status: "error",
      recordsProcessed: 45,
      totalRecords: 100,
      errors: ["Invalid email format in row 23", "Missing required field 'phone' in row 67"],
      timestamp: "2024-01-19 09:15:00",
    },
  ])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Add new upload result
          const newResult: UploadResult = {
            id: Date.now().toString(),
            filename: file.name,
            status: "success",
            recordsProcessed: Math.floor(Math.random() * 200) + 50,
            totalRecords: Math.floor(Math.random() * 200) + 50,
            errors: [],
            timestamp: new Date().toLocaleString(),
          }
          setUploadResults((prev) => [newResult, ...prev])

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const getStatusIcon = (status: UploadResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Upload className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: UploadResult["status"]) => {
    const variants = {
      success: "default",
      error: "destructive",
      processing: "secondary",
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
        <h1 className="text-3xl font-bold text-foreground">Bulk Upload</h1>
        <p className="text-muted-foreground">Upload student data in bulk using CSV files.</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Student Data</span>
          </CardTitle>
          <CardDescription>
            Upload a CSV file containing student information to add multiple students at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csvFile">Select CSV File</Label>
            <Input id="csvFile" type="file" accept=".csv" onChange={handleFileUpload} disabled={isUploading} />
            <p className="text-xs text-muted-foreground">Supported format: CSV (Max size: 50MB)</p>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Processing file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              <strong>CSV Format Requirements:</strong>
              <br />
              Required columns: first_name, last_name, email, phone, batch, location, training_partner, job_role
              <br />
              Optional columns: address, education, date_of_birth
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span>Download Template</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <FileText className="h-4 w-4" />
              <span>View Format Guide</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <CardTitle>Upload History</CardTitle>
          <CardDescription>Recent bulk upload operations and their results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadResults.map((result) => (
              <div key={result.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(result.status)}
                    <div>
                      <h4 className="font-medium">{result.filename}</h4>
                      <p className="text-sm text-muted-foreground">{result.timestamp}</p>
                    </div>
                  </div>
                  {getStatusBadge(result.status)}
                </div>

                <div className="grid gap-2 md:grid-cols-3 mb-3">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {result.recordsProcessed}/{result.totalRecords} records
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate: {Math.round((result.recordsProcessed / result.totalRecords) * 100)}%
                  </div>
                  {result.errors.length > 0 && (
                    <div className="text-sm text-red-500">{result.errors.length} errors</div>
                  )}
                </div>

                {result.errors.length > 0 && (
                  <div className="mt-3 p-3 bg-red-50 rounded-md">
                    <h5 className="text-sm font-medium text-red-800 mb-2">Errors:</h5>
                    <ul className="text-xs text-red-700 space-y-1">
                      {result.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-end space-x-2 mt-3">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download Report
                  </Button>
                  {result.status === "error" && (
                    <Button variant="ghost" size="sm">
                      <Upload className="h-4 w-4 mr-1" />
                      Retry Upload
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {uploadResults.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No uploads yet</p>
                <p className="text-sm">Upload your first CSV file to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Guidelines</CardTitle>
          <CardDescription>Best practices for successful bulk uploads</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">✓ Do</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Use the provided CSV template</li>
                <li>• Validate email formats before upload</li>
                <li>• Ensure all required fields are filled</li>
                <li>• Keep file size under 50MB</li>
                <li>• Use UTF-8 encoding for special characters</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-red-600">✗ Don't</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Include duplicate email addresses</li>
                <li>• Use special characters in names</li>
                <li>• Leave required fields empty</li>
                <li>• Upload files larger than 50MB</li>
                <li>• Mix different data formats</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
