import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { VoiceSearch } from './VoiceSearch';
import { toast } from 'sonner@2.0.3';
import { 
  BookOpen, 
  Search, 
  FileText, 
  Video, 
  Download, 
  Clock, 
  User, 
  Star,
  Play,
  Filter,
  Grid3X3,
  List,
  ExternalLink,
  Tag,
  ChevronRight,
  Bookmark,
  Share2,
  BookOpenCheck
} from 'lucide-react';

const learningResources = [
  {
    id: 1,
    title: 'Database Management Systems - Lecture 3',
    type: 'PDF',
    subject: 'DBMS',
    topic: 'Normalization',
    duration: '45 min read',
    instructor: 'Prof. Sarah Wilson',
    uploadDate: '2024-09-10',
    rating: 4.8,
    downloads: 234,
    tags: ['Database Design', 'Normalization', 'SQL'],
    hierarchy: ['DBMS', 'Lecture 3', 'Assignment 3', 'DBMS Hackathon'],
    description: 'Comprehensive guide to database normalization including 1NF, 2NF, 3NF, and BCNF with practical examples.',
    thumbnail: '📄',
    difficulty: 'Intermediate'
  },
  {
    id: 2,
    title: 'Introduction to Machine Learning Algorithms',
    type: 'Video',
    subject: 'Machine Learning',
    topic: 'Supervised Learning',
    duration: '1h 20min',
    instructor: 'Dr. Michael Chen',
    uploadDate: '2024-09-08',
    rating: 4.9,
    downloads: 567,
    tags: ['ML Algorithms', 'Supervised Learning', 'Classification'],
    hierarchy: ['Machine Learning', 'Module 2', 'ML Project', 'AI Competition'],
    description: 'Detailed explanation of fundamental ML algorithms including linear regression, decision trees, and neural networks.',
    thumbnail: '🎥',
    difficulty: 'Beginner'
  },
  {
    id: 3,
    title: 'Web Development with React - Components',
    type: 'PDF',
    subject: 'Web Development',
    topic: 'React Components',
    duration: '30 min read',
    instructor: 'Prof. Emily Davis',
    uploadDate: '2024-09-05',
    rating: 4.7,
    downloads: 432,
    tags: ['React', 'Components', 'JSX', 'Props'],
    hierarchy: ['Web Development', 'React Module', 'Portfolio Project', 'Web Dev Contest'],
    description: 'Complete guide to creating and managing React components with state management and lifecycle methods.',
    thumbnail: '📄',
    difficulty: 'Intermediate'
  },
  {
    id: 4,
    title: 'Data Structures: Trees and Graphs',
    type: 'Video',
    subject: 'Data Structures',
    topic: 'Trees & Graphs',
    duration: '2h 15min',
    instructor: 'Prof. Robert Kumar',
    uploadDate: '2024-09-03',
    rating: 4.9,
    downloads: 789,
    tags: ['Trees', 'Graphs', 'Algorithms', 'Traversal'],
    hierarchy: ['Data Structures', 'Advanced Topics', 'Final Project', 'Coding Competition'],
    description: 'In-depth coverage of tree and graph data structures with implementation examples and traversal algorithms.',
    thumbnail: '🎥',
    difficulty: 'Advanced'
  },
  {
    id: 5,
    title: 'Network Security Fundamentals',
    type: 'PDF',
    subject: 'Computer Networks',
    topic: 'Security',
    duration: '1h 10min read',
    instructor: 'Dr. Lisa Thompson',
    uploadDate: '2024-08-30',
    rating: 4.6,
    downloads: 345,
    tags: ['Network Security', 'Encryption', 'Protocols'],
    hierarchy: ['Computer Networks', 'Security Module', 'Security Assignment', 'Cybersecurity Challenge'],
    description: 'Comprehensive overview of network security principles, encryption methods, and security protocols.',
    thumbnail: '📄',
    difficulty: 'Intermediate'
  },
  {
    id: 6,
    title: 'Artificial Intelligence Ethics',
    type: 'Video',
    subject: 'AI Ethics',
    topic: 'Ethical AI',
    duration: '55min',
    instructor: 'Prof. James Wilson',
    uploadDate: '2024-08-25',
    rating: 4.8,
    downloads: 298,
    tags: ['AI Ethics', 'Bias', 'Fairness', 'Responsibility'],
    hierarchy: ['AI Ethics', 'Philosophy Module', 'Ethics Essay', 'AI Debate'],
    description: 'Exploration of ethical considerations in AI development including bias, fairness, and societal impact.',
    thumbnail: '🎥',
    difficulty: 'Beginner'
  }
];

