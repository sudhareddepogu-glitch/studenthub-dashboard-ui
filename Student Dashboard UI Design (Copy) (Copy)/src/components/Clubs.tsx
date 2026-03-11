import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { VoiceSearch } from './VoiceSearch';
import { toast } from 'sonner@2.0.3';
import { 
  Users, 
  Search, 
  UserPlus, 
  MessageCircle, 
  Calendar, 
  Star,
  Crown,
  Clock,
  MapPin,
  Heart,
  Bookmark,
  Filter,
  TrendingUp,
  Check,
  ExternalLink,
  X
} from 'lucide-react';

const joinedClubs = [
  {
    id: 1,
    name: 'Computer Science Society',
    icon: '💻',
    members: 245,
    role: 'Member',
    joinedDate: 'Aug 2023',
    instagram: {
      handle: '@cs_society_vnr',
      connected: false
    },
    recentPosts: [
      { id: 1, title: 'React.js Workshop - Sept 18th', content: 'Join us for an intensive React workshop covering hooks, state management, and best practices!', time: '2h ago', likes: 23 },
      { id: 2, title: 'Hackathon Winners Announced!', content: 'Congratulations to Team Alpha for winning first place in our annual hackathon!', time: '1d ago', likes: 45 },
      { id: 3, title: 'Guest Lecture: AI in Healthcare', content: 'Dr. Sarah Chen from MIT will be speaking about AI applications in healthcare. Don\'t miss it!', time: '3d ago', likes: 32 }
    ],
    upcomingEvents: [
      { title: 'React Workshop', date: 'Sept 18', time: '2:00 PM' },
      { title: 'Tech Talk Series', date: 'Sept 25', time: '4:00 PM' }
    ],
    activities: [
      { 
        id: 1, 
        title: 'Code for Good Initiative', 
        type: 'Community Service',
        description: 'Developing software solutions for local non-profits and community organizations',
        participants: 45,
        impact: 'Helped 8 local charities',
        badge: '🌍',
        tags: ['Social Impact', 'Technology', 'Community']
      },
      { 
        id: 2, 
        title: 'Tech Mentorship Program', 
        type: 'Volunteering',
        description: 'Mentoring high school students interested in computer science and programming',
        participants: 32,
        impact: '120+ students mentored',
        badge: '👥',
        tags: ['Education', 'Mentorship', 'Outreach']
      },
      { 
        id: 3, 
        title: 'Digital Literacy Workshops', 
        type: 'Community Service',
        description: 'Teaching basic computer skills to seniors in the community center',
        participants: 28,
        impact: '200+ seniors trained',
        badge: '💻',
        tags: ['Education', 'Digital Inclusion', 'Seniors']
      }
    ]
  },
  {
    id: 2,
    name: 'Photography Club',
    icon: '📸',
    members: 89,
    role: 'Vice President',
    joinedDate: 'Sep 2023',
    instagram: {
      handle: '@vnr_photography',
      connected: true
    },
    recentPosts: [
      { id: 1, title: 'Monthly Photo Contest - Theme: Nature', content: 'Submit your best nature photography by September 20th. Winner gets a $100 camera equipment voucher!', time: '4h ago', likes: 18 },
      { id: 2, title: 'Photo Walk - Central Park', content: 'Join us this Saturday for a group photo walk in Central Park. Meet at the main entrance at 10 AM.', time: '2d ago', likes: 27 },
    ],
    upcomingEvents: [
      { title: 'Photo Walk', date: 'Sept 16', time: '10:00 AM' },
      { title: 'Portfolio Review', date: 'Sept 22', time: '3:00 PM' }
    ],
    activities: [
      { 
        id: 1, 
        title: 'Capture Hope Project', 
        type: 'Community Service',
        description: 'Photographing events and creating promotional materials for local charities',
        participants: 25,
        impact: '15 charities supported',
        badge: '📸',
        tags: ['Photography', 'Non-profit', 'Marketing']
      },
      { 
        id: 2, 
        title: 'Visual Storytelling for Causes', 
        type: 'Volunteering',
        description: 'Creating photo essays to raise awareness about social issues',
        participants: 18,
        impact: '5 campaigns launched',
        badge: '📖',
        tags: ['Social Awareness', 'Visual Arts', 'Advocacy']
      },
      { 
        id: 3, 
        title: 'Free Portrait Sessions', 
        type: 'Community Service',
        description: 'Providing professional headshots for job seekers and students',
        participants: 22,
        impact: '300+ portraits taken',
        badge: '🎭',
        tags: ['Professional Development', 'Career Support', 'Community']
      }
    ]
  },
  {
    id: 3,
    name: 'Student Council',
    icon: '🏛️',
    members: 156,
    role: 'Member',
    joinedDate: 'Jan 2024',
    instagram: {
      handle: '@student_council_vnr',
      connected: false
    },
    recentPosts: [
      { id: 1, title: 'Monthly Meeting Rescheduled', content: 'Due to the upcoming career fair, our monthly meeting has been moved to Friday, September 22nd at 5 PM.', time: '1d ago', likes: 12 },
      { id: 2, title: 'New Campus Food Options', content: 'We\'re excited to announce that two new food trucks will be joining our campus dining options next month!', time: '4d ago', likes: 34 }
    ],
    upcomingEvents: [
      { title: 'Monthly Meeting', date: 'Sept 22', time: '5:00 PM' }
    ],
    activities: [
      { 
        id: 1, 
        title: 'Campus Sustainability Initiative', 
        type: 'Environmental Action',
        description: 'Leading campus-wide recycling programs and sustainability awareness campaigns',
        participants: 65,
        impact: '40% waste reduction',
        badge: '♻️',
        tags: ['Environment', 'Sustainability', 'Campus Life']
      },
      { 
        id: 2, 
        title: 'Student Voice Advocacy', 
        type: 'Representation',
        description: 'Representing student interests in university policy discussions and decisions',
        participants: 12,
        impact: '8 policy changes',
        badge: '🗳️',
        tags: ['Governance', 'Student Rights', 'Policy']
      },
      { 
        id: 3, 
        title: 'Peer Support Network', 
        type: 'Community Support',
        description: 'Organizing mental health awareness events and peer counseling programs',
        participants: 35,
        impact: '500+ students helped',
        badge: '💚',
        tags: ['Mental Health', 'Support', 'Wellness']
      }
    ]
  }
];

