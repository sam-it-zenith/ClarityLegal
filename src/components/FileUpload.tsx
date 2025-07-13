'use client';
import React, { useRef, useState } from "react";

// Utility to dynamically load the mammoth.browser.js script from CDN
function loadMammothBrowser(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && (window as any).mammoth) return resolve((window as any).mammoth);
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/mammoth@1.5.0/dist/mammoth.browser.min.js';
    script.onload = () => resolve((window as any).mammoth);
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// AI-style error message for unsupported files
function aiErrorMessage(fileName: string) {
  return `🚫 Oops! "${fileName}" is not a supported document type. Please upload a PDF, DOCX, or TXT file so I can help you understand it!`;
}

async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === "application/pdf") {
    const pdfjsLib = await import("pdfjs-dist");
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc =
      `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjsLib as any).version}/pdf.worker.js`;
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await (pdfjsLib as any).getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: { str: string }) => item.str).join(" ") + "\n";
    }
    return text;
  } else if (
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.endsWith(".docx")
  ) {
    const mammoth = await loadMammothBrowser();
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.convertToHtml({ arrayBuffer });
    return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  } else if (file.type === "text/plain" || file.name.endsWith(".txt")) {
    return await file.text();
  } else {
    throw new Error(aiErrorMessage(file.name));
  }
}

interface FileUploadProps {
  onExtractedText: (text: string) => void;
  onError?: (error: string | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onExtractedText, onError }) => {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    setError(null);
    onError?.(null); // Clear parent error state
    setPreview("");
    setIsProcessing(true);
    
    if (!files || files.length === 0) {
      setIsProcessing(false);
      return;
    }
    
    const file = files[0];
    try {
      const text = await extractTextFromFile(file);
      setPreview(text.slice(0, 1200) + (text.length > 1200 ? "..." : ""));
      onExtractedText(text);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("😕 Sorry, something went wrong while reading your file. Please try again or use a different document.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Upload Your Document
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Drag and drop your legal document here, or click to browse. We support PDF, DOCX, and TXT files.
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative w-full rounded-3xl p-12 sm:p-16 flex flex-col items-center justify-center border-2 border-dashed transition-all duration-500 shadow-soft hover:shadow-large bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 ${
            dragActive 
              ? 'border-blue-500 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-blue-900 dark:via-slate-700 dark:to-blue-900 scale-105 shadow-large' 
              : 'border-slate-300 dark:border-slate-600'
          } ${isProcessing ? 'pointer-events-none opacity-75' : ''}`}
          onDragOver={e => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={e => {
            e.preventDefault();
            setDragActive(false);
          }}
          onDrop={onDrop}
          onClick={() => !isProcessing && inputRef.current?.click()}
          style={{ cursor: isProcessing ? 'not-allowed' : 'pointer' }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={onChange}
            disabled={isProcessing}
          />

          {/* Processing overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Processing your document...</p>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center gap-6 text-center">
            {/* Icon */}
            <div className={`relative ${isProcessing ? 'animate-pulse' : ''}`}>
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-large">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              {dragActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl animate-pulse"></div>
              )}
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-200">
                {dragActive ? 'Drop your file here' : 'Drag & Drop or Click to Upload'}
              </h3>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
                PDF, DOCX, or TXT files (max 10MB)
              </p>
            </div>

            {/* Supported formats */}
            <div className="flex flex-wrap gap-2 justify-center">
              {['PDF', 'DOCX', 'TXT'].map((format) => (
                <span key={format} className="px-3 py-1 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-600/50">
                  {format}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 w-full max-w-4xl mx-auto animate-fade-in">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">Upload Error</h4>
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Preview */}
        {preview && (
          <div className="mt-8 w-full max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-soft border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Document Preview</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">First 1200 characters of your document</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 max-h-80 overflow-y-auto font-mono bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                  {preview}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload; 