const subjects = ['All', 'DBMS', 'Machine Learning', 'Web Development', 'Data Structures', 'Computer Networks', 'AI Ethics'];
const types = ['All', 'PDF', 'Video', 'Notes'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const syllabusData = [
  {
    subject: 'Database Management Systems',
    code: 'CS-301',
    credits: 4,
    instructor: 'Prof. Sarah Wilson',
    semester: 'Fall 2024',
    modules: [
      {
        id: 1,
        title: 'Introduction to Databases',
        weeks: 'Week 1-2',
        topics: [
          'Database System Concepts',
          'Data Models and Database Languages',
          'Database Architecture',
          'Entity-Relationship Model'
        ],
        assignments: ['ER Diagram Exercise', 'Database Concepts Quiz'],
        resources: ['Chapter 1-2 Textbook', 'Intro Slides', 'ER Tool Tutorial']
      },
      {
        id: 2,
        title: 'Relational Model & SQL',
        weeks: 'Week 3-5',
        topics: [
          'Relational Model Fundamentals',
          'SQL Data Definition Language',
          'SQL Query Language',
          'Advanced SQL Features'
        ],
        assignments: ['SQL Lab 1', 'Query Optimization Exercise', 'Midterm Project'],
        resources: ['SQL Reference Guide', 'Practice Database', 'Video Tutorials']
      },
      {
        id: 3,
        title: 'Database Design & Normalization',
        weeks: 'Week 6-8',
        topics: [
          'Functional Dependencies',
          'Normal Forms (1NF, 2NF, 3NF, BCNF)',
          'Database Design Process',
          'Design Tools and Techniques'
        ],
        assignments: ['Normalization Exercise', 'Design Project Phase 1'],
        resources: ['Design Examples', 'Normalization Tools', 'Case Studies']
      },
      {
        id: 4,
        title: 'Transaction Management',
        weeks: 'Week 9-11',
        topics: [
          'ACID Properties',
          'Concurrency Control',
          'Locking Protocols',
          'Recovery Techniques'
        ],
        assignments: ['Transaction Lab', 'Concurrency Simulation'],
        resources: ['Transaction Examples', 'Simulation Software']
      },
      {
        id: 5,
        title: 'Advanced Topics',
        weeks: 'Week 12-14',
        topics: [
          'NoSQL Databases',
          'Data Warehousing',
          'Big Data Technologies',
          'Database Security'
        ],
        assignments: ['NoSQL Project', 'Final Presentation'],
        resources: ['NoSQL Documentation', 'Security Guidelines']
      }
    ]
  },
  {
    subject: 'Machine Learning',
    code: 'CS-405',
    credits: 3,
    instructor: 'Dr. Michael Chen',
    semester: 'Fall 2024',
    modules: [
      {
        id: 1,
        title: 'Introduction to ML',
        weeks: 'Week 1-2',
        topics: [
          'What is Machine Learning?',
          'Types of Learning',
          'Python for ML',
          'Data Preprocessing'
        ],
        assignments: ['Python Setup', 'Data Cleaning Exercise'],
        resources: ['Python ML Guide', 'Jupyter Notebooks', 'Dataset Collection']
      },
      {
        id: 2,
        title: 'Supervised Learning',
        weeks: 'Week 3-6',
        topics: [
          'Linear Regression',
          'Classification Algorithms',
          'Decision Trees',
          'Support Vector Machines'
        ],
        assignments: ['Regression Project', 'Classification Lab', 'Algorithm Comparison'],
        resources: ['Scikit-learn Documentation', 'Algorithm Notebooks']
      },
      {
        id: 3,
        title: 'Unsupervised Learning',
        weeks: 'Week 7-9',
        topics: [
          'Clustering Algorithms',
          'Dimensionality Reduction',
          'Association Rules',
          'Anomaly Detection'
        ],
        assignments: ['Clustering Project', 'PCA Exercise'],
        resources: ['Clustering Examples', 'Visualization Tools']
      },
      {
        id: 4,
        title: 'Neural Networks & Deep Learning',
        weeks: 'Week 10-12',
        topics: [
          'Perceptron',
          'Multi-layer Networks',
          'Backpropagation',
          'Deep Learning Frameworks'
        ],
        assignments: ['Neural Network Implementation', 'Deep Learning Project'],
        resources: ['TensorFlow Tutorials', 'Keras Documentation']
      },
      {
        id: 5,
        title: 'Advanced Topics & Applications',
        weeks: 'Week 13-15',
        topics: [
          'Natural Language Processing',
          'Computer Vision',
          'Reinforcement Learning',
          'ML Ethics and Bias'
        ],
        assignments: ['NLP Project', 'Final Presentation', 'Ethics Essay'],
        resources: ['NLP Libraries', 'OpenCV Tutorials', 'Ethics Readings']
      }
    ]
  },
  {
    subject: 'Web Development',
    code: 'CS-320',
    credits: 3,
    instructor: 'Prof. Emily Davis',
    semester: 'Fall 2024',
    modules: [
      {
        id: 1,
        title: 'HTML & CSS Fundamentals',
        weeks: 'Week 1-3',
        topics: [
          'HTML Structure and Semantics',
          'CSS Styling and Layout',
          'Responsive Design',
          'CSS Grid and Flexbox'
        ],
        assignments: ['Portfolio Website', 'Responsive Layout Exercise'],
        resources: ['MDN Documentation', 'CSS Grid Guide', 'Design Examples']
      },
      {
        id: 2,
        title: 'JavaScript Programming',
        weeks: 'Week 4-6',
        topics: [
          'JavaScript Fundamentals',
          'DOM Manipulation',
          'Event Handling',
          'Asynchronous Programming'
        ],
        assignments: ['Interactive Calculator', 'Dynamic Web Page', 'API Integration'],
        resources: ['JavaScript Guide', 'DOM API Reference', 'Async Examples']
      },
      {
        id: 3,
        title: 'React Framework',
        weeks: 'Week 7-10',
        topics: [
          'Component-based Architecture',
          'State Management',
          'React Hooks',
          'Routing and Navigation'
        ],
        assignments: ['Todo App', 'Weather Dashboard', 'Multi-page Application'],
        resources: ['React Documentation', 'Hooks Guide', 'Router Examples']
      },
      {
        id: 4,
        title: 'Backend Development',
        weeks: 'Week 11-13',
        topics: [
          'Node.js and Express',
          'RESTful APIs',
          'Database Integration',
          'Authentication'
        ],
        assignments: ['REST API Project', 'Full-stack Application'],
        resources: ['Express Documentation', 'MongoDB Guide', 'Auth Examples']
      },
      {
        id: 5,
        title: 'Deployment & Best Practices',
        weeks: 'Week 14-15',
        topics: [
          'Version Control with Git',
          'Testing Strategies',
          'Performance Optimization',
          'Deployment Platforms'
        ],
        assignments: ['Testing Exercise', 'Deployment Project', 'Final Portfolio'],
        resources: ['Git Guide', 'Testing Frameworks', 'Deployment Guides']
      }
    ]
  }
];

export function Learning() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredResources = learningResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'All' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesType && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-4 h-4" />;
      case 'Video': return <Video className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleVoiceSearch = (transcript: string) => {
    setSearchQuery(transcript);
    toast.success(`Voice search: "${transcript}"`);
  };

  const HierarchyPath = ({ hierarchy }: { hierarchy: string[] }) => (
    <div className="flex items-center space-x-1 text-xs text-slate-500 mb-2">
      {hierarchy.map((item, index) => (
        <React.Fragment key={index}>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">{item}</span>
          {index < hierarchy.length - 1 && <ChevronRight className="w-3 h-3" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Learning Hub</h1>
          <p className="text-slate-600">Access resources, syllabus, and study materials</p>
        </div>
      </div>

      <Tabs defaultValue="resources" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="resources" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger value="syllabus" className="flex items-center space-x-2">
            <BookOpenCheck className="w-4 h-4" />
            <span>Syllabus</span>
          </TabsTrigger>
        </TabsList>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by topic or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-16 h-12 bg-slate-50 border-slate-200 rounded-xl text-base"
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
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
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
            <span>{filteredResources.length} resources found</span>
            <div className="flex items-center space-x-4">
              <span>Sort by:</span>
              <select className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Most Recent</option>
                <option>Highest Rated</option>
                <option>Most Downloaded</option>
                <option>Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Resources Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredResources.map((resource) => (
          <Card key={resource.id} className={`hover:shadow-lg transition-all duration-300 group cursor-pointer ${
            viewMode === 'list' ? 'p-4' : 'p-6'
          }`}>
            {viewMode === 'grid' ? (
              // Grid View
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-xl">
                    {resource.thumbnail}
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <HierarchyPath hierarchy={resource.hierarchy} />
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{resource.description}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1 text-slate-500">
                    {getTypeIcon(resource.type)}
                    <span>{resource.type}</span>
                  </div>
                  <Badge className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{resource.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{resource.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{resource.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex space-x-2">
                  {resource.type === 'Video' ? (
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Play className="w-4 h-4 mr-2" />
                      Watch
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => toast.success('Downloaded successfully')}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              // List View
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                  {resource.thumbnail}
                </div>
                
                <div className="flex-1 min-w-0">
                  <HierarchyPath hierarchy={resource.hierarchy} />
                  <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">{resource.instructor}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(resource.type)}
                      <span>{resource.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{resource.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{resource.rating}</span>
                    </div>
                    <span>{resource.downloads} downloads</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Badge className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                  {resource.type === 'Video' ? (
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Play className="w-4 h-4 mr-1" />
                      Watch
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => toast.success('Downloaded successfully')}
                      size="sm" 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">No resources found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>

        {/* Syllabus Tab */}
        <TabsContent value="syllabus" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {syllabusData.map((course) => (
              <Card key={course.code} className="p-6 hover:shadow-lg transition-shadow">
                {/* Course Header */}
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-800">{course.subject}</h3>
                    <Badge variant="outline" className="text-blue-600 border-blue-300">
                      {course.code}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                    <p><span className="font-medium">Credits:</span> {course.credits}</p>
                    <p><span className="font-medium">Semester:</span> {course.semester}</p>
                  </div>
                </div>

                {/* Download Syllabus Button */}
                <Button 
                  onClick={() => toast.success('Downloaded successfully')}
                  className="w-full mb-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Syllabus
                </Button>

                {/* Modules Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={`module-${module.id}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center justify-between w-full pr-4">
                          <span className="font-medium text-slate-800">{module.title}</span>
                          <Badge variant="secondary" className="text-xs bg-slate-100">
                            {module.weeks}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2">
                        <div className="space-y-4">
                          {/* Topics */}
                          <div>
                            <h5 className="font-medium text-slate-700 mb-2 flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              Topics Covered
                            </h5>
                            <ul className="space-y-1">
                              {module.topics.map((topic, index) => (
                                <li key={index} className="text-sm text-slate-600 flex items-start">
                                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Assignments */}
                          <div>
                            <h5 className="font-medium text-slate-700 mb-2 flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              Assignments
                            </h5>
                            <div className="space-y-1">
                              {module.assignments.map((assignment, index) => (
                                <div key={index} className="text-sm text-slate-600 bg-orange-50 rounded-lg px-3 py-2">
                                  {assignment}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Resources */}
                          <div>
                            <h5 className="font-medium text-slate-700 mb-2 flex items-center">
                              <Tag className="w-4 h-4 mr-1" />
                              Resources
                            </h5>
                            <div className="flex flex-wrap gap-1">
                              {module.resources.map((resource, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {resource}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}