"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Plus, Trash2, Edit, Save, Database } from "lucide-react"

interface ProfileField {
  id: string
  name: string
  label: string
  type: "text" | "email" | "phone" | "select" | "textarea" | "date"
  required: boolean
  options?: string[]
  order: number
}

export function AdminSettings() {
  const [profileFields, setProfileFields] = useState<ProfileField[]>([
    { id: "1", name: "firstName", label: "First Name", type: "text", required: true, order: 1 },
    { id: "2", name: "lastName", label: "Last Name", type: "text", required: true, order: 2 },
    { id: "3", name: "email", label: "Email Address", type: "email", required: true, order: 3 },
    { id: "4", name: "phone", label: "Phone Number", type: "phone", required: true, order: 4 },
    { id: "5", name: "dateOfBirth", label: "Date of Birth", type: "date", required: false, order: 5 },
    { id: "6", name: "address", label: "Address", type: "textarea", required: false, order: 6 },
    { id: "7", name: "education", label: "Education", type: "text", required: false, order: 7 },
    {
      id: "8",
      name: "jobRole",
      label: "Job Role",
      type: "select",
      required: true,
      order: 8,
      options: ["Software Developer", "Data Analyst", "Digital Marketer", "Graphic Designer"],
    },
    { id: "9", name: "trainingPartner", label: "Training Partner", type: "text", required: true, order: 9 },
    { id: "10", name: "batch", label: "Batch", type: "text", required: true, order: 10 },
    { id: "11", name: "location", label: "Location", type: "text", required: true, order: 11 },
  ])

  const [newField, setNewField] = useState<Partial<ProfileField>>({
    name: "",
    label: "",
    type: "text",
    required: false,
    options: [],
  })

  const [editingField, setEditingField] = useState<string | null>(null)

  const handleAddField = () => {
    if (!newField.name || !newField.label) return

    const field: ProfileField = {
      id: Date.now().toString(),
      name: newField.name,
      label: newField.label,
      type: newField.type || "text",
      required: newField.required || false,
      options: newField.options,
      order: profileFields.length + 1,
    }

    setProfileFields([...profileFields, field])
    setNewField({ name: "", label: "", type: "text", required: false, options: [] })
  }

  const handleDeleteField = (id: string) => {
    setProfileFields(profileFields.filter((field) => field.id !== id))
  }

  const handleToggleRequired = (id: string) => {
    setProfileFields(profileFields.map((field) => (field.id === id ? { ...field, required: !field.required } : field)))
  }

  const getFieldTypeIcon = (type: ProfileField["type"]) => {
    return <Database className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Settings</h1>
        <p className="text-muted-foreground">Configure platform settings and define student profile data fields.</p>
      </div>

      {/* Profile Field Builder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Student Profile Fields</span>
          </CardTitle>
          <CardDescription>Define and manage the data fields that students can fill in their profiles</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Field */}
          <div className="p-4 border border-border rounded-lg bg-muted/50">
            <h4 className="font-medium mb-4">Add New Field</h4>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="fieldName">Field Name</Label>
                <Input
                  id="fieldName"
                  placeholder="e.g., middleName"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldLabel">Display Label</Label>
                <Input
                  id="fieldLabel"
                  placeholder="e.g., Middle Name"
                  value={newField.label}
                  onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Field Type</Label>
                <Select
                  value={newField.type}
                  onValueChange={(value) => setNewField({ ...newField, type: value as ProfileField["type"] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                    <SelectItem value="textarea">Textarea</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddField} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                checked={newField.required}
                onCheckedChange={(checked) => setNewField({ ...newField, required: checked })}
              />
              <Label>Required field</Label>
            </div>
          </div>

          <Separator />

          {/* Existing Fields */}
          <div className="space-y-3">
            <h4 className="font-medium">Current Profile Fields</h4>
            <div className="space-y-2">
              {profileFields
                .sort((a, b) => a.order - b.order)
                .map((field) => (
                  <div key={field.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFieldTypeIcon(field.type)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{field.label}</span>
                          {field.required && (
                            <Badge variant="destructive" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {field.name} • {field.type}
                          {field.options && field.options.length > 0 && <span> • {field.options.length} options</span>}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.required}
                        onCheckedChange={() => handleToggleRequired(field.id)}
                        disabled={field.name === "firstName" || field.name === "lastName" || field.name === "email"}
                      />
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteField(field.id)}
                        disabled={field.name === "firstName" || field.name === "lastName" || field.name === "email"}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Field Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>General platform configuration and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">User Registration</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowRegistration">Allow new registrations</Label>
                  <Switch id="allowRegistration" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireApproval">Require admin approval</Label>
                  <Switch id="requireApproval" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailVerification">Email verification required</Label>
                  <Switch id="emailVerification" defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Document Management</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoVerify">Auto-verify documents</Label>
                  <Switch id="autoVerify" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireDocuments">Require document upload</Label>
                  <Switch id="requireDocuments" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max file size (MB)</Label>
                  <Input id="maxFileSize" type="number" defaultValue="10" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Notification Settings</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email notifications</Label>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="bulkUploadNotifications">Bulk upload notifications</Label>
                <Switch id="bulkUploadNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="systemAlerts">System alerts</Label>
                <Switch id="systemAlerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyReports">Weekly reports</Label>
                <Switch id="weeklyReports" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
