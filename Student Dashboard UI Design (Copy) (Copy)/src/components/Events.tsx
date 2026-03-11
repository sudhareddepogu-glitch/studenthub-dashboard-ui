import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { VoiceSearch } from './VoiceSearch';
import { toast } from 'sonner@2.0.3';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  QrCode,
  Grid3X3,
  List,
  Filter,
  Search,
  Star,
  Trophy,
  Camera,
  Plus,
  ExternalLink,
  Heart,
  Share2,
  CheckCircle,
  User
} from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'AI & Machine Learning Symposium',
    category: 'Technical',
    date: '2024-09-28',
    time: '9:00 AM - 5:00 PM',
    location: 'Tech Auditorium, Block A',
    description: 'Join industry experts and researchers for a full-day symposium on the latest advances in AI and ML.',
    organizer: 'Computer Science Department',
    capacity: 200,
    registered: 156,
    price: 'Free',
    status: 'upcoming',
    registered_by_user: false,
    image: '🤖',
    tags: ['AI', 'Machine Learning', 'Research', 'Industry'],
    speakers: ['Dr. Sarah Chen (Google)', 'Prof. Michael Rodriguez', 'Lisa Wang (Meta)'],
    agenda: [
      { time: '9:00 AM', topic: 'Registration & Welcome' },
      { time: '9:30 AM', topic: 'Keynote: Future of AI' },
      { time: '11:00 AM', topic: 'ML in Healthcare' },
      { time: '2:00 PM', topic: 'Panel Discussion' }
    ],
    gallery: [],
    achievements: []
  },
  {
    id: 2,
    title: 'Annual Cultural Festival - Vibrancy 2024',
    category: 'Cultural',
    date: '2024-10-15',
    time: '4:00 PM - 10:00 PM',
    location: 'Main Campus Ground',
    description: 'A celebration of diverse cultures with music, dance, food, and art exhibitions from around the world.',
    organizer: 'Cultural Committee',
    capacity: 1500,
    registered: 892,
    price: '₹50',
    status: 'upcoming',
    registered_by_user: true,
    image: '🎭',
    tags: ['Culture', 'Music', 'Dance', 'Food', 'Art'],
    speakers: [],
    agenda: [
      { time: '4:00 PM', topic: 'Opening Ceremony' },
      { time: '5:00 PM', topic: 'Cultural Performances' },
      { time: '7:00 PM', topic: 'Food Festival' },
      { time: '9:00 PM', topic: 'Grand Finale' }
    ],
    gallery: [],
    achievements: []
  },
  {
    id: 3,
    title: 'Inter-College Basketball Championship',
    category: 'Sports',
    date: '2024-10-05',
    time: '8:00 AM - 6:00 PM',
    location: 'Sports Complex',
    description: 'Annual basketball tournament featuring teams from 12 colleges competing for the championship title.',
    organizer: 'Sports Department',
    capacity: 500,
    registered: 45,
    price: 'Free',
    status: 'upcoming',
    registered_by_user: false,
    image: '🏀',
    tags: ['Basketball', 'Sports', 'Competition', 'Tournament'],
    speakers: [],
    agenda: [
      { time: '8:00 AM', topic: 'Team Registration' },
      { time: '9:00 AM', topic: 'Quarter Finals' },
      { time: '2:00 PM', topic: 'Semi Finals' },
      { time: '5:00 PM', topic: 'Final Match' }
    ],
    gallery: [],
    achievements: []
  },
  {
    id: 4,
    title: 'Community Service Drive - Clean Campus',
    category: 'Social',
    date: '2024-09-30',
    time: '7:00 AM - 12:00 PM',
    location: 'Campus-wide',
    description: 'Join us in making our campus cleaner and greener. Contribute to environmental sustainability.',
    organizer: 'Environment Club',
    capacity: 100,
    registered: 67,
    price: 'Free',
    status: 'upcoming',
    registered_by_user: true,
    image: '🌱',
    tags: ['Environment', 'Community Service', 'Sustainability'],
    speakers: [],
    agenda: [
      { time: '7:00 AM', topic: 'Assembly & Briefing' },
      { time: '7:30 AM', topic: 'Campus Cleaning' },
      { time: '10:30 AM', topic: 'Tree Plantation' },
      { time: '11:30 AM', topic: 'Wrap-up & Refreshments' }
    ],
    gallery: [],
    achievements: []
  },
  {
    id: 5,
    title: 'Hackathon 2024 - Code for Change',
    category: 'Technical',
    date: '2024-09-20',
    time: '6:00 PM',
    location: 'Computer Lab, Block B',
    description: '48-hour coding marathon focused on creating solutions for social problems.',
    organizer: 'Programming Club',
    capacity: 80,
    registered: 80,
    price: 'Free',
    status: 'completed',
    registered_by_user: true,
    image: '💻',
    tags: ['Hackathon', 'Programming', 'Innovation', 'Social Impact'],
    speakers: [],
    agenda: [],
    gallery: [
      { id: 1, url: '#', caption: 'Team brainstorming session' },
      { id: 2, url: '#', caption: 'Coding in action' },
      { id: 3, url: '#', caption: 'Final presentations' },
      { id: 4, url: '#', caption: 'Winner announcement' }
    ],
    achievements: [
      { title: 'Best Innovation Award', recipient: 'Team Alpha - Healthcare App' },
      { title: 'People\'s Choice Award', recipient: 'Team Beta - Education Platform' },
      { title: 'Best Design Award', recipient: 'Team Gamma - Environmental Solution' }
    ]
  },
  {
    id: 6,
    title: 'Guest Lecture: Blockchain in Finance',
    category: 'Technical',
    date: '2024-09-25',
    time: '2:00 PM - 4:00 PM',
    location: 'Seminar Hall 201',
    description: 'Industry expert discussion on blockchain applications in financial services.',
    organizer: 'Finance Club',
    capacity: 150,
    registered: 134,
    price: 'Free',
    status: 'upcoming',
    registered_by_user: false,
    image: '⛓️',
    tags: ['Blockchain', 'Finance', 'Technology', 'Guest Lecture'],
    speakers: ['Mr. John Smith (Goldman Sachs)', 'Dr. Priya Sharma (IIT Delhi)'],
    agenda: [
      { time: '2:00 PM', topic: 'Introduction to Blockchain' },
      { time: '2:45 PM', topic: 'Applications in Finance' },
      { time: '3:30 PM', topic: 'Q&A Session' }
    ],
    gallery: [],
    achievements: []
  }
];

