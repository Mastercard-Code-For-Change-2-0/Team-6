"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Shield, Users } from "lucide-react"
import StudentSignup from "./student/StudentSignup/StudentSignup"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<"student" | "admin" | "clerical">("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log("Login attempt:", { role: selectedRole, email, password })

    localStorage.setItem("userRole", selectedRole)

    // Redirect based on role
    if (selectedRole === "student") {
      window.location.href = "/student/dashboard"
    } else if (selectedRole === "admin") {
      window.location.href = "/admin/dashboard"
    } else {
      window.location.href = "/clerical/dashboard"
    }
  }

  const roleConfig = {
    student: {
      icon: GraduationCap,
      title: "Student Portal",
      description: "Access your profile, upload documents, and manage your career journey",
      color: "text-primary",
    },
    admin: {
      icon: Shield,
      title: "Admin Panel",
      description: "Manage student data, generate reports, and oversee platform operations",
      color: "text-secondary",
    },
    clerical: {
      icon: Users,
      title: "Clerical Access",
      description: "Handle bulk uploads, send notifications, and view student information",
      color: "text-accent",
    },
  }

  const currentConfig = roleConfig[selectedRole]
  const IconComponent = currentConfig.icon

  return (
    <>
    <StudentSignup />
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-shrink-0 flex items-center">
            <img
              className="h-10 w-auto"
              src="https://www.y4d.ngo/assets/images/y4d/logo.png"
              alt="NGO Logo"
            />
          </div>
          </div>
          <p className="text-muted-foreground">Youth for Development Career Management</p>
        </div>

        {/* Role Selection */}
        
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-2">
              <IconComponent className={`h-12 w-12 ${currentConfig.color}`} />
            </div>
            <CardTitle className="text-xl">{currentConfig.title}</CardTitle>
            <CardDescription className="text-sm">{currentConfig.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as any)} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="student" className="text-xs">
                  Student
                </TabsTrigger>
                <TabsTrigger value="admin" className="text-xs">
                  Admin
                </TabsTrigger>
                <TabsTrigger value="clerical" className="text-xs">
                  Clerical
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot your password?
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2024 Youth for Development. All rights reserved.</p>
        </div>
      </div>
    </div>
    </>
  )
}
