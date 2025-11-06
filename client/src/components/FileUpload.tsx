import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FaFolder } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";

type FileUploadProps = {
  onFileUpload?: (fileData: FileData) => void;
}

export interface FileData {
  name: string;
  type: string;
  size: number;
  data: string;
}



function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
      // console.log('seleceted file works!')
    }
    else {
      // console.log('seleceted file does not work')
      setIsDragging(false);
    }
  };

  const processFile = (uploadedFile: File) => {

    if (!uploadedFile) {
      console.log('seleceted file does not work')
      setIsDragging(false);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData: FileData = {
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
        data: e.target?.result as string,
      };

      if (onFileUpload) {
        onFileUpload(fileData);
      }

      navigate('/viewer', { state: { file: fileData } });
    };

    reader.readAsDataURL(uploadedFile);
  };

  const handleFileDialog = () => {
    setIsDragging(true);

    const handleFocus = () => {
      setTimeout(() => {
        if (!fileInputRef.current?.files?.length) {
          setIsDragging(false);
        }
        window.removeEventListener('focus', handleFocus);
      }, 200);
    };

    window.addEventListener('focus', handleFocus);
    fileInputRef.current?.click();
  };

  return (
    <div className='w-30 h-30'>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick= {handleFileDialog}
        className='cursor-pointer'
        >
        <input
          ref={fileInputRef}
          type='file'
          onChange={handleFileInput}
          className='hidden'
          accept='*/*'
        />

        <div className='flex flex-col items-center'>
          <div>
            {isDragging ? <FaFolderOpen size={100} className='stroke-10 stroke-gray-300 dark:fill-white fill-[#dfeaeb] dark:stroke-0'/> : <FaFolder size={100} className= 'stroke-10 stroke-gray-300 dark:fill-white fill-[#dfeaeb] hover:scale-125 transition-transform duration-300 dark:stroke-0'/>}
          </div>
        </div>

      </div>

    </div>
  );
}

export default FileUpload;