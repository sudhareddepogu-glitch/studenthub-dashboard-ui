import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Activity, 
  Calendar, 
  Clock,
  Filter,
  Search,
  TrendingUp,
  Users,
  Award,
  Target,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const activities = [
  {
    id: 1,
    title: 'AI Workshop Participation',
    type: 'Technical Event',
    category: 'Academic',
    date: '2024-01-20',
    duration: 6,
    status: 'upcoming',
    points: 50,
    description: 'Participated in hands-on AI and Machine Learning workshop',
    skills: ['AI', 'Machine Learning', 'Python'],
    organizer: 'Computer Science Department',
    certificate: true
  },
  {
    id: 2,
    title: 'Coding Hackathon - Team Lead',
    type: 'Competition',
    category: 'Academic',
    date: '2024-01-15',
    duration: 48,
    status: 'completed',
    points: 100,
    description: 'Led a team of 4 in 48-hour coding hackathon, placed 2nd',
    skills: ['Leadership', 'Full Stack Development', 'Teamwork'],
    organizer: 'Coding Club',
    certificate: true,
    achievement: '2nd Place - Web Development Track'
  },
  {
    id: 3,
    title: 'Basketball Tournament',
    type: 'Sports Competition',
    category: 'Sports',
    date: '2024-01-12',
    duration: 8,
    status: 'completed',
    points: 75,
    description: 'Participated in inter-college basketball championship',
    skills: ['Teamwork', 'Physical Fitness', 'Strategy'],
    organizer: 'Sports Department',
    certificate: false,
    achievement: 'Quarter Finals'
  },
  {
    id: 4,
    title: 'Cultural Festival Performance',
    type: 'Cultural Event',
    category: 'Cultural',
    date: '2024-01-08',
    duration: 4,
    status: 'completed',
    points: 60,
    description: 'Performed traditional dance at annual cultural festival',
    skills: ['Performance', 'Cultural Awareness', 'Creativity'],
    organizer: 'Cultural Committee',
    certificate: true
  },
  {
    id: 5,
    title: 'Community Service - Tree Plantation',
    type: 'Community Service',
    category: 'Social',
    date: '2024-01-05',
    duration: 6,
    status: 'completed',
    points: 40,
    description: 'Volunteer work for environmental conservation drive',
    skills: ['Environmental Awareness', 'Social Responsibility'],
    organizer: 'Green Club',
    certificate: true,
    achievement: 'Planted 50+ trees'
  },
  {
    id: 6,
    title: 'Debate Competition',
    type: 'Literary Event',
    category: 'Academic',
    date: '2023-12-20',
    duration: 3,
    status: 'completed',
    points: 45,
    description: 'Participated in inter-departmental debate competition',
    skills: ['Public Speaking', 'Critical Thinking', 'Research'],
    organizer: 'Literary Society',
    certificate: false,
    achievement: 'Semi-finalist'
  },
  {
    id: 7,
    title: 'Internship - Tech Startup',
    type: 'Internship',
    category: 'Professional',
    date: '2023-12-01',
    duration: 720, // 30 days * 24 hours
    status: 'completed',
    points: 200,
    description: '1-month internship at a local tech startup',
    skills: ['Web Development', 'Project Management', 'Professional Skills'],
    organizer: 'TechStart Inc.',
    certificate: true,
    achievement: 'Completed 3 major projects'
  }
];

const activityData = [
  { name: 'Academic', hours: 120, count: 8 },
  { name: 'Sports', hours: 45, count: 3 },
  { name: 'Cultural', hours: 30, count: 4 },
  { name: 'Social', hours: 25, count: 2 },
  { name: 'Professional', hours: 720, count: 1 }
];

const monthlyData = [
  { month: 'Sep', hours: 40 },
  { month: 'Oct', hours: 65 },
  { month: 'Nov', hours: 80 },
  { month: 'Dec', hours: 120 },
  { month: 'Jan', hours: 95 }
];

const pieData = [
  { name: 'Academic', value: 45, color: '#3b82f6' },
  { name: 'Sports', value: 20, color: '#10b981' },
  { name: 'Cultural', value: 15, color: '#8b5cf6' },
  { name: 'Social', value: 10, color: '#f59e0b' },
  { name: 'Professional', value: 10, color: '#ef4444' }
];

const categories = ['All', 'Academic', 'Sports', 'Cultural', 'Social', 'Professional'];
const types = ['All', 'Technical Event', 'Competition', 'Sports Competition', 'Cultural Event', 'Community Service', 'Literary Event', 'Internship'];

export function Activities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState<typeof activities[0] | null>(null);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesType = selectedType === 'All' || activity.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalHours = activities.reduce((sum, activity) => sum + activity.duration, 0);
  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const certificates = activities.filter(a => a.certificate).length;

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Sports': return 'bg-green-100 text-green-700 border-green-200';
      case 'Cultural': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Social': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Professional': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Activity Tracker</h1>
          <p className="text-slate-600 mt-1">Track your extracurricular activities and achievements</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Hours</p>
              <p className="text-3xl font-bold text-blue-900">{totalHours}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Activities</p>
              <p className="text-3xl font-bold text-green-900">{completedActivities}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Points</p>
              <p className="text-3xl font-bold text-purple-900">{totalPoints}</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Certificates</p>
              <p className="text-3xl font-bold text-orange-900">{certificates}</p>
            </div>
            <Award className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Hours by Category */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />
            Hours by Category
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Activity Distribution */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-500" />
            Activity Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
          Monthly Activity Hours
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="hours" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              placeholder="Search activities by title, description, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
          
          <div className="flex flex-wrap gap-4">
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
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">Type:</span>
              <div className="flex flex-wrap gap-2">
                {types.slice(0, 4).map(type => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedType === type 
                        ? 'bg-green-500 text-white' 
                        : 'hover:bg-slate-100'
                    }`}
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <Card className="p-6">
        <h3 className="font-semibold mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
          Activity Timeline
        </h3>
        <div className="space-y-6">
          {filteredActivities.map((activity, index) => (
            <div key={activity.id} className="flex space-x-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${
                  activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                {index < filteredActivities.length - 1 && (
                  <div className="w-0.5 h-16 bg-slate-200 mt-2"></div>
                )}
              </div>

              {/* Activity Card */}
              <div className="flex-1 pb-8">
                <Card className="p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">
                        {activity.title}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm text-slate-600">
                        <span>{activity.date}</span>
                        <span>•</span>
                        <span>{activity.duration}h</span>
                        <span>•</span>
                        <span>{activity.organizer}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-3">
                    {activity.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {activity.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {activity.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{activity.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">{activity.points} pts</span>
                      </div>
                      {activity.certificate && (
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-600">Certificate</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {activity.achievement && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">
                          Achievement: {activity.achievement}
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* No Results */}
      {filteredActivities.length === 0 && (
        <Card className="p-12 text-center">
          <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">No activities found</h3>
          <p className="text-slate-600">Try adjusting your search criteria or filters</p>
        </Card>
      )}
    </div>
  );
}