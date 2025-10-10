'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import { useRef } from "react";

export interface CSVUploaderProps {
  className?: string;
  onFileSelect?: (file: File) => void;
  onDownloadTemplate?: () => void;
  onCancel?: () => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent) => void;
  onClick?: () => void;
  accept?: string;
  maxSize?: number; // in bytes
  disabled?: boolean;
  // Pure presentational state - all controlled by parent
  isDragOver?: boolean;
  selectedFileName?: string;
  error?: string;
}

export function CSVUploader({
  className,
  onFileSelect,
  onDownloadTemplate,
  onCancel,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  accept = ".csv",
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  isDragOver = false,
  selectedFileName,
  error,
}: CSVUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Card className={cn("max-w-md w-full mx-auto", className)}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          {/* File Drop Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all",
              "hover:bg-gray-50 hover:border-gray-400 dark:hover:bg-gray-800 dark:hover:border-gray-500",
              "border-gray-300 dark:border-gray-600",
              isDragOver && "border-blue-500 bg-blue-50 dark:bg-blue-950 dark:border-blue-400",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-400"
            )}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-label="Upload CSV file by clicking or dragging and dropping"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={disabled}
              aria-hidden="true"
            />
            
            <div className="flex flex-col items-center gap-4">
              <Upload 
                className={cn(
                  "h-12 w-12",
                  isDragOver ? "text-blue-500 dark:text-blue-400" : "text-gray-400 dark:text-gray-500",
                  error && "text-red-500 dark:text-red-400"
                )} 
              />
              
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Select a CSV file to upload
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  or drag and drop it here
                </p>
                
                {selectedFileName && (
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Selected: {selectedFileName}
                  </p>
                )}
                
                {error && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={onDownloadTemplate}
              disabled={disabled}
            >
              Download Template
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={onCancel}
              disabled={disabled}
            >
              Cancel
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}