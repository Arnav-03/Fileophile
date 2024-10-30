'use client'

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { app } from "@/FirebaseConfig"
import { useFileContext } from "@/context/fileContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Image,
  Music,
  FileText,
  Video,
 Package,
  Presentation,
   FileSpreadsheet, 
   File
} from "lucide-react"

interface FileDocument {
  fileName: string
  fileSize: number
  fileType: string
  fileUrl: string
  shortUrl: string
}

const getFileIcon = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase()
  switch (extension) {
    case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <Image className="w-6 h-6 text-blue-500" />;
      case "mp3":
      case "wav":
      case "m4a":
        return <Music className="w-6 h-6 text-purple-500" />;
      case "pdf":
        return <FileText className="w-6 h-6 text-red-500" />;
      case "mp4":
      case "mkv":
        return <Video className="w-6 h-6 text-green-500" />;
      case "apk":
        return <Package className="w-6 h-6 text-orange-500" />;
      case "ppt":
      case "pptx":
        return <Presentation className="w-6 h-6 text-amber-500" />;
      case "txt":
        return <FileText className="w-6 h-6 text-gray-500" />;
      case "xlsx":
      case "xls":
      case "csv":
        return <FileSpreadsheet className="w-6 h-6 text-emerald-500" />;
      case "doc":
      case "docx":
        return <FileText className="w-6 h-6 text-blue-600" />;
      default:
        return <File className="w-6 h-6 text-gray-400" />;
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  } else {
    return (bytes / 1024).toFixed(2) + " KB"
  }
}

export default function Page() {
  const searchParams = useSearchParams()
  const [user, setUser] = useState<string>("")
  const [folder, setFolder] = useState<string>("")
  const [documents, setDocuments] = useState<FileDocument[]>([])
  const [loading, setLoading] = useState(true)
  const { files, removeFile } = useFileContext()
  const db = getFirestore(app)

  useEffect(() => {
    const userParam = searchParams.get('user')
    const folderParam = searchParams.get('folder')

    if (userParam) setUser(userParam)
    if (folderParam) setFolder(folderParam)
  }, [searchParams])

  useEffect(() => {
    if (user && folder) {
      getDocumentsFromFirebase()
    }
  }, [user, folder])

  const getDocumentsFromFirebase = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(
        collection(db, "fileophile", user, folder)
      )
      const documentsData: FileDocument[] = querySnapshot.docs.map(doc => ({
        fileName: doc.data().fileName,
        fileSize: doc.data().fileSize,
        fileType: doc.data().fileType,
        fileUrl: doc.data().fileUrl,
        shortUrl: doc.data().shortUrl,
      }))
      setDocuments(documentsData)
    } catch (error) {
      console.error("Error fetching documents:", error)
    } finally {
      setLoading(false)
    }
  }
  const truncateFilename = (filename: string, maxLength = 23) => {
  if (filename.length > maxLength) {
    return filename.slice(0, maxLength - 3) + "...";
  }
  return filename;
};

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Files Shared
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8">No files shared yet.</div>
        ) : (
          <ScrollArea className="h-fit w-full rounded-md border">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px] sm:w-[50px] md:w-[70px] lg:w-[70px]">
                    Type
                  </TableHead>
                  <TableHead className="sm:pl-4 md:pl-6 lg:pl-6">
                    File Name
                  </TableHead>
                  <TableHead className="hidden sm:table-cell sm:w-[100px] md:w-[120px] lg:w-[120px]">
                    Size
                  </TableHead>
                  <TableHead className="text-right sm:w-[80px] md:w-[100px] lg:w-[100px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.fileName}>
                    <TableCell className="sm:pl-0">
                      {getFileIcon(doc.fileName)}
                    </TableCell>
                    <TableCell className="font-medium sm:pl-4 md:pl-6 lg:pl-6">
                      {truncateFilename(doc.fileName)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {formatFileSize(doc.fileSize)}
                    </TableCell>
                    <TableCell className="text-right sm:pr-0">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open File
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}