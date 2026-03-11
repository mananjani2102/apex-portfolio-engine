import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudArrowUpIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import { parseResumePDF } from '../../utils/resumeParser';

export default function ResumeUploadTab() {
  const { dispatch } = useApp();
  const [uploadState, setUploadState] = useState('idle');
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };

  const handleFile = async (file) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setError(null);
    setUploadState('uploading');
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    try {
      const result = await parseResumePDF(file);
      clearInterval(progressInterval);
      setProgress(100);
      setUploadState('parsed');
      setParsedData(result);

      dispatch({
        type: 'PARSING_COMPLETE',
        payload: result
      });

      setTimeout(() => {
        setUploadState('complete');
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadState('error');
      setError(err.message);
    }
  };

  const handleAccept = () => {
    if (parsedData) {
      dispatch({ type: 'ACCEPT_PARSED_DATA' });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Resume data imported successfully!', type: 'success' }
      });
    }
  };

  const handleRetry = () => {
    setUploadState('idle');
    setProgress(0);
    setError(null);
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <AnimatePresence mode="wait">
        {uploadState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              dragActive
                ? 'border-primary-500 bg-primary-500/5'
                : 'border-white/10 bg-white/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="hidden"
            />

            <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />

            <h3 className="text-xl font-semibold text-white mb-2">
              Upload Your Resume
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Drag and drop your PDF resume here, or click to browse. We'll automatically extract your information.
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow"
            >
              Choose File
            </button>

            <p className="text-xs text-gray-500 mt-4">
              PDF only, max 10MB
            </p>
          </motion.div>
        )}

        {uploadState === 'uploading' && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <DocumentTextIcon className="w-10 h-10 text-primary-500" />
              <div className="flex-1">
                <p className="text-white font-medium">Processing your resume...</p>
                <p className="text-sm text-gray-400">Extracting information</p>
              </div>
            </div>

            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {uploadState === 'complete' && parsedData && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-4"
          >
            <div className="glass rounded-2xl p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Resume Parsed Successfully!</h3>
                  <p className="text-sm text-gray-400">
                    Confidence: {Math.round(parsedData.confidence * 100)}%
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {parsedData.personalInfo?.name && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm min-w-24">Name:</span>
                    <span className="text-white text-sm">{parsedData.personalInfo.name}</span>
                  </div>
                )}
                {parsedData.personalInfo?.email && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm min-w-24">Email:</span>
                    <span className="text-white text-sm">{parsedData.personalInfo.email}</span>
                  </div>
                )}
                {parsedData.experience?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm min-w-24">Experience:</span>
                    <span className="text-white text-sm">{parsedData.experience.length} positions found</span>
                  </div>
                )}
                {parsedData.education?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm min-w-24">Education:</span>
                    <span className="text-white text-sm">{parsedData.education.length} degrees found</span>
                  </div>
                )}
                {parsedData.skills?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 text-sm min-w-24">Skills:</span>
                    <span className="text-white text-sm">{parsedData.skills.length} skills detected</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow"
                >
                  Accept & Continue
                </button>
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 glass border border-white/10 text-white rounded-lg hover:border-white/20 transition-colors"
                >
                  Try Another
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {uploadState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-2xl p-8 border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <XCircleIcon className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-white">Upload Failed</h3>
                <p className="text-sm text-gray-400">{error || 'An error occurred'}</p>
              </div>
            </div>

            <button
              onClick={handleRetry}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center">
        <button
          onClick={() => dispatch({ type: 'SET_BUILDER_TAB', payload: 'manual' })}
          className="text-primary-400 hover:text-primary-300 text-sm transition-colors"
        >
          Or enter information manually →
        </button>
      </div>
    </div>
  );
}