const exploreClubs = [
  {
    id: 4,
    name: 'Robotics Club',
    icon: '🤖',
    members: 134,
    category: 'Technical',
    description: 'Build, program, and compete with robots. From beginners to advanced robotics enthusiasts.',
    rating: 4.8,
    tags: ['Engineering', 'Programming', 'Competition'],
    recentActivity: 'Won Regional Robotics Championship',
    nextEvent: { title: 'Robot Building Workshop', date: 'Sept 20' },
    instagram: {
      handle: '@robotics_vnr',
      connected: false
    }
  },
  {
    id: 5,
    name: 'Drama Society',
    icon: '🎭',
    members: 78,
    category: 'Arts',
    description: 'Express yourself through theater! We welcome actors, directors, writers, and tech crew.',
    rating: 4.6,
    tags: ['Theater', 'Performance', 'Creative'],
    recentActivity: 'Spring Play rehearsals starting',
    nextEvent: { title: 'Auditions - Romeo & Juliet', date: 'Sept 18' }
  },
  {
    id: 6,
    name: 'Environmental Club',
    icon: '🌱',
    members: 167,
    category: 'Social Impact',
    description: 'Making our campus and community more sustainable through action and awareness.',
    rating: 4.7,
    tags: ['Sustainability', 'Community', 'Volunteer'],
    recentActivity: 'Campus clean-up drive organized',
    nextEvent: { title: 'Tree Planting Drive', date: 'Sept 24' }
  },
  {
    id: 7,
    name: 'Debate Society',
    icon: '🗣️',
    members: 92,
    category: 'Academic',
    description: 'Sharpen your critical thinking and public speaking skills through competitive debate.',
    rating: 4.5,
    tags: ['Public Speaking', 'Logic', 'Competition'],
    recentActivity: 'Qualified for National Championships',
    nextEvent: { title: 'Weekly Practice Session', date: 'Sept 17' }
  },
  {
    id: 8,
    name: 'Music Club',
    icon: '🎵',
    members: 203,
    category: 'Arts',
    description: 'From classical to contemporary - join fellow musicians for performances and collaborations.',
    rating: 4.9,
    tags: ['Music', 'Performance', 'Collaboration'],
    recentActivity: 'Annual concert preparations',
    nextEvent: { title: 'Jam Session', date: 'Sept 19' }
  },
  {
    id: 9,
    name: 'Entrepreneurship Club',
    icon: '💡',
    members: 115,
    category: 'Business',
    description: 'Turn your ideas into reality. Network with like-minded innovators and learn from successful entrepreneurs.',
    rating: 4.6,
    tags: ['Startup', 'Business', 'Innovation'],
    recentActivity: 'Pitch Competition winners announced',
    nextEvent: { title: 'Startup Pitch Night', date: 'Sept 26' }
  }
];

