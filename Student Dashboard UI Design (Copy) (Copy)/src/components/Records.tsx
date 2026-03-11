import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { FileUpload } from './FileUpload';
import { VoiceSearch } from './VoiceSearch';
import { toast } from 'sonner@2.0.3';
import { 
  FileText, 
  Upload, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye,
  Download,
  Filter,
  Grid3X3,
  List,
  Search,
  Plus,
  Paperclip,
  User,
  BookOpen
} from 'lucide-react';

const assignments = [
  {
    id: 1,
    title: 'Database Normalization Assignment',
    subject: 'Database Management Systems',
    type: 'Assignment',
    dueDate: '2024-09-25',
    submittedDate: '2024-09-20',
    status: 'submitted',
    grade: 'A-',
    maxMarks: 100,
    obtainedMarks: 87,
    instructor: 'Prof. Sarah Wilson',
    description: 'Design a normalized database schema for an e-commerce platform including all necessary relationships.',
    requirements: ['ER Diagram', 'Schema Design', 'Normalization Report'],
    submissionFile: 'DBMS_Assignment_3.pdf',
    feedback: 'Excellent work on the ER diagram. Minor improvements needed in 3NF implementation.',
    submissionType: 'PDF'
  },
  {
    id: 2,
    title: 'Machine Learning Lab - KNN Implementation',
    subject: 'Machine Learning',
    type: 'Lab',
    dueDate: '2024-09-28',
    submittedDate: null,
    status: 'pending',
    grade: null,
    maxMarks: 50,
    obtainedMarks: null,
    instructor: 'Dr. Michael Chen',
    description: 'Implement K-Nearest Neighbors algorithm from scratch using Python and test on provided dataset.',
    requirements: ['Python Code', 'Results Analysis', 'Performance Report'],
    submissionFile: null,
    feedback: null,
    submissionType: 'Code + Report'
  },
  {
    id: 3,
    title: 'React Portfolio Project',
    subject: 'Web Development',
    type: 'Project',
    dueDate: '2024-10-05',
    submittedDate: '2024-09-18',
    status: 'reviewed',
    grade: 'A+',
    maxMarks: 150,
    obtainedMarks: 145,
    instructor: 'Prof. Emily Davis',
    description: 'Create a responsive portfolio website using React with at least 5 components and routing.',
    requirements: ['React App', 'Responsive Design', 'Documentation'],
    submissionFile: 'portfolio_project.zip',
    feedback: 'Outstanding implementation with excellent component structure and design!',
    submissionType: 'Code Repository'
  },
  {
    id: 4,
    title: 'Network Security Analysis',
    subject: 'Computer Networks',
    type: 'Assignment',
    dueDate: '2024-09-22',
    submittedDate: null,
    status: 'overdue',
    grade: null,
    maxMarks: 75,
    obtainedMarks: null,
    instructor: 'Dr. Lisa Thompson',
    description: 'Analyze security vulnerabilities in a given network topology and propose solutions.',
    requirements: ['Vulnerability Report', 'Security Recommendations', 'Implementation Plan'],
    submissionFile: null,
    feedback: null,
    submissionType: 'Report'
  },
  {
    id: 5,
    title: 'Data Structures Lab - Tree Implementation',
    subject: 'Data Structures',
    type: 'Lab',
    dueDate: '2024-10-01',
    submittedDate: null,
    status: 'pending',
    grade: null,
    maxMarks: 60,
    obtainedMarks: null,
    instructor: 'Prof. Robert Kumar',
    description: 'Implement Binary Search Tree with insertion, deletion, and traversal operations.',
    requirements: ['C++ Code', 'Test Cases', 'Complexity Analysis'],
    submissionFile: null,
    feedback: null,
    submissionType: 'Code'
  },
  {
    id: 6,
    title: 'AI Ethics Research Paper',
    subject: 'Artificial Intelligence',
    type: 'Research',
    dueDate: '2024-10-10',
    submittedDate: null,
    status: 'pending',
    grade: null,
    maxMarks: 100,
    obtainedMarks: null,
    instructor: 'Prof. James Wilson',
    description: 'Write a research paper on ethical implications of AI in healthcare decision-making.',
    requirements: ['Research Paper', 'Bibliography', 'Peer Review'],
    submissionFile: null,
    feedback: null,
    submissionType: 'Document'
  }
];

