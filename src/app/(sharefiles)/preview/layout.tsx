'use client'

import React, { ReactNode, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { FileProvider } from "@/context/fileContext"
import { useUserContext } from "@/context/userContext"
import Navigation from "@/components/Navigation"
import Loading from "@/app/loading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCopy, Check } from "lucide-react"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps = { children: null }) {
  const { user } = useUserContext()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState("")
  const [folder, setFolder] = useState("")
  const [copied, setCopied] = useState(false)

  const baseLink = process.env.NEXT_PUBLIC_BASE_URL
  const shareLink = `${baseLink}share?user=${userEmail}&folder=${folder}`

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    const userParam = searchParams.get("user")
    const folderParam = searchParams.get("folder")

    if (userParam) setUserEmail(userParam)
    if (folderParam) setFolder(folderParam)
  }, [searchParams])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-900 via-red-600 to-black">
      <Navigation />
      <main className="container mx-auto px-4 py-8 mt-16">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">File Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-4 text-gray-600 dark:text-gray-400">
              Copy the link below to share your files
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <Input
                value={shareLink}
                readOnly
                className="flex-grow"
                aria-label="Share link"
              />
              <Button onClick={handleCopyLink} variant="outline" size="icon">
                {copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
                <span className="sr-only">{copied ? "Copied" : "Copy link"}</span>
              </Button>
            </div>
            <FileProvider>
              <div className="mt-8">{children}</div>
            </FileProvider>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}