export function Clubs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [instagramDialogOpen, setInstagramDialogOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubConnections, setClubConnections] = useState({});

  const categories = ['All', 'Technical', 'Arts', 'Social Impact', 'Academic', 'Business'];

  const filteredClubs = exploreClubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         club.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstagramConnect = (club) => {
    setSelectedClub(club);
    setInstagramDialogOpen(true);
  };

  const simulateInstagramConnect = () => {
    setInstagramDialogOpen(false);
    
    // Simulate connection loading
    toast.loading('Connecting to Instagram...', { id: 'instagram-connect' });
    
    setTimeout(() => {
      setClubConnections(prev => ({
        ...prev,
        [selectedClub.id]: true
      }));
      toast.success('Instagram connected successfully! ✅', { id: 'instagram-connect' });
    }, 2000);
  };

  const handleInstagramDisconnect = (clubId) => {
    setClubConnections(prev => ({
      ...prev,
      [clubId]: false
    }));
    toast('Disconnected from Instagram', { 
      icon: '📱',
      style: { color: '#64748b' }
    });
  };

  const handleInstagramOpen = (handle) => {
    // Simulate opening Instagram
    window.open(`https://instagram.com/${handle.replace('@', '')}`, '_blank');
    toast.success('Opening Instagram...', { icon: '📱' });
  };

  const isConnected = (clubId) => {
    return clubConnections[clubId] || 
           (clubId === 2 && clubConnections[clubId] !== false); // Photography club starts connected
  };

  const handleVoiceSearch = (transcript: string) => {
    setSearchQuery(transcript);
    toast.success(`Voice search: "${transcript}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Clubs & Organizations</h1>
          <p className="text-slate-600">Connect with communities that share your interests</p>
        </div>
      </div>

      <Tabs defaultValue="joined" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="joined" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Joined Clubs</span>
          </TabsTrigger>
          <TabsTrigger value="explore" className="flex items-center space-x-2">
            <Search className="w-4 h-4" />
            <span>Explore Clubs</span>
          </TabsTrigger>
        </TabsList>

        {/* Joined Clubs Tab */}
        <TabsContent value="joined" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {joinedClubs.map((club) => (
              <Card key={club.id} className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-2xl">
                      {club.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
                        <span>{club.name}</span>
                        {club.role === 'Vice President' && <Crown className="w-4 h-4 text-yellow-500" />}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600 mt-1">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {club.members} members
                        </span>
                        <Badge variant="outline" className="text-purple-700 border-purple-300">
                          {club.role}
                        </Badge>
                        <span>Joined {club.joinedDate}</span>
                      </div>
                      
                      {/* Instagram Integration */}
                      {club.instagram && (
                        <div className="flex items-center space-x-3 mt-3">
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </div>
                            <span className="text-sm text-slate-600">{club.instagram.handle}</span>
                          </div>
                          
                          {isConnected(club.id) ? (
                            <div className="flex items-center space-x-2">
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 h-7 px-3"
                                onClick={() => handleInstagramOpen(club.instagram.handle)}
                              >
                                <Check className="w-3 h-3 mr-1" />
                                <span className="text-xs">Open</span>
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="h-7 px-2 text-xs"
                                onClick={() => handleInstagramDisconnect(club.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-7 px-3 text-xs border-purple-300 text-purple-700 hover:bg-purple-50"
                              onClick={() => handleInstagramConnect(club)}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Posts */}
                  <div className="lg:col-span-2">
                    <h4 className="font-medium text-slate-800 mb-4 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Recent Updates
                    </h4>
                    <div className="space-y-4">
                      {club.recentPosts.map((post) => (
                        <div key={post.id} className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                          <h5 className="font-medium text-slate-800 mb-2">{post.title}</h5>
                          <p className="text-sm text-slate-600 mb-3">{post.content}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {post.time}
                            </span>
                            <span className="flex items-center">
                              <Heart className="w-3 h-3 mr-1" />
                              {post.likes} likes
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-4 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Upcoming Events
                    </h4>
                    <div className="space-y-3">
                      {club.upcomingEvents.map((event, index) => (
                        <div key={index} className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                          <h6 className="font-medium text-purple-800 text-sm">{event.title}</h6>
                          <p className="text-xs text-purple-600 mt-1">
                            {event.date} • {event.time}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Activities Section */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-medium text-slate-800 mb-4 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Community Activities & Impact
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {club.activities.map((activity) => (
                      <div key={activity.id} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 hover:shadow-md transition-all">
                        <div className="flex items-start space-x-3">
                          <span className="text-2xl">{activity.badge}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-slate-800 text-sm">{activity.title}</h5>
                              <Badge variant="outline" className="text-xs">
                                {activity.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-600 mb-3">{activity.description}</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">Participants:</span>
                                <span className="font-medium text-purple-600">{activity.participants}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-500">Impact:</span>
                                <span className="font-medium text-green-600">{activity.impact}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {activity.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs bg-white/60">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white">
                              <Users className="w-3 h-3 mr-1" />
                              Join Activity
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Explore Clubs Tab */}
        <TabsContent value="explore" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search clubs by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-16 bg-white/60 backdrop-blur-sm border-slate-200 rounded-xl"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <VoiceSearch onTranscript={handleVoiceSearch} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <Card key={club.id} className="p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-xl">
                      {club.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors">
                        {club.name}
                      </h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {club.category}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{club.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-slate-600">
                      <Users className="w-4 h-4 mr-1" />
                      {club.members} members
                    </span>
                    <div className="flex items-center text-yellow-600">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      {club.rating}
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-slate-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {club.recentActivity}
                  </div>

                  {club.nextEvent && (
                    <div className="flex items-center text-sm text-purple-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {club.nextEvent.title} • {club.nextEvent.date}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {club.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Instagram Integration for Explore Clubs */}
                {club.instagram && (
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-4 border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                      <span className="text-xs text-slate-600">{club.instagram.handle}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-6 px-2 text-xs border-purple-300 text-purple-700 hover:bg-purple-50"
                      onClick={() => handleInstagramConnect(club)}
                    >
                      Connect
                    </Button>
                  </div>
                )}

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Club
                </Button>
              </Card>
            ))}
          </div>

          {filteredClubs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-800 mb-2">No clubs found</h3>
              <p className="text-slate-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Instagram Connection Dialog */}
      <Dialog open={instagramDialogOpen} onOpenChange={setInstagramDialogOpen}>
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              Connect to Instagram
            </DialogTitle>
            <DialogDescription>
              Connect with {selectedClub?.name} on Instagram to stay updated with their latest activities.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <p className="text-sm text-slate-700 mb-2">
                To view this club's Instagram, sign in via Instagram. We never ask for or store your password.
              </p>
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure OAuth authentication</span>
              </div>
            </div>

            {selectedClub && (
              <div className="bg-white/80 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{selectedClub.icon}</div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{selectedClub.name}</h4>
                    <p className="text-sm text-slate-600">{selectedClub.instagram?.handle}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={simulateInstagramConnect}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Continue → Instagram
              </Button>
              <Button 
                variant="outline" 
                className="px-4"
                onClick={() => setInstagramDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}