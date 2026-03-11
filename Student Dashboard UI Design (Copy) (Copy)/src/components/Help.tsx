import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Info, 
  Search, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock,
  Book,
  Video,
  FileText,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  User,
  Settings,
  Shield,
  CreditCard,
  Smartphone,
  Download
} from 'lucide-react';

const faqData = [
  {
    id: 'account',
    category: 'Account & Profile',
    icon: User,
    questions: [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Profile > Edit Profile. You can update your personal information, profile picture, and contact details. Changes are saved automatically.'
      },
      {
        question: 'How do I change my password?',
        answer: 'Navigate to Settings > Security. Click on "Change Password" and follow the prompts to set a new secure password.'
      },
      {
        question: 'Can I link multiple email addresses?',
        answer: 'Yes, you can add up to 3 email addresses in Settings > Account. One will be your primary email for notifications.'
      }
    ]
  },
  {
    id: 'courses',
    category: 'Courses & Learning',
    icon: Book,
    questions: [
      {
        question: 'How do I access course materials?',
        answer: 'Course materials are available in the Learning section. Use filters to find specific subjects, or search by course name or instructor.'
      },
      {
        question: 'Can I download lecture videos?',
        answer: 'Yes, most lecture videos can be downloaded for offline viewing. Look for the download icon next to the video title.'
      },
      {
        question: 'How do I submit assignments?',
        answer: 'Go to Records > Assignments. Click on the assignment you want to submit, then use the "Upload File" button to submit your work.'
      },
      {
        question: 'What file formats are supported for submissions?',
        answer: 'We support PDF, DOC, DOCX, PPT, PPTX, ZIP, and most image formats. Maximum file size is 100MB per upload.'
      }
    ]
  },
  {
    id: 'grades',
    category: 'Grades & Progress',
    icon: FileText,
    questions: [
      {
        question: 'When are grades posted?',
        answer: 'Grades are typically posted within 5-7 business days after assignment submission. You\'ll receive a notification when grades are available.'
      },
      {
        question: 'How is my GPA calculated?',
        answer: 'Your GPA is calculated using a 4.0 scale based on credit hours and letter grades. You can view the detailed breakdown in your Dashboard.'
      },
      {
        question: 'Can I view my transcript online?',
        answer: 'Yes, unofficial transcripts are available in Records > Transcripts. For official transcripts, contact the registrar\'s office.'
      }
    ]
  },
  {
    id: 'technical',
    category: 'Technical Support',
    icon: Settings,
    questions: [
      {
        question: 'The app is running slowly. What should I do?',
        answer: 'Try clearing your browser cache, closing unnecessary tabs, or restarting your browser. For mobile apps, force close and reopen the app.'
      },
      {
        question: 'I can\'t access certain features. Why?',
        answer: 'Some features may be restricted based on your enrollment status or course permissions. Contact your instructor or IT support if the issue persists.'
      },
      {
        question: 'How do I report a bug?',
        answer: 'Use the "Report Issue" button below or email support@studyhub.edu with a detailed description and screenshots if possible.'
      }
    ]
  },
  {
    id: 'mobile',
    category: 'Mobile App',
    icon: Smartphone,
    questions: [
      {
        question: 'Is there a mobile app available?',
        answer: 'Yes! StudyHub is available for iOS and Android. Download from the App Store or Google Play Store.'
      },
      {
        question: 'How do I sync data between devices?',
        answer: 'Data syncs automatically when you\'re signed in. Make sure you\'re connected to the internet for real-time synchronization.'
      },
      {
        question: 'Can I use the app offline?',
        answer: 'Some features work offline, including downloaded materials and cached course content. Internet connection is required for submissions and real-time updates.'
      }
    ]
  },
  {
    id: 'privacy',
    category: 'Privacy & Security',
    icon: Shield,
    questions: [
      {
        question: 'How is my data protected?',
        answer: 'We use industry-standard encryption and security measures. Your data is stored securely and never shared with third parties without consent.'
      },
      {
        question: 'Can I control who sees my profile?',
        answer: 'Yes, privacy settings are available in Settings > Privacy. You can control visibility of your profile, activity, and contact information.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'Account deletion requests can be made through Settings > Account > Delete Account. Note that this action is permanent and cannot be undone.'
      }
    ]
  }
];

