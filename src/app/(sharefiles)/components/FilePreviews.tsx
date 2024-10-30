import React from "react";
import { useFileContext } from "@/context/fileContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, File, Image, Music, FileText, Video, Package, Presentation, FileSpreadsheet } from "lucide-react";

const FilePreviews = () => {
  const { files, removeFile } = useFileContext();

  const getFileIcon = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    
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
  };

  return (
    <Card className="w-full bg-white/90  w-4/5 mt-8">
      <CardHeader className="border-b border-black/30">
        <CardTitle className="text-2xl font-semibold tracking-wide text-center">
          Files
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-fit max-h-[375px] w-full">
          {files.length > 0 ? (
            <ul className="divide-y">
              {files.map(({ id, file }) => {
                const trimmedName =
                  file.name.length > 26
                    ? `${file.name.slice(0, 23)}...`
                    : file.name;
                return (
                  <li
                    key={id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors my-1"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.name)}
                      <span className="text-sm font-medium">{trimmedName}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(id)}
                      className="text-gray-700 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <File className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-lg font-medium text-gray-500">
                No files added yet
              </p>
              <p className="text-sm text-gray-400">
                Upload files to see them here
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FilePreviews;