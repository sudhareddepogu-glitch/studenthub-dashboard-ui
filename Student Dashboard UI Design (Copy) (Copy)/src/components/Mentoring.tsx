import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  UserCheck, 
  MessageSquare, 
  Calendar, 
  Clock, 
  BookOpen, 
  Star,
  Users,
  Video,
  Phone,
  Send,
  Paperclip,
  MoreVertical,
  ChevronRight,
  Award,
  TrendingUp,
  Target,
  Lightbulb
} from 'lucide-react';

const myMentors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'Senior Software Engineer at Google',
    expertise: ['Machine Learning', 'System Design', 'Career Guidance'],
    avatar: '👩‍💼',
    rating: 4.9,
    sessions: 12,
    nextSession: 'Sept 18, 2024 at 2:00 PM',
    recentGuidance: [
      {
        id: 1,
        title: 'System Design Interview Preparation',
        content: 'Focus on scalability patterns and practice with real-world examples. I\'ve shared some resources that will help you understand distributed systems better.',
        date: 'Sept 10, 2024',
        type: 'guidance'
      },
      {
        id: 2,
        title: 'Career Path Discussion',
        content: 'Based on your interests in AI and your strong programming skills, I recommend exploring roles in ML Engineering. The market is very promising.',
        date: 'Sept 5, 2024',
        type: 'career'
      }
    ],
    resources: [
      { title: 'System Design Primer', type: 'GitHub Repo', url: '#' },
      { title: 'ML Interview Questions', type: 'PDF', url: '#' }
    ]
  },
  {
    id: 2,
    name: 'Prof. Michael Rodriguez',
    role: 'Assistant Professor, Computer Science',
    expertise: ['Research', 'Academic Writing', 'PhD Applications'],
    avatar: '👨‍🏫',
    rating: 4.8,
    sessions: 8,
    nextSession: 'Sept 20, 2024 at 4:00 PM',
    recentGuidance: [
      {
        id: 1,
        title: 'Research Project Feedback',
        content: 'Your approach to the NLP project is solid. Consider adding more baseline comparisons and statistical significance tests to strengthen your methodology.',
        date: 'Sept 8, 2024',
        type: 'research'
      }
    ],
    resources: [
      { title: 'Research Methodology Guide', type: 'PDF', url: '#' },
      { title: 'Academic Writing Tips', type: 'Document', url: '#' }
    ]
  }
];

const availableMentors = [
  {
    id: 3,
    name: 'Jennifer Liu',
    role: 'Product Manager at Microsoft',
    expertise: ['Product Management', 'Strategy', 'Leadership'],
    avatar: '👩‍💻',
    rating: 4.7,
    students: 15,
    experience: '8 years',
    bio: 'Passionate about helping students transition from engineering to product roles. Specialized in B2B SaaS products.',
    availability: 'Weekends'
  },
  {
    id: 4,
    name: 'David Kumar',
    role: 'Senior Data Scientist at Netflix',
    expertise: ['Data Science', 'Analytics', 'Machine Learning'],
    avatar: '👨‍💼',
    rating: 4.9,
    students: 12,
    experience: '6 years',
    bio: 'Expert in recommendation systems and A/B testing. Love mentoring students interested in data science careers.',
    availability: 'Evenings'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    role: 'UX Design Lead at Adobe',
    expertise: ['UX Design', 'Design Thinking', 'Portfolio Review'],
    avatar: '👩‍🎨',
    rating: 4.8,
    students: 20,
    experience: '10 years',
    bio: 'Helping students build strong design portfolios and develop user-centered thinking. Industry experience across B2B and B2C products.',
    availability: 'Flexible'
  }
];

const upcomingSessions = [
  {
    id: 1,
    mentor: 'Dr. Sarah Chen',
    title: 'Mock System Design Interview',
    date: 'Sept 18, 2024',
    time: '2:00 PM - 3:00 PM',
    type: 'video',
    agenda: 'Practice designing a distributed cache system'
  },
  {
    id: 2,
    mentor: 'Prof. Michael Rodriguez',
    title: 'Research Paper Review',
    date: 'Sept 20, 2024',
    time: '4:00 PM - 4:30 PM',
    type: 'video',
    agenda: 'Review draft of NLP research paper'
  }
];

const mentorshipStats = {
  totalSessions: 20,
  totalHours: 25,
  avgRating: 4.8,
  goalsAchieved: 7
};

