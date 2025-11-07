import React, { useState, useRef, useEffect } from 'react';

interface FolderProps {
  color?: string;
  size?: number;
  className?: string;
  onFileUpload?: (file: File) => void;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  const r = Math.max(0, Math.min(255, Math.floor(((num >> 16) & 0xff) * (1 - percent))));
  const g = Math.max(0, Math.min(255, Math.floor(((num >> 8) & 0xff) * (1 - percent))));
  const b = Math.max(0, Math.min(255, Math.floor((num & 0xff) * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({
  color = '#5227FF',
  size = 1,
  className = '',
  onFileUpload,
}) => {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);

  const maxItems = 3;
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })),
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const pickerActiveRef = useRef(false);
  const cancelCheckTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const processFile = (file: File) => {
    onFileUpload?.(file);
    setOpen(false);
    setIsDragging(false);
    pickerActiveRef.current = false;
    setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (cancelCheckTimeout.current) {
      clearTimeout(cancelCheckTimeout.current);
      cancelCheckTimeout.current = null;
    }

    if (file) {
      processFile(file);
      //* Reset input value after processing to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      //* user canceled - reset state
      setOpen(false);
      setIsDragging(false);
      pickerActiveRef.current = false;
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      //* Reset input value
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    //* Stop event propagation to prevent parent click handlers from firing
    e.stopPropagation();

    //* Prevent multiple simultaneous triggers
    if (pickerActiveRef.current) return;
    pickerActiveRef.current = true;
    setOpen(true);

    //* Reset the input value to ensure onChange fires even if same file is selected
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    //* open picker
    fileInputRef.current?.click();

    //* Schedule a cancel check after picker closes (if user cancels)
    //* This avoids using unreliable focus events.
    if (cancelCheckTimeout.current) clearTimeout(cancelCheckTimeout.current);
    cancelCheckTimeout.current = setTimeout(() => {
      if (pickerActiveRef.current && !fileInputRef.current?.files?.length) {
        setOpen(false);
        setIsDragging(false);
        pickerActiveRef.current = false;
        setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
        // Reset input value after cancel
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }, 700);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setOpen(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setOpen(false);
    setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setOpen(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    } else {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      //* Don't close if picker is active (user might be interacting with file picker dialog)
      if (pickerActiveRef.current) return;

      if (folderRef.current && !folderRef.current.contains(e.target as Node)) {
        setOpen(false);
        setIsDragging(false);
        setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!open && !isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const getOpenTransform = (index: number) => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  return (
    <div
      ref={folderRef}
      className={`relative cursor-pointer transition-transform duration-300 ease-in-out ${className}`}
      style={{ transform: `scale(${size})` }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
        accept="*/*"
      />

      <div
        className="relative w-[100px] h-20 rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] transition-all duration-300"
        style={{
          backgroundColor: folderBackColor,
          transform: open || isDragging ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: isDragging ? '0 0 12px rgba(82,39,255,0.4)' : 'none',
        }}
      >
        <span
          className="absolute z-0 bottom-[98%] left-0 w-[30px] h-2.5 rounded-tl-[5px] rounded-tr-[5px]"
          style={{ backgroundColor: folderBackColor }}
        />

        {Array.from({ length: maxItems }).map((_, i) => {
          let sizeClasses = '';
          const isOpen = open || isDragging;
          if (i === 0) sizeClasses = 'w-[70%] h-[80%]';
          if (i === 1) sizeClasses = isOpen ? 'w-[80%] h-[80%]' : 'w-[80%] h-[70%]';
          if (i === 2) sizeClasses = isOpen ? 'w-[90%] h-[80%]' : 'w-[90%] h-[60%]';
          const transformStyle = isOpen
            ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
            : undefined;

          return (
            <div
              key={i}
              onMouseMove={e => handlePaperMouseMove(e, i)}
              onMouseLeave={e => handlePaperMouseLeave(e, i)}
              className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                !isOpen ? 'transform -translate-x-1/2 translate-y-[10%]' : 'hover:scale-110'
              } ${sizeClasses}`}
              style={{
                ...(!isOpen ? {} : { transform: transformStyle }),
                backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                borderRadius: '10px',
              }}
            />
          );
        })}

        <div
          className="absolute z-30 w-full h-full origin-bottom transition-transform duration-300 ease-in-out"
          style={{
            backgroundColor: color,
            borderRadius: '5px 10px 10px 10px',
            transform: open || isDragging ? 'skew(15deg) scaleY(0.6)' : 'none',
          }}
        />
        <div
          className="absolute z-30 w-full h-full origin-bottom transition-transform duration-300 ease-in-out"
          style={{
            backgroundColor: color,
            borderRadius: '5px 10px 10px 10px',
            transform: open || isDragging ? 'skew(-15deg) scaleY(0.6)' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default Folder;
