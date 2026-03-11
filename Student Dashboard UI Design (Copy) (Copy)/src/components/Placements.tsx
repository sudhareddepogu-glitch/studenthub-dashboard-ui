import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  FileText,
  ExternalLink
} from 'lucide-react';

const upcomingDrives = [
  {
    id: 1,
    company: 'Google',
    logo: '🔴',
    position: 'Software Engineer - New Grad',
    type: 'Full-time',
    location: 'Mountain View, CA',
    salary: '$140,000 - $180,000',
    applicationDeadline: 'Sept 25, 2024',
    interviewDate: 'Oct 5-10, 2024',
    eligibility: {
      gpa: 3.5,
      branches: ['Computer Science', 'Software Engineering'],
      year: '2025',
      skills: ['Python', 'Java', 'Data Structures', 'Algorithms']
    },
    requirements: 'Strong programming skills, system design knowledge',
    applied: false,
    eligible: true,
    slotsAvailable: 25,
    totalSlots: 30
  },
  {
    id: 2,
    company: 'Microsoft',
    logo: '🔵',
    position: 'Product Manager Intern',
    type: 'Internship',
    location: 'Seattle, WA',
    salary: '$8,000/month',
    applicationDeadline: 'Sept 30, 2024',
    interviewDate: 'Oct 15-20, 2024',
    eligibility: {
      gpa: 3.3,
      branches: ['Computer Science', 'Business', 'Engineering'],
      year: '2026',
      skills: ['Product Strategy', 'Analytics', 'Communication']
    },
    requirements: 'Leadership experience, analytical mindset',
    applied: true,
    eligible: true,
    slotsAvailable: 8,
    totalSlots: 10
  },
  {
    id: 3,
    company: 'Amazon',
    logo: '🟠',
    position: 'Cloud Solutions Architect',
    type: 'Full-time',
    location: 'Austin, TX',
    salary: '$120,000 - $160,000',
    applicationDeadline: 'Oct 5, 2024',
    interviewDate: 'Oct 20-25, 2024',
    eligibility: {
      gpa: 3.4,
      branches: ['Computer Science', 'Information Technology'],
      year: '2025',
      skills: ['AWS', 'Cloud Computing', 'System Architecture']
    },
    requirements: 'Cloud platform experience, client-facing skills',
    applied: false,
    eligible: false,
    slotsAvailable: 15,
    totalSlots: 20
  },
  {
    id: 4,
    company: 'Meta',
    logo: '🔷',
    position: 'Data Scientist',
    type: 'Full-time',
    location: 'Menlo Park, CA',
    salary: '$130,000 - $170,000',
    applicationDeadline: 'Oct 1, 2024',
    interviewDate: 'Oct 12-18, 2024',
    eligibility: {
      gpa: 3.6,
      branches: ['Computer Science', 'Statistics', 'Mathematics'],
      year: '2025',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics']
    },
    requirements: 'Strong analytical skills, ML experience',
    applied: false,
    eligible: true,
    slotsAvailable: 12,
    totalSlots: 15
  }
];

const interviewPrepResources = [
  {
    id: 1,
    title: 'System Design Fundamentals',
    type: 'Video Course',
    duration: '4 hours',
    provider: 'TechPrep',
    rating: 4.8,
    description: 'Learn to design scalable systems for top tech companies'
  },
  {
    id: 2,
    title: 'Behavioral Interview Guide',
    type: 'PDF Guide',
    duration: '45 min read',
    provider: 'CareerSuccess',
    rating: 4.6,
    description: 'Master the STAR method and common behavioral questions'
  },
  {
    id: 3,
    title: 'Coding Interview Practice',
    type: 'Interactive',
    duration: 'Self-paced',
    provider: 'CodeMaster',
    rating: 4.9,
    description: '500+ coding problems with detailed solutions'
  },
  {
    id: 4,
    title: 'Product Management Cases',
    type: 'Case Studies',
    duration: '2 hours',
    provider: 'PMPrep',
    rating: 4.7,
    description: 'Real PM interview cases from FAANG companies'
  }
];

const placementStats = {
  totalStudents: 450,
  placedStudents: 387,
  averagePackage: '$95,000',
  highestPackage: '$220,000',
  topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
  placementRate: 86
};

const myApplications = [
  {
    id: 1,
    company: 'Microsoft',
    position: 'Product Manager Intern',
    status: 'Interview Scheduled',
    appliedDate: 'Sept 10, 2024',
    nextStep: 'Technical Interview - Sept 20, 2:00 PM',
    progress: 60
  },
  {
    id: 2,
    company: 'Tesla',
    position: 'Software Engineer',
    status: 'Application Submitted',
    appliedDate: 'Sept 8, 2024',
    nextStep: 'Awaiting response',
    progress: 25
  },
  {
    id: 3,
    company: 'Netflix',
    position: 'Data Analyst',
    status: 'Rejected',
    appliedDate: 'Aug 25, 2024',
    nextStep: 'Application cycle closed',
    progress: 100
  }
];

