"use client";

import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";

interface ImageUploaderProps {
  onFileSelect: (file: File, previewUrl: string) => void;
  previewUrl: string;
}

export default function ImageUploader({ onFileSelect, previewUrl }: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(file);
      onFileSelect(file, previewUrl);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
    >
      <input {...getInputProps()} />
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="max-h-64 mx-auto mb-4"
        />
      ) : (
        <div className="flex flex-col items-center">
          <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">
            Drag and drop an image here, or click to select
          </p>
        </div>
      )}
    </div>
  );
} 