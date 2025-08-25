"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, CheckCircle, AlertCircle, Clock, Download, Trash2 } from "lucide-react"

interface Document {
  id: string
  name: string
  type: string
  status: "uploaded" | "pending" | "approved" | "rejected"
  uploadDate: string
  size: string
}

export function DocumentUpload() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "High School Certificate",
      type: "Certificate",
      status: "approved",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
    },
    {
      id: "2",
      name: "Bachelor's Degree",
      type: "Degree",
      status: "pending",
      uploadDate: "2024-01-20",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Training Certificate",
      type: "Certificate",
      status: "uploaded",
      uploadDate: "2024-01-22",
      size: "1.2 MB",
    },
  ])

  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

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

          // Add new document to list
          const newDoc: Document = {
            id: Date.now().toString(),
            name: file.name,
            type: "Document",
            status: "uploaded",
            uploadDate: new Date().toISOString().split("T")[0],
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          }
          setDocuments((prev) => [...prev, newDoc])

          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />
      default:
        return <FileText className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: Document["status"]) => {
    const variants = {
      approved: "default",
      rejected: "destructive",
      pending: "secondary",
      uploaded: "outline",
    } as const

    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    )
  }

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Document Management</h1>
        <p className="text-muted-foreground">Upload and manage your certificates, degrees, and other documents.</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload Documents</span>
          </CardTitle>
          <CardDescription>Upload your certificates, degrees, and diplomas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document">Select Document</Label>
            <Input
              id="document"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max size: 10MB)
            </p>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Documents</CardTitle>
          <CardDescription>Manage your uploaded documents and their verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <h4 className="font-medium">{doc.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{doc.type}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>Uploaded {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {getStatusBadge(doc.status)}
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {documents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No documents uploaded yet</p>
                <p className="text-sm">Upload your first document to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>Documents you need to upload for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Educational Certificates</h4>
                <Badge variant="destructive">Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                High school diploma, bachelor's degree, or equivalent educational certificates
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Training Certificates</h4>
                <Badge variant="secondary">Optional</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Professional training certificates, skill certifications, or course completions
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Identity Proof</h4>
                <Badge variant="destructive">Required</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Government-issued ID, passport, or driver's license</p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Work Experience</h4>
                <Badge variant="outline">Recommended</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Employment letters, experience certificates, or portfolio documents
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
