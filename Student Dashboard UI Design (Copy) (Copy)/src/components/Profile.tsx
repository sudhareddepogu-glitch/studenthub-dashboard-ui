import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  Award,
  BookOpen,
  Activity,
  GraduationCap,
  Camera,
  Download,
  Share2,
  Star,
  Target,
  ExternalLink,
  FileText,
  Trophy,
  Medal,
  Crown,
  Briefcase,
  Building2,
  Eye,
  Copy,
  X,
  Plus,
  MessageCircle,
  Check
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const studentData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    address: '123 Campus Drive, University City, UC 12345',
    dateOfBirth: '2002-03-15',
    studentId: 'CS2021001',
    rollNumber: '21BCE1001',
    department: 'Computer Science Engineering',
    year: '3rd Year',
    semester: '6th Semester',
    batch: '2021-2025',
    profileImage: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjB1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc1NzQzMzUzOHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  academic: {
    currentGPA: 3.85,
    cumulativeGPA: 3.78,
    totalCredits: 94,
    requiredCredits: 120,
    major: 'Computer Science Engineering',
    minor: 'Mathematics',
    specialization: 'Artificial Intelligence & Machine Learning',
    expectedGraduation: 'May 2025',
    academicStanding: 'Dean\'s List',
    classRank: '15/240',
    deansList: 4
  }
};

const certificates = [
  {
    id: 1,
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: 'September 2024',
    expiryDate: 'September 2027',
    credentialId: 'AWS-CCP-2024-9854',
    verificationUrl: '#',
    category: 'Cloud Computing',
    level: 'Foundation',
    logo: '☁️',
    skills: ['AWS Services', 'Cloud Architecture', 'Security'],
    description: 'Validates foundational, high-level understanding of AWS Cloud, services, and terminology.'
  },
  {
    id: 2,
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google Career Certificates',
    issueDate: 'August 2024',
    expiryDate: 'Lifetime',
    credentialId: 'GDA-2024-7721',
    verificationUrl: '#',
    category: 'Data Analytics',
    level: 'Professional',
    logo: '📊',
    skills: ['SQL', 'Tableau', 'R Programming', 'Data Visualization'],
    description: 'Comprehensive training in data analytics tools and methodologies used in industry.'
  },
  {
    id: 3,
    title: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    issueDate: 'July 2024',
    expiryDate: 'Lifetime',
    credentialId: 'META-FE-2024-3312',
    verificationUrl: '#',
    category: 'Web Development',
    level: 'Professional',
    logo: '💻',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'UI/UX Design'],
    description: 'Master the skills needed to become a front-end developer and build user-friendly web applications.'
  },
  {
    id: 4,
    title: 'IBM Data Science Professional Certificate',
    issuer: 'IBM',
    issueDate: 'June 2024',
    expiryDate: 'Lifetime',
    credentialId: 'IBM-DS-2024-9966',
    verificationUrl: '#',
    category: 'Data Science',
    level: 'Professional',
    logo: '🔬',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Jupyter Notebooks'],
    description: 'Comprehensive data science training including machine learning and data visualization.'
  },
  {
    id: 5,
    title: 'Microsoft Azure Fundamentals',
    issuer: 'Microsoft',
    issueDate: 'May 2024',
    expiryDate: 'May 2026',
    credentialId: 'MS-AZ-900-2024-5544',
    verificationUrl: '#',
    category: 'Cloud Computing',
    level: 'Foundation',
    logo: '🔷',
    skills: ['Azure Services', 'Cloud Concepts', 'Security'],
    description: 'Foundational knowledge of cloud concepts and Microsoft Azure services.'
  },
  {
    id: 6,
    title: 'Scrum Master Certified (SMC)',
    issuer: 'Scrum Alliance',
    issueDate: 'April 2024',
    expiryDate: 'April 2026',
    credentialId: 'SA-SMC-2024-1188',
    verificationUrl: '#',
    category: 'Project Management',
    level: 'Professional',
    logo: '⚡',
    skills: ['Agile Methodology', 'Scrum Framework', 'Team Leadership'],
    description: 'Certification in Scrum Master practices and agile project management methodologies.'
  }
];

