import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, CalendarDays, Clock, MapPin, Users, Bell, Filter, List, Grid3X3, ChevronLeft, ChevronRight, Plus, ClipboardList, ExternalLink, BookOpen, GraduationCap } from 'lucide-react';

// Enhanced mock data for calendar events with more details
const calendarEvents = [
  // Holidays with duration and reason
  { 
    id: 1, 
    title: 'Gandhi Jayanti', 
    date: '2024-10-02', 
    endDate: '2024-10-02',
    type: 'holiday', 
    color: 'green', 
    description: 'National Holiday - Birth Anniversary of Mahatma Gandhi',
    duration: '1 Day',
    reason: 'National Holiday',
    location: 'University Wide'
  },
  { 
    id: 2, 
    title: 'Diwali Festival Break', 
    date: '2024-11-01', 
    endDate: '2024-11-05',
    type: 'holiday', 
    color: 'green', 
    description: 'Festival of Lights - 5 day holiday break',
    duration: '5 Days',
    reason: 'Festival Celebration',
    location: 'University Wide'
  },
  { 
    id: 3, 
    title: 'Winter Break', 
    date: '2024-12-20', 
    endDate: '2025-01-05',
    type: 'holiday', 
    color: 'green', 
    description: 'End of semester break - Classes resume Jan 6th',
    duration: '16 Days',
    reason: 'Semester Break',
    location: 'University Wide'
  },
  
  // Exams with subject lists and timings
  { 
    id: 4, 
    title: 'Midterm Examinations', 
    date: '2024-10-15', 
    endDate: '2024-10-25',
    type: 'exam', 
    color: 'red', 
    description: 'Mid-semester examinations for all subjects',
    duration: '10 Days',
    subjects: ['MFCS', 'DBMS', 'DAA', 'AI&DS', 'OOPJ'],
    timings: '9:00 AM - 12:00 PM',
    location: 'Various Exam Halls'
  },
  { 
    id: 5, 
    title: 'Final Examinations', 
    date: '2024-12-10', 
    endDate: '2024-12-20',
    type: 'exam', 
    color: 'red', 
    description: 'End semester examinations - All subjects',
    duration: '10 Days',
    subjects: ['All Core Subjects', 'Electives', 'Lab Practicals'],
    timings: '9:00 AM - 12:00 PM & 2:00 PM - 5:00 PM',
    location: 'Main Examination Block'
  },
  { 
    id: 6, 
    title: 'Database Systems Practical Exam', 
    date: '2024-11-08', 
    endDate: '2024-11-08',
    type: 'exam', 
    color: 'red', 
    description: 'DBMS Lab practical examination',
    duration: '3 Hours',
    subjects: ['Database Management Systems Lab'],
    timings: '9:00 AM - 12:00 PM',
    location: 'Computer Lab-1'
  },
  
  // Assignments with detailed requirements
  { 
    id: 8, 
    title: 'React Web App Project', 
    date: '2024-09-20', 
    type: 'assignment', 
    color: 'orange', 
    description: 'Complete React application with backend integration',
    subject: 'Web Development',
    requirements: ['Frontend in React', 'Backend API', 'Database Integration', 'Responsive Design'],
    submissionMode: 'GitHub Repository + Live Demo'
  },
  { 
    id: 9, 
    title: 'Data Structures Implementation', 
    date: '2024-09-18', 
    type: 'assignment', 
    color: 'orange', 
    description: 'Implement and analyze various data structures',
    subject: 'Design and Analysis of Algorithms',
    requirements: ['Trees Implementation', 'Graph Algorithms', 'Time Complexity Analysis'],
    submissionMode: 'Code + Report'
  },
  { 
    id: 10, 
    title: 'AI Ethics Research Paper', 
    date: '2024-09-30', 
    type: 'assignment', 
    color: 'orange', 
    description: 'Research paper on ethical implications of AI',
    subject: 'Artificial Intelligence & Data Science',
    requirements: ['2000+ words', 'Minimum 10 references', 'Case studies'],
    submissionMode: 'PDF Submission'
  },
  
  // Campus Events with detailed information
  { 
    id: 12, 
    title: 'Tech Talk: AI in Healthcare', 
    date: '2024-09-15', 
    type: 'event', 
    color: 'blue', 
    description: 'Guest speaker Dr. Sarah Chen from MIT',
    speaker: 'Dr. Sarah Chen, MIT',
    venue: 'Main Auditorium',
    time: '3:00 PM - 4:30 PM',
    capacity: '500 students',
    registration: 'Required'
  },
  { 
    id: 13, 
    title: 'Annual Hackathon 2024', 
    date: '2024-09-20', 
    endDate: '2024-09-22',
    type: 'event', 
    color: 'blue', 
    description: '48-hour coding competition with amazing prizes',
    duration: '48 Hours',
    venue: 'Innovation Hub',
    prizes: 'Cash prizes worth ₹50,000',
    registration: 'Team of 2-4 members',
    deadline: 'September 18, 2024'
  },
  { 
    id: 14, 
    title: 'Career Fair - Fall 2024', 
    date: '2024-09-25', 
    type: 'event', 
    color: 'blue', 
    description: 'Meet with 50+ companies for internships and placements',
    companies: '50+ companies',
    venue: 'Sports Complex',
    time: '10:00 AM - 5:00 PM',
    opportunities: 'Internships, Full-time positions',
    dresscode: 'Formal attire required'
  }
];

