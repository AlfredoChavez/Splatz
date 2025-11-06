import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FaFolder } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";

interface FileUploadProps {
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
    }
  };

  const processFile = (uploadedFile: File) => {

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

  return (
    <div className='w-30 h-30'>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          setIsDragging(true);
          fileInputRef.current?.click()}}
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
            {isDragging ? <FaFolderOpen size={100} className='fill-white'/> : <FaFolder size={100} className= 'fill-white hover:scale-125 transition-transform duration-300'/>}
          </div>
        </div>

      </div>

    </div>
  );
}

export default FileUpload;