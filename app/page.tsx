'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { FiUpload, FiDownload, FiX, FiCopy } from 'react-icons/fi';
import Header from '@/components/Header';
import Image from 'next/image';

type FileInfo = {
  type: string;
  modified: string;
  dimensions?: string;
};

export default function ReduceSize() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [targetKB, setTargetKB] = useState<number | null>(null);
  const [targetPercent, setTargetPercent] = useState<number | null>(null);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [reducedSize, setReducedSize] = useState<number | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  const processFile = (selected: File) => {
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setOriginalSize(parseFloat((selected.size / 1024).toFixed(2)));
    setReducedSize(null);
    setDownloadUrl(null);
    setTargetKB(null);
    setTargetPercent(null);

    const info: FileInfo = {
      type: selected.type,
      modified: new Date(selected.lastModified).toLocaleString(),
    };

    if (selected.type.startsWith('image/')) {
      const img = new window.Image();
      img.onload = () => {
        info.dimensions = `${img.width}x${img.height}`;
        setFileInfo(info);
      };
      img.src = URL.createObjectURL(selected);
    } else {
      setFileInfo(info);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) processFile(dropped);
  };

  const handleUpload = async () => {
    if (!file || (!targetKB && !targetPercent)) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    if (targetKB) formData.append('target_kb', targetKB.toString());
    if (targetPercent) formData.append('target_percent', targetPercent.toString());

    try {
      const res = await axios.post<Blob>('http://13.60.75.17/reduce-image', formData, {
        responseType: 'blob',
      });

      setDownloadUrl(URL.createObjectURL(res.data));

      const original = res.headers['x-original-size-kb'];
      const reduced = res.headers['x-reduced-size-kb'];

      setOriginalSize(original ? parseFloat(original) : originalSize);
      setReducedSize(reduced ? parseFloat(reduced) : null);
    } catch (err) {
      console.error('Error reducing image:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setTargetKB(null);
    setTargetPercent(null);
    setReducedSize(null);
    setDownloadUrl(null);
    setFileInfo(null);
    setOriginalSize(null);
  };

  const copyReducedSize = () => {
    if (reducedSize) {
      navigator.clipboard.writeText(reducedSize.toString()).catch(() => {
        console.warn('Clipboard copy failed');
      });
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />

      <section className="flex flex-col items-center justify-center flex-1 py-12 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Resize an Image
        </h2>

        {/* Upload / DragDrop */}
        {!file && (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`w-full max-w-xl border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-12 cursor-pointer transition ${
              dragOver ? 'border-green-500 bg-green-50' : 'border-blue-600 hover:bg-blue-50'
            }`}
          >
            <FiUpload className="text-blue-600 mb-4 h-12 w-12" />
            <p className="text-gray-700 mb-2 text-center">
              Drop your images here or{' '}
              <span className="text-blue-600 underline">browse</span>
            </p>
            <label className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
              Select Image
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        )}

        {/* File Info */}
        {file && fileInfo && (
          <div className="mt-4 text-sm text-gray-700 space-y-1 text-center">
            <p>Type: {fileInfo.type}</p>
            {fileInfo.dimensions && <p>Dimensions: {fileInfo.dimensions}</p>}
            <p>Last Modified: {fileInfo.modified}</p>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="mt-4 w-full max-w-xl border rounded-lg p-4 shadow flex justify-center items-center bg-white">
            <Image
              src={preview}
              alt="Preview"
              width={256}
              height={256}
              className="w-48 md:w-64 h-48 md:h-64 object-contain rounded-lg border"
            />
          </div>
        )}

        {/* Target Inputs */}
        {file && (
          <div className="flex flex-col items-center mt-6 w-full max-w-xl gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-black font-semibold">Preset Target Size (KB)</label>
              <select
                value={targetKB ?? ''}
                onChange={(e) => setTargetKB(Number(e.target.value))}
                disabled={!!targetPercent}
                className={`w-full px-3 py-2 border rounded-lg text-black ${
                  targetPercent ? 'bg-gray-100 cursor-not-allowed' : ''
                }`}
              >
                <option value="">Select KB</option>
                <option value={100}>100 KB</option>
                <option value={200}>200 KB</option>
                <option value={300}>300 KB</option>
                <option value={500}>500 KB</option>
              </select>
            </div>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-black font-semibold">Manual Target Size (KB)</label>
                <input
                  type="number"
                  placeholder="Enter KB"
                  value={targetKB ?? ''}
                  onChange={(e) => setTargetKB(Number(e.target.value))}
                  disabled={!!targetPercent}
                  className={`w-full px-3 py-2 border rounded-lg text-black ${
                    targetPercent ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  min={1}
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-black font-semibold">Reduce by %</label>
                <input
                  type="number"
                  placeholder="Enter %"
                  value={targetPercent ?? ''}
                  onChange={(e) => setTargetPercent(Number(e.target.value))}
                  disabled={!!targetKB}
                  className={`w-full px-3 py-2 border rounded-lg text-black ${
                    targetKB ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  min={1}
                  max={100}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <button
                onClick={handleUpload}
                disabled={loading || (!targetKB && !targetPercent)}
                className={`flex-1 py-3 rounded-lg font-semibold text-white transition ${
                  loading || (!targetKB && !targetPercent)
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? 'Processing...' : 'Reduce & Download'}
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-lg font-semibold text-white bg-gray-500 hover:bg-gray-600 transition flex justify-center items-center gap-2"
              >
                <FiX /> Reset
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {originalSize && reducedSize && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 w-full max-w-xl">
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold text-gray-800">Original Size</p>
              <span className="text-gray-700">{originalSize} KB</span>
              {preview && (
                <Image
                  src={preview}
                  alt="Original"
                  width={192}
                  height={192}
                  className="w-36 md:w-48 h-36 md:h-48 object-contain rounded-lg shadow border mt-2"
                />
              )}
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold text-gray-800">Reduced Size</p>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">{reducedSize} KB</span>
                <button
                  onClick={copyReducedSize}
                  className="text-gray-500 hover:text-gray-800"
                  aria-label="Copy reduced size"
                >
                  <FiCopy />
                </button>
              </div>
              {downloadUrl && (
                <Image
                  src={downloadUrl}
                  alt="Reduced"
                  width={192}
                  height={192}
                  className="w-36 md:w-48 h-36 md:h-48 object-contain rounded-lg shadow border mt-2"
                />
              )}
            </div>
          </div>
        )}

        {/* Download */}
        {downloadUrl && (
          <div className="flex flex-col items-center mt-6">
            {originalSize && reducedSize && (
              <h1 className="mb-4 text-xl md:text-3xl font-extrabold text-gray-900 text-center">
                Reduced from{' '}
                <span className="text-red-500">{originalSize} KB</span> to{' '}
                <span className="text-green-600">{reducedSize} KB</span>
              </h1>
            )}
            <a
              href={downloadUrl}
              download={`reduced_${file?.name}`}
              className="bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl font-bold rounded-xl shadow-lg hover:bg-green-600 transition flex items-center gap-2"
            >
              <FiDownload className="w-6 h-6" /> Download Reduced Image
            </a>
          </div>
        )}
      </section>

      <footer className="text-center py-6 bg-white shadow-inner text-gray-600">
        &copy; 2025 ReduceSize
      </footer>
    </main>
  );
}