const supportChannels = [
  {
    title: 'Live Chat Support',
    description: 'Get instant help from our support team',
    availability: 'Mon-Fri, 9 AM - 6 PM',
    icon: MessageSquare,
    action: 'Start Chat',
    color: 'blue'
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message',
    availability: 'Response within 24 hours',
    icon: Mail,
    action: 'Send Email',
    color: 'green'
  },
  {
    title: 'Phone Support',
    description: 'Speak directly with a representative',
    availability: 'Mon-Fri, 10 AM - 4 PM',
    icon: Phone,
    action: 'Call Now',
    color: 'purple'
  }
];

const guides = [
  {
    title: 'Getting Started Guide',
    description: 'Complete walkthrough for new students',
    duration: '10 min read',
    icon: '🚀',
    category: 'Basics'
  },
  {
    title: 'Course Registration Process',
    description: 'Step-by-step registration guide',
    duration: '5 min read',
    icon: '📚',
    category: 'Registration'
  },
  {
    title: 'Using the Grade Center',
    description: 'Understanding your academic progress',
    duration: '7 min read',
    icon: '📊',
    category: 'Academics'
  },
  {
    title: 'Mobile App Features',
    description: 'Making the most of StudyHub mobile',
    duration: '8 min read',
    icon: '📱',
    category: 'Mobile'
  },
  {
    title: 'Privacy Settings Guide',
    description: 'Protecting your personal information',
    duration: '6 min read',
    icon: '🔒',
    category: 'Privacy'
  },
  {
    title: 'Troubleshooting Common Issues',
    description: 'Solutions to frequently reported problems',
    duration: '12 min read',
    icon: '🔧',
    category: 'Technical'
  }
];

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Account & Profile', 'Courses & Learning', 'Grades & Progress', 'Technical Support', 'Mobile App', 'Privacy & Security'];

  const filteredFAQs = faqData.filter(category => {
    const matchesCategory = selectedCategory === 'All' || category.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      category.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.questions.some(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
          <Info className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Help & Support</h1>
          <p className="text-slate-600">Find answers, guides, and get assistance</p>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search for help topics, questions, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200 rounded-xl"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-48"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Quick Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <Card key={index} className={`p-6 hover:shadow-lg transition-all duration-300 border-l-4 ${
              channel.color === 'blue' ? 'border-l-blue-500' :
              channel.color === 'green' ? 'border-l-green-500' :
              'border-l-purple-500'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={
                  channel.color === 'blue' ? 'w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center' :
                  channel.color === 'green' ? 'w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center' :
                  'w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'
                }>
                  <Icon className={
                    channel.color === 'blue' ? 'w-6 h-6 text-blue-600' :
                    channel.color === 'green' ? 'w-6 h-6 text-green-600' :
                    'w-6 h-6 text-purple-600'
                  } />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-2">{channel.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{channel.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>{channel.availability}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className={
                      channel.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      channel.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                      'bg-purple-600 hover:bg-purple-700'
                    }
                  >
                    {channel.action}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
          <HelpCircle className="w-5 h-5 mr-2 text-blue-600" />
          Frequently Asked Questions
        </h2>

        {filteredFAQs.length > 0 ? (
          <div className="space-y-6">
            {filteredFAQs.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="p-4 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-medium text-slate-800 flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-blue-600" />
                      {category.category}
                    </h3>
                  </div>
                  <Accordion type="single" collapsible className="px-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-medium text-slate-800">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-medium text-slate-800 mb-2">No results found</h3>
            <p className="text-slate-600">Try adjusting your search terms or browse all categories</p>
          </div>
        )}
      </Card>

      {/* Guides and Tutorials */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
          <Book className="w-5 h-5 mr-2 text-green-600" />
          Guides & Tutorials
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{guide.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                    {guide.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 mb-3">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {guide.category}
                    </Badge>
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {guide.duration}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Contact Footer */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200">
        <div className="text-center">
          <h3 className="font-semibold text-slate-800 mb-2">Still need help?</h3>
          <p className="text-slate-600 mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <ExternalLink className="w-4 h-4 mr-2" />
              Report an Issue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}