export function Mentoring() {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center">
          <UserCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Mentoring</h1>
          <p className="text-slate-600">Connect with mentors and accelerate your growth</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-700 font-medium">Total Sessions</p>
              <p className="text-2xl font-bold text-teal-900">{mentorshipStats.totalSessions}</p>
            </div>
            <Calendar className="w-8 h-8 text-teal-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 font-medium">Learning Hours</p>
              <p className="text-2xl font-bold text-blue-900">{mentorshipStats.totalHours}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 font-medium">Avg Rating</p>
              <p className="text-2xl font-bold text-purple-900">{mentorshipStats.avgRating}</p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Goals Achieved</p>
              <p className="text-2xl font-bold text-green-900">{mentorshipStats.goalsAchieved}</p>
            </div>
            <Target className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-lg">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="my-mentors">My Mentors</TabsTrigger>
          <TabsTrigger value="find-mentors">Find Mentors</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Sessions */}
            <Card className="lg:col-span-2 p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Upcoming Sessions
              </h3>
              
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-slate-800">{session.title}</h4>
                        <p className="text-sm text-slate-600">with {session.mentor}</p>
                      </div>
                      <Badge variant="outline" className="text-blue-700 border-blue-300">
                        {session.type === 'video' ? <Video className="w-3 h-3 mr-1" /> : <Phone className="w-3 h-3 mr-1" />}
                        {session.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{session.date} • {session.time}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join Session
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 italic">"{session.agenda}"</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Guidance */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                Recent Guidance
              </h3>
              
              <div className="space-y-4">
                {myMentors[0].recentGuidance.slice(0, 2).map((guidance) => (
                  <div key={guidance.id} className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <h4 className="font-medium text-slate-800 text-sm mb-1">{guidance.title}</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">{guidance.content}</p>
                    <p className="text-xs text-slate-500 mt-2">{guidance.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Progress Tracking */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Your Progress Journey
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-medium text-slate-800">Learning Goals</h4>
                <p className="text-sm text-slate-600 mt-1">7 of 10 completed</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-medium text-slate-800">Skill Development</h4>
                <p className="text-sm text-slate-600 mt-1">System Design, ML</p>
                <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-700">
                  Advanced
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-medium text-slate-800">Career Readiness</h4>
                <p className="text-sm text-slate-600 mt-1">Interview prep complete</p>
                <Badge className="mt-2 bg-green-100 text-green-700">
                  Ready
                </Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* My Mentors Tab */}
        <TabsContent value="my-mentors" className="space-y-6">
          <div className="space-y-6">
            {myMentors.map((mentor) => (
              <Card key={mentor.id} className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                      {mentor.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800">{mentor.name}</h3>
                      <p className="text-slate-600">{mentor.role}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-slate-600">{mentor.rating}</span>
                        </div>
                        <span className="text-sm text-slate-600">{mentor.sessions} sessions</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Guidance */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Recent Guidance
                    </h4>
                    <div className="space-y-3">
                      {mentor.recentGuidance.map((guidance) => (
                        <div key={guidance.id} className="p-3 bg-slate-50 rounded-xl">
                          <h5 className="font-medium text-slate-800 text-sm mb-1">{guidance.title}</h5>
                          <p className="text-sm text-slate-600 line-clamp-2">{guidance.content}</p>
                          <p className="text-xs text-slate-500 mt-2">{guidance.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources & Expertise */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Expertise & Resources
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-600 mb-2">Areas of Expertise:</p>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-2">Shared Resources:</p>
                        <div className="space-y-1">
                          {mentor.resources.map((resource, index) => (
                            <a key={index} href={resource.url} className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                              <span>{resource.title}</span>
                              <div className="flex items-center space-x-1">
                                <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                                <ChevronRight className="w-3 h-3" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {mentor.nextSession && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Next session: {mentor.nextSession}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Find Mentors Tab */}
        <TabsContent value="find-mentors" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Available Mentors</h3>
            <Badge variant="outline" className="text-slate-700">
              {availableMentors.length} mentors available
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableMentors.map((mentor) => (
              <Card key={mentor.id} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    {mentor.avatar}
                  </div>
                  <h3 className="font-semibold text-slate-800">{mentor.name}</h3>
                  <p className="text-sm text-slate-600">{mentor.role}</p>
                  <div className="flex items-center justify-center space-x-4 mt-2 text-sm text-slate-500">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {mentor.rating}
                    </div>
                    <span>{mentor.students} students</span>
                    <span>{mentor.experience} exp.</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-4 text-center line-clamp-3">{mentor.bio}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-slate-800 mb-1">Expertise:</p>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Availability:</span>
                    <Badge variant="outline" className="text-green-700 border-green-300">
                      {mentor.availability}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600">
                    Request Mentorship
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}