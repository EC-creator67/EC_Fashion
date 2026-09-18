import React, { useState } from 'react';
import axios from 'axios';

const SimpleImageTest = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const testSimpleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      console.log('Testing simple upload...');

      const response = await axios.post('/api/upload/simple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(response.data);
      console.log('Simple upload success:', response.data);
    } catch (error) {
      console.error('Simple upload error:', error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Simple Image Upload Test</h2>

      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        onClick={testSimpleUpload}
        disabled={!file || uploading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Test Simple Upload'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong>Success!</strong>
          <div className="mt-2">
            <img
              src={result.imageUrl}
              alt="Uploaded"
              className="max-w-full h-auto rounded"
            />
            <p className="text-sm mt-2">URL: {result.imageUrl}</p>
            <p className="text-sm">Public ID: {result.publicId}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleImageTest;
