import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface FileWithId {
  id: string;
  file: File;
}

interface FileContextProps {
  files: FileWithId[];
  addFile: (file: File) => void;
  removeFile: (id: string) => void;
}

const FileContext = createContext<FileContextProps | undefined>(undefined);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<FileWithId[]>([]);

  const addFile = (file: File) => {
    const fileWithId: FileWithId = { id: uuidv4(), file };
    setFiles((prevFiles) => [...prevFiles, fileWithId]);
  };

  const removeFile = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  useEffect(() => {
    console.log("files updated", files);
  }, [files]);

  return (
    <FileContext.Provider value={{ files, addFile, removeFile }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};