const upcomingEvents = calendarEvents
  .filter(event => new Date(event.date) >= new Date())
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  .slice(0, 5);

const eventTypeColors = {
  holiday: 'bg-green-100 text-green-700 border-green-300',
  exam: 'bg-red-100 text-red-700 border-red-300',
  assignment: 'bg-orange-100 text-orange-700 border-orange-300',
  event: 'bg-blue-100 text-blue-700 border-blue-300'
};

const eventTypeIcons = {
  holiday: '🎉',
  exam: '📝',
  assignment: '📚',
  event: '🎪'
};

interface ScheduleProps {
  onNavigate?: (page: string) => void;
}

export function Schedule({ onNavigate }: ScheduleProps) {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentDate, setCurrentDate] = useState(new Date());

  const filters = ['All', 'Holidays', 'Exams', 'Assignments', 'Campus Events'];

  const filteredEvents = calendarEvents.filter(event => {
    if (selectedFilter === 'All') return true;
    const filterMap = {
      'Holidays': 'holiday',
      'Exams': 'exam',
      'Assignments': 'assignment',
      'Campus Events': 'event'
    };
    return event.type === filterMap[selectedFilter];
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDate; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = filteredEvents.filter(event => event.date === dateString);
      days.push({ day, events: dayEvents });
    }
    
    return days;
  };

  const monthDays = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
          <CalendarDays className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Academic Schedule</h1>
          <p className="text-slate-600">View important dates, deadlines, and events</p>
        </div>
      </div>

      {/* Exam Timetable Quick Access */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200/20 rounded-full transform translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-200/20 rounded-full transform -translate-x-8 translate-y-8"></div>
        
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Examination Timetable</h3>
                <p className="text-slate-600 mb-4">Access detailed exam schedules, room allotments, and important exam information</p>
                
                {/* Upcoming Exam Highlight */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800">Next Exam: Midterm Examinations</h4>
                      <p className="text-red-700 text-sm">October 15-25, 2024 • 9:00 AM - 12:00 PM</p>
                    </div>
                    <Badge className="bg-red-100 text-red-700 border-red-300">
                      In 12 days
                    </Badge>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-600">9</div>
                    <div className="text-xs text-blue-700">Branches</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">6</div>
                    <div className="text-xs text-green-700">Exam Days</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-purple-600">25+</div>
                    <div className="text-xs text-purple-700">Subjects</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-600">50+</div>
                    <div className="text-xs text-orange-700">Exam Halls</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button 
                onClick={() => onNavigate?.('exam-timetable')}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                View Full Timetable
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-slate-600 hover:text-slate-900"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Exam Preview Cards */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Quick Preview - This Week's Exams</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { date: 'Oct 15', day: 'Mon', subject: 'Probability Statistics', code: '22BS1MT201', time: '10:00 AM', room: 'E-404' },
                { date: 'Oct 16', day: 'Tue', subject: 'Engineering Math-III', code: '22BS1MT301', time: '10:00 AM', room: 'F-203' },
                { date: 'Oct 17', day: 'Wed', subject: 'Data Structures', code: '22CS1CS201', time: '10:00 AM', room: 'CS-Block A' }
              ].map((exam, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="text-center">
                        <div className="text-xs text-slate-500">{exam.day}</div>
                        <div className="font-bold text-slate-800">{exam.date}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs bg-orange-50 text-orange-600 border-orange-300">
                      {exam.time}
                    </Badge>
                  </div>
                  <h5 className="font-semibold text-slate-800 text-sm mb-1">{exam.subject}</h5>
                  <p className="text-xs text-slate-600 font-mono mb-2">{exam.code}</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {exam.room}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Controls */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-slate-100 rounded-xl p-1">
              <Button
                size="sm"
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                onClick={() => setViewMode('month')}
                className="rounded-lg"
              >
                <Grid3X3 className="w-4 h-4 mr-1" />
                Month
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                onClick={() => setViewMode('week')}
                className="rounded-lg"
              >
                <List className="w-4 h-4 mr-1" />
                List
              </Button>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-1 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                {filters.map((filter) => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>
          </div>

          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Main Calendar/List View */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          {viewMode === 'month' ? (
            <>
              {/* Calendar View */}
              <Card className="p-6 mb-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-slate-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-2 text-center font-medium text-slate-600 text-sm">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {monthDays.map((dayData, index) => (
                    <div
                      key={index}
                      className={`min-h-24 p-1 border border-slate-100 rounded-lg ${
                        dayData ? 'bg-white hover:bg-slate-50' : 'bg-slate-50'
                      } transition-colors relative`}
                    >
                      {dayData && (
                        <>
                          <div className="font-medium text-sm text-slate-800 mb-1">
                            {dayData.day}
                          </div>
                          
                          {/* Event dots for calendar */}
                          <div className="flex flex-wrap gap-1">
                            {dayData.events.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                className={`w-2 h-2 rounded-full ${
                                  event.type === 'holiday' ? 'bg-green-500' :
                                  event.type === 'exam' ? 'bg-red-500' :
                                  event.type === 'assignment' ? 'bg-orange-500' :
                                  'bg-blue-500'
                                }`}
                                title={event.title}
                              />
                            ))}
                            {dayData.events.length > 3 && (
                              <div className="text-xs text-slate-500">+{dayData.events.length - 3}</div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Detailed Event Cards Below Calendar */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Upcoming Events Details</h3>
                {filteredEvents
                  .filter(event => new Date(event.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 6)
                  .map((event) => (
                  <Card key={event.id} className={`p-6 border-l-4 hover:shadow-lg transition-all duration-300 ${
                    event.type === 'holiday' ? 'border-l-green-500 bg-gradient-to-r from-green-50 to-white' :
                    event.type === 'exam' ? 'border-l-red-500 bg-gradient-to-r from-red-50 to-white' :
                    event.type === 'assignment' ? 'border-l-orange-500 bg-gradient-to-r from-orange-50 to-white' :
                    'border-l-blue-500 bg-gradient-to-r from-blue-50 to-white'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          event.type === 'holiday' ? 'bg-green-100' :
                          event.type === 'exam' ? 'bg-red-100' :
                          event.type === 'assignment' ? 'bg-orange-100' :
                          'bg-blue-100'
                        }`}>
                          {eventTypeIcons[event.type]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 text-lg mb-1">{event.title}</h4>
                          <p className="text-slate-600 mb-2">{event.description}</p>
                          
                          {/* Date and Duration */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-3">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatFullDate(event.date)}
                              {event.endDate && event.endDate !== event.date && 
                                ` - ${formatFullDate(event.endDate)}`
                              }
                            </span>
                            {event.duration && (
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event.duration}
                              </span>
                            )}
                            {(event.location || event.venue) && (
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.location || event.venue}
                              </span>
                            )}
                          </div>

                          {/* Event-specific details */}
                          {event.type === 'holiday' && event.reason && (
                            <div className="bg-green-50 rounded-lg p-3 mb-3">
                              <span className="font-medium text-green-800">Reason: </span>
                              <span className="text-green-700">{event.reason}</span>
                            </div>
                          )}

                          {event.type === 'exam' && (
                            <div className="space-y-2">
                              {event.subjects && (
                                <div className="bg-red-50 rounded-lg p-3">
                                  <span className="font-medium text-red-800">Subjects: </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {event.subjects.map((subject, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs bg-red-100 text-red-700">
                                        {subject}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {event.timings && (
                                <div className="text-sm">
                                  <span className="font-medium text-slate-700">Exam Timings: </span>
                                  <span className="text-slate-600">{event.timings}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {event.type === 'assignment' && (
                            <div className="space-y-2">
                              {event.subject && (
                                <div className="bg-orange-50 rounded-lg p-3">
                                  <span className="font-medium text-orange-800">Subject: </span>
                                  <span className="text-orange-700">{event.subject}</span>
                                </div>
                              )}
                              {event.requirements && (
                                <div className="bg-orange-50 rounded-lg p-3">
                                  <span className="font-medium text-orange-800">Requirements:</span>
                                  <ul className="mt-1 space-y-1">
                                    {event.requirements.map((req, idx) => (
                                      <li key={idx} className="text-sm text-orange-700 flex items-center">
                                        <div className="w-1 h-1 bg-orange-500 rounded-full mr-2"></div>
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {event.submissionMode && (
                                <div className="text-sm">
                                  <span className="font-medium text-slate-700">Submission: </span>
                                  <span className="text-slate-600">{event.submissionMode}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {event.type === 'event' && (
                            <div className="space-y-2">
                              {event.speaker && (
                                <div className="bg-blue-50 rounded-lg p-3">
                                  <span className="font-medium text-blue-800">Speaker: </span>
                                  <span className="text-blue-700">{event.speaker}</span>
                                </div>
                              )}
                              {event.time && (
                                <div className="text-sm">
                                  <span className="font-medium text-slate-700">Time: </span>
                                  <span className="text-slate-600">{event.time}</span>
                                </div>
                              )}
                              {event.registration && (
                                <div className="text-sm">
                                  <span className="font-medium text-slate-700">Registration: </span>
                                  <span className="text-slate-600">{event.registration}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge className={eventTypeColors[event.type]} variant="outline">
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Event List</h2>
              <div className="space-y-4">
                {filteredEvents
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{eventTypeIcons[event.type]}</span>
                        <div>
                          <h3 className="font-medium text-slate-800">{event.title}</h3>
                          <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="flex items-center text-sm text-slate-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatFullDate(event.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={eventTypeColors[event.type]}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar - Upcoming Events */}
        <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-orange-600" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-lg">{eventTypeIcons[event.type]}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800 text-sm">{event.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{formatDate(event.date)}</p>
                      <Badge 
                        className={`${eventTypeColors[event.type]} text-xs mt-2`}
                        variant="outline"
                      >
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 mb-4">This Month</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">🎉 Holidays</span>
                <span className="font-semibold text-green-600">
                  {filteredEvents.filter(e => e.type === 'holiday').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">📝 Exams</span>
                <span className="font-semibold text-red-600">
                  {filteredEvents.filter(e => e.type === 'exam').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">📚 Assignments</span>
                <span className="font-semibold text-orange-600">
                  {filteredEvents.filter(e => e.type === 'assignment').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">🎪 Events</span>
                <span className="font-semibold text-blue-600">
                  {filteredEvents.filter(e => e.type === 'event').length}
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 hover:from-orange-100 hover:to-red-100" 
                size="sm"
                onClick={() => onNavigate?.('exam-timetable')}
              >
                <ClipboardList className="w-4 h-4 mr-2 text-orange-600" />
                <span className="text-orange-700">Exam Timetable</span>
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Set Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Export Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Class Timetable
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}