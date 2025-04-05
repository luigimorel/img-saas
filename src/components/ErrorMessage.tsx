"use client";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="p-4 bg-red-50 text-red-700 rounded-lg">
      {message}
    </div>
  );
} 