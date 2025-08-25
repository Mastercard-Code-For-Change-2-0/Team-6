"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Download, Users } from "lucide-react"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  batch: string
  location: string
  trainingPartner: string
  jobRole: string
  status: "active" | "inactive" | "graduated"
  joinDate: string
  documentsUploaded: number
}

export function StudentDataManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBatch, setFilterBatch] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [students] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      batch: "2024-A",
      location: "New York",
      trainingPartner: "Tech Academy",
      jobRole: "Software Developer",
      status: "active",
      joinDate: "2024-01-15",
      documentsUploaded: 3,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 234-5678",
      batch: "2024-A",
      location: "California",
      trainingPartner: "Digital Institute",
      jobRole: "Data Analyst",
      status: "active",
      joinDate: "2024-01-20",
      documentsUploaded: 5,
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 345-6789",
      batch: "2024-B",
      location: "Texas",
      trainingPartner: "Code Bootcamp",
      jobRole: "Web Developer",
      status: "graduated",
      joinDate: "2023-09-10",
      documentsUploaded: 4,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 456-7890",
      batch: "2024-B",
      location: "Florida",
      trainingPartner: "Tech Academy",
      jobRole: "Digital Marketer",
      status: "inactive",
      joinDate: "2024-02-01",
      documentsUploaded: 2,
    },
  ])

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBatch = filterBatch === "all" || student.batch === filterBatch
    const matchesLocation = filterLocation === "all" || student.location === filterLocation
    const matchesStatus = filterStatus === "all" || student.status === filterStatus

    return matchesSearch && matchesBatch && matchesLocation && matchesStatus
  })

  const getStatusBadge = (status: Student["status"]) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      graduated: "outline",
    } as const

    const colors = {
      active: "bg-green-500",
      inactive: "bg-gray-500",
      graduated: "bg-blue-500",
    }

    return (
      <Badge variant={variants[status]} className={`capitalize ${colors[status]}`}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Student Data Management</h1>
        <p className="text-muted-foreground">View, filter, and manage student information and profiles.</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="search">Search Students</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Batch</Label>
              <Select value={filterBatch} onValueChange={setFilterBatch}>
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

            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} of {students.length} students
              </span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>Detailed view of all student information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Training Partner</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {student.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{student.email}</div>
                        <div className="text-sm text-muted-foreground">{student.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>{student.location}</TableCell>
                    <TableCell>{student.trainingPartner}</TableCell>
                    <TableCell>{student.jobRole}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{student.documentsUploaded}/5</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Student
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No students found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