const subjects = ['All', 'Database Management Systems', 'Machine Learning', 'Web Development', 'Computer Networks', 'Data Structures', 'Artificial Intelligence'];
const types = ['All', 'Assignment', 'Lab', 'Project', 'Research'];
const statuses = ['All', 'pending', 'submitted', 'reviewed', 'overdue'];

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video' | 'audio' | 'other';
  size: string;
  uploadDate: string;
  thumbnail?: string;
}

export function Records() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [assignmentFiles, setAssignmentFiles] = useState<{ [key: string]: UploadedFile[] }>({});
  const [assignmentStatuses, setAssignmentStatuses] = useState<{ [key: string]: string }>({});

  const getAssignmentStatus = (assignment: any) => {
    return assignmentStatuses[assignment.id] || assignment.status;
  };

  const filteredAssignments = assignments.filter(assignment => {
    const currentStatus = getAssignmentStatus(assignment);
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || assignment.subject === selectedSubject;
    const matchesType = selectedType === 'All' || assignment.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || currentStatus === selectedStatus;
    
    return matchesSearch && matchesSubject && matchesType && matchesStatus;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-700 border-yellow-300', icon: Clock, label: 'Pending' };
      case 'submitted':
        return { color: 'bg-blue-100 text-blue-700 border-blue-300', icon: CheckCircle, label: 'Submitted' };
      case 'reviewed':
        return { color: 'bg-green-100 text-green-700 border-green-300', icon: CheckCircle, label: 'Reviewed' };
      case 'overdue':
        return { color: 'bg-red-100 text-red-700 border-red-300', icon: AlertCircle, label: 'Overdue' };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-300', icon: Clock, label: 'Unknown' };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Assignment': return '📝';
      case 'Lab': return '🧪';
      case 'Project': return '💻';
      case 'Research': return '📊';
      default: return '📄';
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (marks: number, maxMarks: number) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const handleVoiceSearch = (transcript: string) => {
    setSearchQuery(transcript);
    toast.success(`Voice search: "${transcript}"`);
  };

  const handleFileUpload = (assignmentId: string, files: UploadedFile[]) => {
    setAssignmentFiles(prev => ({
      ...prev,
      [assignmentId]: files
    }));
    
    // Update assignment status to submitted if files are uploaded
    if (files.length > 0) {
      setAssignmentStatuses(prev => ({
        ...prev,
        [assignmentId]: 'submitted'
      }));
    }
  };

  const handleFileDelete = (assignmentId: string, fileId: string) => {
    setAssignmentFiles(prev => ({
      ...prev,
      [assignmentId]: prev[assignmentId]?.filter(file => file.id !== fileId) || []
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Academic Records</h1>
          <p className="text-slate-600">Track assignments, labs, and project submissions</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-700 font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">
                {assignments.filter(a => a.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 font-medium">Submitted</p>
              <p className="text-2xl font-bold text-blue-900">
                {assignments.filter(a => a.status === 'submitted').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Reviewed</p>
              <p className="text-2xl font-bold text-green-900">
                {assignments.filter(a => a.status === 'reviewed').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700 font-medium">Overdue</p>
              <p className="text-2xl font-bold text-red-900">
                {assignments.filter(a => a.status === 'overdue').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search assignments and labs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-16 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <VoiceSearch onTranscript={handleVoiceSearch} />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'All' ? status : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-1 ml-auto">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>{filteredAssignments.length} records found</span>
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              <Plus className="w-4 h-4 mr-2" />
              New Submission
            </Button>
          </div>
        </div>
      </Card>

      {/* Records Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredAssignments.map((assignment) => {
          const currentStatus = getAssignmentStatus(assignment);
          const statusConfig = getStatusConfig(currentStatus);
          const StatusIcon = statusConfig.icon;
          const daysRemaining = getDaysRemaining(assignment.dueDate);
          const uploadedFiles = assignmentFiles[assignment.id] || [];
          
          return (
            <Card key={assignment.id} className={`hover:shadow-lg transition-all duration-300 group ${
              viewMode === 'list' ? 'p-4' : 'p-6'
            }`}>
              {viewMode === 'grid' ? (
                // Grid View
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-xl">
                        {getTypeIcon(assignment.type)}
                      </div>
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">
                          {assignment.type}
                        </Badge>
                        <Badge className={statusConfig.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{assignment.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{assignment.subject}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{assignment.description}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Due Date:</span>
                      <span className={`font-medium ${
                        daysRemaining < 0 ? 'text-red-600' : 
                        daysRemaining <= 3 ? 'text-orange-600' : 'text-slate-800'
                      }`}>
                        {assignment.dueDate}
                      </span>
                    </div>
                    
                    {daysRemaining >= 0 && assignment.status === 'pending' && (
                      <div className="text-xs text-slate-500">
                        {daysRemaining === 0 ? 'Due today' : `${daysRemaining} days remaining`}
                      </div>
                    )}

                    {assignment.obtainedMarks !== null && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Score: {assignment.obtainedMarks}/{assignment.maxMarks}</span>
                          <span className="font-medium">{assignment.grade}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(assignment.obtainedMarks, assignment.maxMarks)}`}
                            style={{ width: `${(assignment.obtainedMarks / assignment.maxMarks) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {currentStatus === 'pending' || currentStatus === 'overdue' ? (
                      <FileUpload
                        assignmentId={assignment.id}
                        onFileUpload={(files) => handleFileUpload(assignment.id, files)}
                        uploadedFiles={uploadedFiles}
                        onFileDelete={(fileId) => handleFileDelete(assignment.id, fileId)}
                      />
                    ) : (
                      <div className="space-y-2">
                        {(assignment.submissionFile || uploadedFiles.length > 0) && (
                          <Button variant="outline" className="w-full">
                            <Download className="w-4 h-4 mr-2" />
                            Download Submission
                          </Button>
                        )}
                        {assignment.feedback && (
                          <Button variant="outline" className="w-full">
                            <Eye className="w-4 h-4 mr-2" />
                            View Feedback
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // List View
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {getTypeIcon(assignment.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800">{assignment.title}</h3>
                        <p className="text-sm text-slate-600">{assignment.subject}</p>
                      </div>
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>Due: {assignment.dueDate}</span>
                      <span>•</span>
                      <span>{assignment.instructor}</span>
                      {assignment.obtainedMarks !== null && (
                        <>
                          <span>•</span>
                          <span className="font-medium">{assignment.grade} ({assignment.obtainedMarks}/{assignment.maxMarks})</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Badge variant="outline" className="text-xs">
                      {assignment.type}
                    </Badge>
                    {currentStatus === 'pending' || currentStatus === 'overdue' ? (
                      <Button 
                        onClick={() => {
                          // Simulate quick file upload for list view
                          const quickFile: UploadedFile = {
                            id: `quick_${Date.now()}`,
                            name: `${assignment.title.replace(/\s+/g, '_')}.pdf`,
                            type: 'document',
                            size: '1.5 MB',
                            uploadDate: new Date().toLocaleDateString()
                          };
                          handleFileUpload(assignment.id, [quickFile]);
                          toast.success('File uploaded successfully ✅');
                        }}
                        size="sm" 
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Upload
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-medium text-slate-800 mb-2">No records found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}