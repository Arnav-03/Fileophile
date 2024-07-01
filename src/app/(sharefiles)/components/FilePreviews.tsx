import React, { useContext } from 'react'
import { useFileContext } from '@/context/fileContext'
function FilePreviews() {
    const { files,addFile } = useFileContext();
    return (
    <div>
       {files.map(({ id, file }) => (
          <li key={id}>
            {file.name} and {id}
          </li>
        ))}
    </div>
  )
}

export default FilePreviews
