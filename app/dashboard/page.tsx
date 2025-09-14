'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosProgressEvent, AxiosError } from 'axios';

interface AxiosErrorResponse {
  message?: string;
}

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  // Upload file to FastAPI
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setStatusText('Uploading...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://13.60.75.17/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e: AxiosProgressEvent) => {
          const loaded = e.loaded ?? 0;
          const total = e.total ?? 0;
          if (total > 0) {
            const percent = Math.round((loaded * 100) / total);
            setProgress(percent);
          }
        },
      });

      setStatusText('Upload complete!');
      setTimeout(() => {
        router.push('/chatui'); // Redirect after upload
      }, 500);
    } catch (err) {
      const error = err as AxiosError<AxiosErrorResponse>;
      console.error(error);
      setStatusText(error.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // Handle file input selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  // Handle drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div
        className="border-2 border-dashed border-gray-600 rounded-lg p-8 cursor-pointer w-80 flex flex-col items-center hover:border-green-500 transition"
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-gray-400 text-6xl mb-4">📁</p>
        <p className="text-center mb-4">Click to upload or drag & drop a file</p>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {uploading && (
          <div className="mt-4 w-full h-2 bg-gray-800 rounded">
            <div
              className="h-full bg-green-500 rounded transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {statusText && <p className="mt-2 text-center">{statusText}</p>}
      </div>
    </div>
  );
}
