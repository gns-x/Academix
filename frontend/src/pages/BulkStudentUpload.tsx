import React, { useState, useCallback } from 'react';
import { Upload, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';

interface UploadResult {
    successful: number;
    failed: number;
    errors: string[];
  }

export function BulkStudentUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<UploadResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile?.type === 'text/csv') {
        setFile(droppedFile);
        setError(null);
      } else {
        setError('Please upload a CSV file');
      }
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile?.type === 'text/csv') {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Please upload a CSV file');
      }
    }, []);

    const handleUpload = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      setUploading(true);
      setError(null);
      setResult(null);

      try {
        const response = await axios.post('http://localhost:3000/parents/bulk-upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResult(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to upload parents');
      } finally {
        setUploading(false);
      }
    };

    const downloadTemplate = () => {
      const template = 'Parent_First_Name,Parent_Last_Name,Parent_Email,Children_And_Grades\n';
      const blob = new Blob([template], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'parent-upload-template.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    };

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Bulk Parent Upload</h1>
            <p className="mt-2 text-gray-600">
              Upload a CSV file to create multiple parents at once.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Download the CSV template below</li>
              <li>Fill in the parent information following the template format</li>
              <li>Upload the completed CSV file</li>
              <li>Review the results after processing</li>
            </ol>
            <button
              onClick={downloadTemplate}
              className="mt-4 text-[#1ABC9C] hover:text-[#16a085] font-medium"
            >
              Download Template
            </button>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging
                ? 'border-[#1ABC9C] bg-[#1ABC9C]/5'
                : 'border-gray-300 hover:border-[#1ABC9C]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2">
                Drag and drop your CSV file here, or{' '}
                <label className="text-[#1ABC9C] hover:text-[#16a085] cursor-pointer">
                  browse
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                </label>
              </p>
              {file && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    Selected file: <span className="font-medium">{file.name}</span>
                  </p>
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className="mt-4 px-4 py-2 bg-[#1ABC9C] text-white rounded-lg hover:bg-[#16a085] disabled:opacity-50"
                  >
                    {uploading ? 'Uploading...' : 'Upload Parents'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-red-700">{error}</div>
            </div>
          )}

          {result && (
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Results</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                  <span>
                    Successfully created: <strong>{result.successful}</strong> parents
                  </span>
                </div>
                {result.failed > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <XCircle className="w-5 h-5 text-red-500 mr-3" />
                      <span>
                        Failed to create: <strong>{result.failed}</strong> parents
                      </span>
                    </div>
                    <div className="ml-8 mt-2">
                      <p className="text-sm font-medium text-gray-700 mb-2">Errors:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                        {result.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
