"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Database, CheckCircle, AlertTriangle } from "lucide-react"

export function ConsentPrivacy() {
  const [consents, setConsents] = useState({
    dataProcessing: true,
    marketing: false,
    analytics: true,
    thirdParty: false,
    profileSharing: true,
  })

  const handleConsentChange = (key: keyof typeof consents) => {
    setConsents((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSavePreferences = () => {
    console.log("Privacy preferences saved:", consents)
    // Handle saving preferences
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Privacy & Consent</h1>
        <p className="text-muted-foreground">Manage your data privacy preferences and consent settings.</p>
      </div>

      {/* Privacy Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Your Privacy Matters</span>
          </CardTitle>
          <CardDescription>
            We are committed to protecting your personal information and giving you control over your data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Lock className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Data Encryption</h4>
                <p className="text-sm text-muted-foreground">End-to-end encrypted</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Eye className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Transparency</h4>
                <p className="text-sm text-muted-foreground">Clear data usage</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Data Control</h4>
                <p className="text-sm text-muted-foreground">You own your data</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consent Management */}
      <Card>
        <CardHeader>
          <CardTitle>Consent Preferences</CardTitle>
          <CardDescription>Choose how your data can be used and shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Essential Data Processing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={consents.dataProcessing}
                    onCheckedChange={() => handleConsentChange("dataProcessing")}
                    disabled
                  />
                  <div>
                    <h4 className="font-medium">Essential Data Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for core platform functionality, account management, and security
                    </p>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Required</Badge>
            </div>
            <div className="ml-6 text-xs text-muted-foreground">
              This includes processing your profile information, authentication data, and platform usage for essential
              services.
            </div>
          </div>

          <Separator />

          {/* Analytics */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={consents.analytics} onCheckedChange={() => handleConsentChange("analytics")} />
                  <div>
                    <h4 className="font-medium">Analytics & Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us improve the platform by analyzing usage patterns
                    </p>
                  </div>
                </div>
              </div>
              <Badge variant="outline">Optional</Badge>
            </div>
            <div className="ml-6 text-xs text-muted-foreground">
              Anonymous usage data to understand how features are used and identify areas for improvement.
            </div>
          </div>

          <Separator />

          {/* Profile Sharing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={consents.profileSharing}
                    onCheckedChange={() => handleConsentChange("profileSharing")}
                  />
                  <div>
                    <h4 className="font-medium">Profile Sharing with Partners</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your profile with training partners and potential employers
                    </p>
                  </div>
                </div>
              </div>
              <Badge variant="outline">Optional</Badge>
            </div>
            <div className="ml-6 text-xs text-muted-foreground">
              Your profile information may be shared with verified training partners and employers for career
              opportunities.
            </div>
          </div>

          <Separator />

          {/* Marketing Communications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={consents.marketing} onCheckedChange={() => handleConsentChange("marketing")} />
                  <div>
                    <h4 className="font-medium">Marketing Communications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about new features, opportunities, and platform news
                    </p>
                  </div>
                </div>
              </div>
              <Badge variant="outline">Optional</Badge>
            </div>
            <div className="ml-6 text-xs text-muted-foreground">
              Email notifications about platform updates, career opportunities, and relevant educational content.
            </div>
          </div>

          <Separator />

          {/* Third Party Integrations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={consents.thirdParty} onCheckedChange={() => handleConsentChange("thirdParty")} />
                  <div>
                    <h4 className="font-medium">Third-Party Integrations</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow integration with external services for enhanced functionality
                    </p>
                  </div>
                </div>
              </div>
              <Badge variant="outline">Optional</Badge>
            </div>
            <div className="ml-6 text-xs text-muted-foreground">
              Integration with job boards, social platforms, and educational services to enhance your experience.
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleSavePreferences} className="w-full md:w-auto">
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Rights */}
      <Card>
        <CardHeader>
          <CardTitle>Your Data Rights</CardTitle>
          <CardDescription>Understand and exercise your data protection rights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Right to Access</h4>
              </div>
              <p className="text-sm text-muted-foreground">Request a copy of all personal data we hold about you</p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Right to Rectification</h4>
              </div>
              <p className="text-sm text-muted-foreground">Correct any inaccurate or incomplete personal data</p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Right to Erasure</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Request deletion of your personal data under certain conditions
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <h4 className="font-medium">Right to Portability</h4>
              </div>
              <p className="text-sm text-muted-foreground">Export your data in a structured, machine-readable format</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Need Help?</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  If you have questions about your privacy rights or want to exercise any of these rights, please
                  contact our Data Protection Officer at privacy@y4d.org
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
