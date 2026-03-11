import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Award, 
  Download, 
  Share2, 
  Calendar, 
  Building,
  Search,
  Filter,
  ExternalLink,
  Star,
  Eye
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const certificates = [
  {
    id: 1,
    title: 'Python Programming Fundamentals',
    issuer: 'Tech Institute',
    issueDate: '2024-01-15',
    expiryDate: '2026-01-15',
    category: 'Programming',
    credentialId: 'TI-PY-2024-001',
    skills: ['Python', 'Programming', 'Data Types'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1612215670548-612dd2de09ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBhY2FkZW1pY3xlbnwxfHx8fDE3NTc0Mzk2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Comprehensive certification covering Python fundamentals, data structures, and object-oriented programming.',
    grade: 'A+',
    creditsEarned: 3
  },
  {
    id: 2,
    title: 'Web Development with React',
    issuer: 'CodeAcademy',
    issueDate: '2024-01-10',
    expiryDate: '2025-01-10',
    category: 'Web Development',
    credentialId: 'CA-REACT-2024-045',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1612215670548-612dd2de09ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBhY2FkZW1pY3xlbnwxfHx8fDE3NTc0Mzk2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Advanced React development certification including hooks, state management, and modern practices.',
    grade: 'A',
    creditsEarned: 4
  },
  {
    id: 3,
    title: 'Data Analysis with Python',
    issuer: 'DataCamp',
    issueDate: '2024-01-08',
    expiryDate: '2025-01-08',
    category: 'Data Science',
    credentialId: 'DC-DA-2024-023',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Analysis'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1612215670548-612dd2de09ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBhY2FkZW1pY3xlbnwxfHx8fDE3NTc0Mzk2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Professional certification in data analysis techniques using Python and popular libraries.',
    grade: 'A+',
    creditsEarned: 3
  },
  {
    id: 4,
    title: 'Machine Learning Basics',
    issuer: 'AI Institute',
    issueDate: '2023-12-20',
    expiryDate: '2024-12-20',
    category: 'Artificial Intelligence',
    credentialId: 'AI-ML-2023-089',
    skills: ['Machine Learning', 'Scikit-learn', 'Statistics'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1612215670548-612dd2de09ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBhY2FkZW1pY3xlbnwxfHx8fDE3NTc0Mzk2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Introduction to machine learning concepts, algorithms, and practical implementation.',
    grade: 'B+',
    creditsEarned: 4
  },
  {
    id: 5,
    title: 'Digital Marketing Fundamentals',
    issuer: 'Marketing Pro',
    issueDate: '2023-11-15',
    expiryDate: '2024-11-15',
    category: 'Marketing',
    credentialId: 'MP-DM-2023-156',
    skills: ['Digital Marketing', 'SEO', 'Social Media'],
    verified: false,
    imageUrl: 'https://images.unsplash.com/photo-1612215670548-612dd2de09ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBhY2FkZW1pY3xlbnwxfHx8fDE3NTc0Mzk2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Comprehensive course covering digital marketing strategies and implementation.',
    grade: 'A-',
    creditsEarned: 2
  },
  {
    id: 6,
    title: 'Cybersecurity Essentials',
    issuer: 'SecureNet Academy',
    issueDate: '2023-10-30',
    expiryDate: '2025-10-30',
    category: 'Security',
    credentialId: 'SN-CS-2023-078',
    skills: ['Cybersecurity', 'Network Security', 'Encryption'],
    verified: true,
    imageUrl: 'https://images.unsplash.com/photo-1612215670548-612dd2de09ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJ0aWZpY2F0ZSUyMGdyYWR1YXRpb24lMjBhY2FkZW1pY3xlbnwxfHx8fDE3NTc0Mzk2NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Essential cybersecurity concepts and practices for protecting digital assets.',
    grade: 'A',
    creditsEarned: 3
  }
];

const categories = ['All', 'Programming', 'Web Development', 'Data Science', 'Artificial Intelligence', 'Marketing', 'Security'];

export function Certificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalCredits = certificates.reduce((sum, cert) => sum + cert.creditsEarned, 0);
  const verifiedCount = certificates.filter(cert => cert.verified).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Certificates</h1>
          <p className="text-slate-600 mt-1">Your professional certifications and achievements</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share Portfolio
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500">
            <Download className="w-4 h-4 mr-2" />
            Download Portfolio
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Certificates</p>
              <p className="text-3xl font-bold text-blue-900">{certificates.length}</p>
            </div>
            <Award className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Verified</p>
              <p className="text-3xl font-bold text-green-900">{verifiedCount}</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Credits Earned</p>
              <p className="text-3xl font-bold text-purple-900">{totalCredits}</p>
            </div>
            <Building className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Categories</p>
              <p className="text-3xl font-bold text-orange-900">{categories.length - 1}</p>
            </div>
            <Filter className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search certificates by title, issuer, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Category:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-slate-100'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Certificate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            {/* Certificate Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
              <ImageWithFallback
                src={certificate.imageUrl}
                alt={certificate.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                {certificate.verified ? (
                  <Badge className="bg-green-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="secondary">Pending</Badge>
                )}
              </div>
              <div className="absolute top-4 left-4">
                <Badge variant="outline" className="bg-white/90">
                  {certificate.category}
                </Badge>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Title and Issuer */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-1 line-clamp-2">
                  {certificate.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Building className="w-4 h-4" />
                  <span>{certificate.issuer}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {certificate.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {certificate.skills.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{certificate.skills.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Meta Info */}
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Issued: {certificate.issueDate}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Grade: {certificate.grade}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Credits: {certificate.creditsEarned}</span>
                  <span>Expires: {certificate.expiryDate}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  onClick={() => setSelectedCertificate(certificate)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCertificates.length === 0 && (
        <Card className="p-12 text-center">
          <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">No certificates found</h3>
          <p className="text-slate-600">Try adjusting your search criteria or filters</p>
        </Card>
      )}

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Certificate Image */}
              <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                <ImageWithFallback
                  src={selectedCertificate.imageUrl}
                  alt={selectedCertificate.title}
                  className="w-full h-full object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute top-4 right-4 bg-white hover:bg-slate-100"
                  onClick={() => setSelectedCertificate(null)}
                >
                  ×
                </Button>
                {selectedCertificate.verified && (
                  <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="p-6 space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {selectedCertificate.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Building className="w-4 h-4" />
                      <span>{selectedCertificate.issuer}</span>
                    </div>
                    <Badge variant="outline">{selectedCertificate.category}</Badge>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-slate-600">{selectedCertificate.description}</p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-medium mb-2">Skills Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Issue Date:</span>
                    <span className="ml-2 font-medium">{selectedCertificate.issueDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Expiry Date:</span>
                    <span className="ml-2 font-medium">{selectedCertificate.expiryDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Grade:</span>
                    <span className="ml-2 font-medium">{selectedCertificate.grade}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Credits:</span>
                    <span className="ml-2 font-medium">{selectedCertificate.creditsEarned}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-600">Credential ID:</span>
                    <span className="ml-2 font-medium font-mono text-xs">{selectedCertificate.credentialId}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Credential
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}