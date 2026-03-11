import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { 
  Upload, 
  Camera, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  File,
  X,
  Check,
  Eye,
  Trash2,
  FolderOpen,
  Download
} from 'lucide-react';

interface FileUploadProps {
  assignmentId: string;
  onFileUpload: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  onFileDelete: (fileId: string) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'other';
  size: string;
  uploadDate: string;
  thumbnail?: string;
}

const mockFiles = [
  { id: '1', name: 'Assignment_Report.pdf', type: 'document', size: '2.4 MB', folder: 'Documents' },
  { id: '2', name: 'Lab_Results.docx', type: 'document', size: '1.8 MB', folder: 'Documents' },
  { id: '3', name: 'Project_Code.zip', type: 'other', size: '5.2 MB', folder: 'Downloads' },
  { id: '4', name: 'Screenshot_2024.png', type: 'image', size: '892 KB', folder: 'Pictures' },
  { id: '5', name: 'Notes_Audio.mp3', type: 'audio', size: '3.1 MB', folder: 'Music' },
];

export function FileUpload({ assignmentId, onFileUpload, uploadedFiles, onFileDelete }: FileUploadProps) {
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-700 border-green-300';
      case 'document': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'video': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'audio': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const simulateFileUpload = (files: File[]) => {
    setIsUploading(true);
    
    files.forEach((file, index) => {
      const fileId = `${Date.now()}_${index}`;
      let progress = 0;
      
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Add to uploaded files
          const uploadedFile: UploadedFile = {
            id: fileId,
            name: file.name,
            type: file.type.startsWith('image/') ? 'image' : 
                  file.type.includes('pdf') || file.type.includes('document') ? 'document' :
                  file.type.startsWith('video/') ? 'video' :
                  file.type.startsWith('audio/') ? 'audio' : 'other',
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            uploadDate: new Date().toLocaleDateString(),
            thumbnail: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
          };
          
          onFileUpload([...uploadedFiles, uploadedFile]);
          toast.success(`${file.name} uploaded successfully ✅`);
          
          // Remove progress after completion
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          }, 1000);
        }
        
        setUploadProgress(prev => ({
          ...prev,
          [fileId]: Math.min(progress, 100)
        }));
      }, 100);
    });
    
    setTimeout(() => setIsUploading(false), 2000);
  };

  const handleFileSelect = (selectedFiles: any[]) => {
    const files = selectedFiles.map(file => ({
      name: file.name,
      size: Math.random() * 5000000, // Random size
      type: file.type
    })) as File[];
    
    simulateFileUpload(files);
    setShowFileDialog(false);
  };

  const handleCameraCapture = () => {
    // Simulate camera capture
    toast.loading('Taking photo...', { id: 'camera-capture' });
    
    setTimeout(() => {
      const capturedFile: UploadedFile = {
        id: `camera_${Date.now()}`,
        name: `Photo_${new Date().toISOString().split('T')[0]}.jpg`,
        type: 'image',
        size: '2.1 MB',
        uploadDate: new Date().toLocaleDateString(),
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop'
      };
      
      onFileUpload([...uploadedFiles, capturedFile]);
      toast.success('Photo captured and uploaded successfully! 📸', { id: 'camera-capture' });
      setShowCameraDialog(false);
    }, 2000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      simulateFileUpload(files);
      toast.success(`Dropped ${files.length} file(s) for upload`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => setShowFileDialog(true)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
          disabled={isUploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload File
        </Button>
        
        <Button
          onClick={() => setShowCameraDialog(true)}
          variant="outline"
          className="flex-1 border-orange-300 text-orange-600 hover:bg-orange-50"
          disabled={isUploading}
        >
          <Camera className="w-4 h-4 mr-2" />
          Camera
        </Button>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
          dragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-slate-300 hover:border-slate-400'
        }`}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
        <p className="text-sm text-slate-600">
          Drag and drop files here, or click upload button
        </p>
      </div>

      {/* Upload Progress */}
      <AnimatePresence>
        {Object.entries(uploadProgress).map(([fileId, progress]) => (
          <motion.div
            key={fileId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-slate-50 rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-700">Uploading...</span>
              <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-slate-800 flex items-center">
            <Check className="w-4 h-4 mr-2 text-green-600" />
            Uploaded Files ({uploadedFiles.length})
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all group"
              >
                {file.thumbnail ? (
                  <img 
                    src={file.thumbnail} 
                    alt={file.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileTypeColor(file.type)}`}>
                    {getFileIcon(file.type)}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">{file.name}</p>
                  <p className="text-sm text-slate-500">{file.size} • {file.uploadDate}</p>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {file.thumbnail && (
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      onFileDelete(file.id);
                      toast.success('File removed');
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* File Selection Dialog */}
      <Dialog open={showFileDialog} onOpenChange={setShowFileDialog}>
        <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FolderOpen className="w-5 h-5 mr-2" />
              Select Files
            </DialogTitle>
            <DialogDescription>
              Choose files from your device to upload to this assignment.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto">
              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => handleFileSelect([file])}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileTypeColor(file.type)}`}>
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{file.name}</p>
                    <p className="text-sm text-slate-500">{file.size} • {file.folder}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowFileDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Browse Device
              </Button>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) {
                simulateFileUpload(Array.from(e.target.files));
                setShowFileDialog(false);
              }
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Camera Dialog */}
      <Dialog open={showCameraDialog} onOpenChange={setShowCameraDialog}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Camera Options
            </DialogTitle>
            <DialogDescription>
              Take a new photo or choose from your gallery to upload.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-slate-100 rounded-xl p-6 text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 mb-4">Choose how to add photos</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={handleCameraCapture}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
              
              <Button 
                variant="outline"
                onClick={handleCameraCapture}
                className="border-purple-300 text-purple-600 hover:bg-purple-50"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Choose from Gallery
              </Button>
            </div>
            
            <Button variant="outline" onClick={() => setShowCameraDialog(false)} className="w-full">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}