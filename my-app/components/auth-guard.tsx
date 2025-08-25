"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: ("student" | "admin" | "clerical")[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would check authentication status from context/API
    // For demo purposes, we'll simulate role checking
    const checkAuth = () => {
      // Simulate getting user role from localStorage or context
      const userRole = localStorage.getItem("userRole") as "student" | "admin" | "clerical" | null

      if (!userRole || !allowedRoles.includes(userRole)) {
        router.push("/")
        return
      }

      setIsAuthorized(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [allowedRoles, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
