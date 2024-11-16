import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export default function ImageUploader({ onImageUpload, isAnalyzing }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setPreviewUrl(URL.createObjectURL(file));
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false,
    disabled: isAnalyzing
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragActive 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400'
          }
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        {isAnalyzing ? (
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-12 h-12 text-purple-500 animate-spin" />
            <p className="text-lg text-gray-600">Analyzing your image...</p>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <p className="text-lg text-gray-600 mb-2">
              {isDragActive
                ? "Drop your cosmetic product image here"
                : "Drag & drop your cosmetic product image here"}
            </p>
            <p className="text-sm text-gray-500">
              or click to select a file
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: JPEG, PNG
            </p>
          </>
        )}
      </div>

      {previewUrl && !isAnalyzing && (
        <div className="rounded-lg overflow-hidden bg-white shadow-md">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="w-full h-64 object-contain"
          />
        </div>
      )}
    </div>
  );
}