const achievements = [
  {
    id: 1,
    title: 'Dean\'s List - Fall 2023',
    category: 'Academic',
    date: 'December 2023',
    description: 'Achieved GPA of 3.9+ for the semester',
    icon: '🏆',
    points: 100
  },
  {
    id: 2,
    title: 'Hackathon Winner - TechFest 2024',
    category: 'Competition',
    date: 'October 2024',
    description: 'First place in AI/ML track with innovative healthcare solution',
    icon: '🥇',
    points: 200
  },
  {
    id: 3,
    title: 'Research Publication',
    category: 'Research',
    date: 'September 2024',
    description: 'Co-authored paper on "Machine Learning in Healthcare" - IEEE Conference',
    icon: '📚',
    points: 150
  },
  {
    id: 4,
    title: 'Community Service Excellence',
    category: 'Service',
    date: 'August 2024',
    description: 'Completed 100+ hours of community service',
    icon: '❤️',
    points: 75
  },
  {
    id: 5,
    title: 'Student Council President',
    category: 'Leadership',
    date: 'March 2024',
    description: 'Elected as Student Council President for 2024-25',
    icon: '👑',
    points: 120
  },
  {
    id: 6,
    title: 'Programming Contest - Regional Winner',
    category: 'Competition',
    date: 'February 2024',
    description: 'First place in ACM-ICPC Regional Programming Contest',
    icon: '💻',
    points: 180
  }
];

const skillCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'Python', level: 92, verified: true },
      { name: 'JavaScript', level: 88, verified: true },
      { name: 'Java', level: 85, verified: false },
      { name: 'C++', level: 80, verified: false },
      { name: 'SQL', level: 87, verified: true }
    ]
  },
  {
    name: 'Web Technologies',
    skills: [
      { name: 'React.js', level: 90, verified: true },
      { name: 'Node.js', level: 82, verified: false },
      { name: 'HTML/CSS', level: 95, verified: true },
      { name: 'REST APIs', level: 85, verified: true }
    ]
  },
  {
    name: 'Data Science & AI',
    skills: [
      { name: 'Machine Learning', level: 83, verified: true },
      { name: 'Data Analysis', level: 87, verified: true },
      { name: 'TensorFlow', level: 75, verified: false },
      { name: 'Pandas/NumPy', level: 88, verified: true }
    ]
  },
  {
    name: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', level: 78, verified: true },
      { name: 'Docker', level: 70, verified: false },
      { name: 'Git/GitHub', level: 90, verified: true },
      { name: 'Azure', level: 72, verified: true }
    ]
  },
  {
    name: 'Soft Skills',
    skills: [
      { name: 'Leadership', level: 85, verified: true },
      { name: 'Public Speaking', level: 80, verified: false },
      { name: 'Project Management', level: 82, verified: true },
      { name: 'Team Collaboration', level: 90, verified: true }
    ]
  }
];

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(studentData.personalInfo);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setShowSaveConfirmation(true);
    toast.success('Profile updated successfully ✅');
    // Hide confirmation message after 2 seconds
    setTimeout(() => {
      setShowSaveConfirmation(false);
    }, 2000);
  };

  const handleShare = (platform: string) => {
    const profileUrl = 'https://studenthub.university.edu/profile/alex-johnson';
    const shareText = `Check out ${studentData.personalInfo.name}'s academic profile - ${studentData.personalInfo.department} student with ${studentData.academic.currentGPA} GPA`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + profileUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`, '_blank');
        break;
      case 'message':
        // For mobile, this would open the native messaging app
        if (navigator.share) {
          navigator.share({
            title: `${studentData.personalInfo.name}'s Profile`,
            text: shareText,
            url: profileUrl
          });
        } else {
          window.open(`sms:?body=${encodeURIComponent(shareText + ' ' + profileUrl)}`, '_blank');
        }
        break;
      case 'copy':
        navigator.clipboard.writeText(profileUrl);
        toast.success('Profile link copied to clipboard!');
        break;
    }
    setShareModalOpen(false);
  };

  const getSkillColor = (level: number) => {
    if (level >= 85) return 'bg-green-500';
    if (level >= 70) return 'bg-blue-500';
    if (level >= 55) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic': return '🎓';
      case 'Competition': return '🏆';
      case 'Research': return '🔬';
      case 'Service': return '🤝';
      case 'Leadership': return '👑';
      default: return '⭐';
    }
  };

  const generatePortfolio = () => {
    // Logic to generate and download portfolio
    console.log('Generating portfolio...');
  };

  const ShareModal = () => (
    <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
      <DialogContent className="bg-white/95 backdrop-blur-md rounded-3xl max-w-md border border-slate-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">Share Profile</DialogTitle>
          <DialogDescription className="text-slate-600">
            Choose how you'd like to share your student profile
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center p-4 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">WhatsApp</span>
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            className="flex flex-col items-center p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">LinkedIn</span>
          </button>

          <button
            onClick={() => handleShare('message')}
            className="flex flex-col items-center p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">Message</span>
          </button>

          <button
            onClick={() => handleShare('copy')}
            className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-slate-500 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Copy className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">Copy Link</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const CertificateModal = ({ certificate, onClose }: { certificate: any, onClose: () => void }) => (
    <Dialog open={!!certificate} onOpenChange={() => onClose()}>
      <DialogContent className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-2xl">
              {certificate.logo}
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-slate-800">{certificate.title}</DialogTitle>
              <DialogDescription className="text-slate-600">{certificate.issuer}</DialogDescription>
              <Badge variant="outline" className="mt-1">{certificate.level}</Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-slate-800 mb-2">Description</h3>
            <p className="text-slate-600">{certificate.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-slate-800 mb-2">Certificate Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Issue Date:</span>
                  <span className="font-medium">{certificate.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Expiry Date:</span>
                  <span className="font-medium">{certificate.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Credential ID:</span>
                  <span className="font-medium font-mono text-xs">{certificate.credentialId}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-slate-800 mb-2">Skills Covered</h4>
              <div className="flex flex-wrap gap-1">
                {certificate.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <ExternalLink className="w-4 h-4 mr-2" />
              Verify Certificate
            </Button>
            <Button variant="outline">
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Student Profile</h1>
            <p className="text-slate-600">Comprehensive academic and professional portfolio</p>
          </div>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                <Save className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                setFormData(studentData.personalInfo);
              }}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={generatePortfolio}>
                <Download className="w-4 h-4 mr-2" />
                Download Portfolio
              </Button>
              <Button variant="outline" onClick={() => setShareModalOpen(true)}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Success Confirmation */}
      {showSaveConfirmation && (
        <div className="fixed top-24 right-6 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center space-x-2 z-50 animate-in slide-in-from-right">
          <Check className="w-4 h-4" />
          <span>Profile updated successfully ✅</span>
        </div>
      )}

      {/* Student Header Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden">
              <ImageWithFallback
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing ? (
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 bg-blue-500 hover:bg-blue-600"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        handleInputChange('profileImage', e.target?.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
              >
                <Camera className="w-4 h-4 text-white" />
              </Button>
            ) : null}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                {isEditing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-semibold bg-white/80 border-2 border-blue-200 focus:border-blue-400"
                    placeholder="Enter your name"
                  />
                ) : (
                  <h2 className="text-2xl font-semibold text-slate-800">{formData.name}</h2>
                )}
                <p className="text-slate-600 mt-1">{studentData.personalInfo.department}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    Roll: {studentData.personalInfo.rollNumber}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700">
                    {studentData.personalInfo.year} • {studentData.personalInfo.batch}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    GPA: {studentData.academic.currentGPA}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                </div>
                <p className="text-sm text-slate-600">Academic Standing</p>
                <p className="font-medium text-slate-800">{studentData.academic.academicStanding}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-white/60 rounded-xl">
                <p className="text-lg font-semibold text-blue-600">{certificates.length}</p>
                <p className="text-sm text-slate-600">Certificates</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-xl">
                <p className="text-lg font-semibold text-purple-600">{achievements.length}</p>
                <p className="text-sm text-slate-600">Achievements</p>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-xl">
                <p className="text-lg font-semibold text-green-600">{studentData.academic.classRank}</p>
                <p className="text-sm text-slate-600">Class Rank</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Academic Progress */}
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                Academic Progress
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Degree Completion</span>
                    <span className="text-sm font-medium">
                      {studentData.academic.totalCredits}/{studentData.academic.requiredCredits} credits (78%)
                    </span>
                  </div>
                  <Progress value={78} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-600 mb-1">Current GPA</p>
                    <p className="text-xl font-semibold text-blue-800">{studentData.academic.currentGPA}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-600 mb-1">Cumulative GPA</p>
                    <p className="text-xl font-semibold text-green-800">{studentData.academic.cumulativeGPA}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Major:</span>
                    <span className="font-medium">{studentData.academic.major}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Specialization:</span>
                    <span className="font-medium">{studentData.academic.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Expected Graduation:</span>
                    <span className="font-medium">{studentData.academic.expectedGraduation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dean's List:</span>
                    <span className="font-medium">{studentData.academic.deansList} times</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-700 font-medium">Total Points</p>
                    <p className="text-2xl font-bold text-yellow-900">825</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-700 font-medium">Verified Skills</p>
                    <p className="text-2xl font-bold text-purple-900">18</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-teal-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-700 font-medium">Activity Hours</p>
                    <p className="text-2xl font-bold text-green-900">340</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Achievements Preview */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Recent Achievements
              </h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                View All <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.slice(0, 3).map((achievement) => (
                <div key={achievement.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 text-sm">{achievement.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{achievement.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">{achievement.category}</Badge>
                        <span className="text-xs text-slate-500">{achievement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Professional Certificates</h3>
              <p className="text-slate-600">Industry-recognized certifications and achievements</p>
            </div>
            <Badge variant="outline" className="text-slate-700">
              {certificates.length} certificates earned
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setSelectedCertificate(certificate)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-xl">
                    {certificate.logo}
                  </div>
                  <Badge variant="outline" className={
                    certificate.level === 'Professional' ? 'border-purple-300 text-purple-700' :
                    certificate.level === 'Foundation' ? 'border-blue-300 text-blue-700' :
                    'border-gray-300 text-gray-700'
                  }>
                    {certificate.level}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {certificate.title}
                    </h4>
                    <p className="text-sm text-slate-600">{certificate.issuer}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Issued: {certificate.issueDate}</span>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      Verified
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {certificate.skills.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{certificate.skills.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Achievements & Awards</h3>
              <p className="text-slate-600">Recognition for academic and extracurricular excellence</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">825</p>
              <p className="text-sm text-slate-600">Total Points</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center text-xl">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{achievement.title}</h4>
                      <div className="text-right">
                        <Badge className="bg-orange-100 text-orange-700">
                          +{achievement.points} pts
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{achievement.category}</Badge>
                      <span className="text-xs text-slate-500">{achievement.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Skills & Competencies</h3>
            <p className="text-slate-600">Technical and soft skills with proficiency levels and verification status</p>
          </div>

          <div className="space-y-6">
            {skillCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">{category.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                          {skill.verified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-slate-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
              {isEditing && (
                <div className="flex items-center space-x-2 text-sm text-blue-600">
                  <Edit className="w-4 h-4" />
                  <span>Edit mode active - Use controls in header to save</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your name"
                      className="border-2 border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-slate-800">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                      className="border-2 border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-slate-800">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="border-2 border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-slate-800">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  {isEditing ? (
                    <Textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address"
                      className="min-h-[80px] border-2 border-blue-200 focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-slate-800">{formData.address}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Student ID</label>
                  <p className="text-slate-800 font-mono">{studentData.personalInfo.studentId}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Roll Number</label>
                  <p className="text-slate-800 font-mono">{studentData.personalInfo.rollNumber}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <p className="text-slate-800">{studentData.personalInfo.department}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Academic Year</label>
                  <p className="text-slate-800">{studentData.personalInfo.year} • {studentData.personalInfo.semester}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Batch</label>
                  <p className="text-slate-800">{studentData.personalInfo.batch}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth</label>
                  <p className="text-slate-800">{studentData.personalInfo.dateOfBirth}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Share Modal */}
      <ShareModal />

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateModal 
          certificate={selectedCertificate} 
          onClose={() => setSelectedCertificate(null)} 
        />
      )}
    </div>
  );
}