const categories = ['All', 'Technical', 'Cultural', 'Sports', 'Social'];

export function Events() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Cultural': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Sports': return 'bg-green-100 text-green-700 border-green-300';
      case 'Social': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-700';
      case 'ongoing': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
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
          <CalendarIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Campus Events</h1>
          <p className="text-slate-600">Discover and participate in campus activities</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 font-medium">Upcoming</p>
              <p className="text-2xl font-bold text-blue-900">
                {events.filter(e => e.status === 'upcoming').length}
              </p>
            </div>
            <CalendarIcon className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium">Registered</p>
              <p className="text-2xl font-bold text-green-900">
                {events.filter(e => e.registered_by_user).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 font-medium">This Month</p>
              <p className="text-2xl font-bold text-purple-900">8</p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700 font-medium">Completed</p>
              <p className="text-2xl font-bold text-orange-900">
                {events.filter(e => e.status === 'completed').length}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-orange-600" />
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
              placeholder="Search events by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-16 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <VoiceSearch onTranscript={handleVoiceSearch} />
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Category:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-1 ml-auto">
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('calendar')}
              >
                <CalendarIcon className="w-4 h-4 mr-1" />
                Calendar
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-1" />
                List
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>{filteredEvents.length} events found</span>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>
      </Card>

      {/* Calendar/List View */}
      {viewMode === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </Card>
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Events on {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </h3>
            {/* Display events for selected date */}
            <div className="space-y-4">
              {filteredEvents
                .filter(event => {
                  const eventDate = new Date(event.date);
                  return selectedDate && 
                         eventDate.toDateString() === selectedDate.toDateString();
                })
                .map((event) => (
                  <Card key={event.id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl">
                        {event.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{event.title}</h4>
                        <p className="text-sm text-slate-600">{event.time} • {event.location}</p>
                      </div>
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                  </Card>
                ))}
              {filteredEvents.filter(event => {
                const eventDate = new Date(event.date);
                return selectedDate && 
                       eventDate.toDateString() === selectedDate.toDateString();
              }).length === 0 && (
                <p className="text-slate-500 text-center py-8">No events on this date</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-all duration-300 group overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl">
                      {event.image}
                    </div>
                    <div>
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                      <Badge className={getStatusColor(event.status)} variant="outline">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 group-hover:text-purple-600 transition-colors mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{event.description}</p>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{event.registered}/{event.capacity} registered</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {event.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {event.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{event.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {event.status === 'completed' && event.gallery.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Event Gallery</span>
                      <Button variant="ghost" size="sm">
                        <Camera className="w-4 h-4 mr-1" />
                        View All
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {event.gallery.slice(0, 2).map((photo) => (
                        <div key={photo.id} className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                          <Camera className="w-6 h-6 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.status === 'completed' && event.achievements.length > 0 && (
                  <div className="border-t pt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Trophy className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-slate-700">Achievements</span>
                    </div>
                    <div className="space-y-1">
                      {event.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="text-xs text-slate-600">
                          <span className="font-medium">{achievement.title}:</span> {achievement.recipient}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  {event.registered_by_user ? (
                    <Button disabled className="flex-1 bg-green-100 text-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Registered
                    </Button>
                  ) : event.status === 'upcoming' ? (
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Register
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                  )}
                  
                  {event.status === 'upcoming' && (
                    <Button variant="outline" size="sm">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="font-medium text-slate-800 mb-2">No events found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}