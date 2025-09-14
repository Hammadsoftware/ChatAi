"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamic imports to avoid SSR
const Document = dynamic(() => import("react-pdf").then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import("react-pdf").then(mod => mod.Page), { ssr: false });

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewerClient() {
  const { user, isLoaded } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [ragResult, setRagResult] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  if (!isLoaded) return <div>Loading user...</div>;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setPdfUrl(null);
    setRagResult("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF file!");
    if (!user) return alert("User not loaded from Clerk!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", user.id);

    try {
      const res = await axios.post("http://localhost:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = res.data;

      if (data.file_path) setPdfUrl(`http://localhost:8000/${data.file_path}`);
      setRagResult(data.rag_result || "No RAG result returned");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload PDF</h2>
      <p className="mb-2">
        Logged in as: <span className="font-semibold">{user.fullName || user.id}</span>
      </p>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="ml-2 bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {ragResult && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          <h3 className="font-semibold mb-1">RAG Result:</h3>
          <p>{ragResult}</p>
        </div>
      )}

      {pdfUrl && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">PDF Preview:</h3>
          <div className="border p-2 overflow-auto">
            <Document file={pdfUrl}>
              <Page pageNumber={1} width={600} />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
}