export function Placements() {
  const [selectedTab, setSelectedTab] = useState('opportunities');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Interview Scheduled': return 'bg-blue-100 text-blue-700';
      case 'Application Submitted': return 'bg-yellow-100 text-yellow-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      case 'Offer Received': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Placements</h1>
          <p className="text-slate-600">Your gateway to career opportunities</p>
        </div>
      </div>

      {/* Placement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Placement Rate</p>
              <p className="text-2xl font-bold text-green-900">{placementStats.placementRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 font-medium">Students Placed</p>
              <p className="text-2xl font-bold text-blue-900">{placementStats.placedStudents}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 font-medium">Average Package</p>
              <p className="text-2xl font-bold text-purple-900">{placementStats.averagePackage}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700 font-medium">Highest Package</p>
              <p className="text-2xl font-bold text-orange-900">{placementStats.highestPackage}</p>
            </div>
            <Award className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="prep">Interview Prep</TabsTrigger>
        </TabsList>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingDrives.map((drive) => (
              <Card key={drive.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-xl">
                      {drive.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{drive.company}</h3>
                      <p className="text-sm text-slate-600">{drive.position}</p>
                      <Badge variant={drive.type === 'Full-time' ? 'default' : 'secondary'} className="mt-1">
                        {drive.type}
                      </Badge>
                    </div>
                  </div>
                  {!drive.eligible && (
                    <Badge variant="destructive" className="bg-red-100 text-red-700">
                      Not Eligible
                    </Badge>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {drive.location}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    {drive.salary}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Apply by: {drive.applicationDeadline}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Clock className="w-4 h-4 mr-2" />
                    Interview: {drive.interviewDate}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl mb-4">
                  <h4 className="font-medium text-slate-800 mb-2">Eligibility Criteria</h4>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p>• Minimum GPA: {drive.eligibility.gpa}</p>
                    <p>• Branches: {drive.eligibility.branches.join(', ')}</p>
                    <p>• Graduation Year: {drive.eligibility.year}</p>
                    <p>• Required Skills: {drive.eligibility.skills.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">{drive.slotsAvailable}</span> of {drive.totalSlots} slots available
                  </div>
                  <Progress value={(drive.slotsAvailable / drive.totalSlots) * 100} className="w-24 h-2" />
                </div>

                <div className="flex space-x-2">
                  {drive.applied ? (
                    <Button disabled className="flex-1 bg-green-100 text-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Applied
                    </Button>
                  ) : drive.eligible ? (
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                      Apply Now
                    </Button>
                  ) : (
                    <Button disabled className="flex-1">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Not Eligible
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Applications Tab */}
        <TabsContent value="applications" className="space-y-6">
          <div className="space-y-4">
            {myApplications.map((application) => (
              <Card key={application.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-800">{application.company}</h3>
                    <p className="text-slate-600">{application.position}</p>
                    <p className="text-sm text-slate-500 mt-1">Applied: {application.appliedDate}</p>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Application Progress</span>
                      <span>{application.progress}%</span>
                    </div>
                    <Progress value={application.progress} className="h-2" />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-sm font-medium text-slate-800">Next Step:</p>
                    <p className="text-sm text-slate-600">{application.nextStep}</p>
                  </div>

                  {application.status === 'Interview Scheduled' && (
                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Interview Details
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Interview Prep Tab */}
        <TabsContent value="prep" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interviewPrepResources.map((resource) => (
              <Card key={resource.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                      {resource.type === 'Video Course' && <BookOpen className="w-5 h-5 text-orange-600" />}
                      {resource.type === 'PDF Guide' && <FileText className="w-5 h-5 text-orange-600" />}
                      {resource.type === 'Interactive' && <Target className="w-5 h-5 text-orange-600" />}
                      {resource.type === 'Case Studies' && <Building2 className="w-5 h-5 text-orange-600" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{resource.title}</h3>
                      <p className="text-sm text-slate-600">{resource.provider}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{resource.type}</Badge>
                </div>

                <p className="text-sm text-slate-600 mb-4">{resource.description}</p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <span>{resource.duration}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    {resource.rating}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  Start Learning
                </Button>
              </Card>
            ))}
          </div>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-blue-600" />
              Placement Preparation Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
                <div>
                  <p className="font-medium text-slate-800">Resume Building & Portfolio</p>
                  <p className="text-sm text-slate-600">Create a standout resume and showcase your projects</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
                <div>
                  <p className="font-medium text-slate-800">Technical Skills Enhancement</p>
                  <p className="text-sm text-slate-600">Strengthen coding, system design, and domain knowledge</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
                <div>
                  <p className="font-medium text-slate-800">Mock Interviews & Practice</p>
                  <p className="text-sm text-slate-600">Practice with peers and mentors to build confidence</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">4</div>
                <div>
                  <p className="font-medium text-slate-800">Application & Interview Process</p>
                  <p className="text-sm text-slate-600">Apply strategically and excel in interviews</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}