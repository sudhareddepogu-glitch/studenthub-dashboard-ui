import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { CampusTour } from './CampusTour';
import { 
  GraduationCap, 
  Calendar, 
  Users, 
  Activity,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  BookOpen,
  Check,
  Plus,
  BarChart3,
  PieChart,
  Play,
  Camera,
  Navigation,
  Building,
  Trees,
  Coffee,
  CalendarDays,
  Timer,
  BookOpenCheck,
  User
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Mock data for charts
const gpaHistoryData = [
  { semester: 'Sem 1', gpa: 3.4, credits: 18, grade: 'B+' },
  { semester: 'Sem 2', gpa: 3.6, credits: 19, grade: 'A-' },
  { semester: 'Sem 3', gpa: 3.7, credits: 20, grade: 'A-' },
  { semester: 'Sem 4', gpa: 3.8, credits: 18, grade: 'A' },
  { semester: 'Sem 5', gpa: 3.85, credits: 19, grade: 'A' },
];

const attendanceData = [
  { subject: 'Data Structures', total: 45, attended: 42, percentage: 93 },
  { subject: 'Machine Learning', total: 40, attended: 38, percentage: 95 },
  { subject: 'Database Systems', total: 48, attended: 44, percentage: 92 },
  { subject: 'Web Development', total: 42, attended: 36, percentage: 86 },
  { subject: 'Computer Networks', total: 38, attended: 35, percentage: 92 },
];

const creditsData = [
  { semester: 'Sem 1', credits: 18, cumulative: 18, status: 'Completed' },
  { semester: 'Sem 2', credits: 19, cumulative: 37, status: 'Completed' },
  { semester: 'Sem 3', credits: 20, cumulative: 57, status: 'Completed' },
  { semester: 'Sem 4', credits: 18, cumulative: 75, status: 'Completed' },
  { semester: 'Sem 5', credits: 19, cumulative: 94, status: 'In Progress' },
];

const activityBalanceData = [
  { name: 'Academic', value: 65, color: '#3b82f6' },
  { name: 'Extracurricular', value: 35, color: '#8b5cf6' }
];

const weeklyProgressData = [
  { day: 'Mon', academic: 8, extracurricular: 2 },
  { day: 'Tue', academic: 6, extracurricular: 4 },
  { day: 'Wed', academic: 7, extracurricular: 3 },
  { day: 'Thu', academic: 5, extracurricular: 5 },
  { day: 'Fri', academic: 4, extracurricular: 6 },
  { day: 'Sat', academic: 2, extracurricular: 8 },
  { day: 'Sun', academic: 3, extracurricular: 5 }
];

const upcomingEvents = [
  { id: 1, title: 'Tech Talk: AI in Healthcare', date: 'Sept 15', time: '3:00 PM', registered: false },
  { id: 2, title: 'Annual Hackathon 2024', date: 'Sept 20', time: '9:00 AM', registered: true },
  { id: 3, title: 'Career Fair - Fall 2024', date: 'Sept 25', time: '10:00 AM', registered: false },
];

const joinedClubs = [
  { id: 1, name: 'Computer Science Society', update: 'New workshop on React.js - Sept 18th', time: '2h ago', icon: '💻' },
  { id: 2, name: 'Photography Club', update: 'Photo contest submissions due tomorrow!', time: '4h ago', icon: '📸' },
  { id: 3, name: 'Student Council', update: 'Monthly meeting rescheduled to Friday', time: '1d ago', icon: '🏛️' }
];

const recentActivities = [
  { id: 1, activity: 'Submitted Database Design Project', date: 'Sept 10', type: 'academic', icon: '📝' },
  { id: 2, activity: 'Attended Machine Learning Workshop', date: 'Sept 8', type: 'academic', icon: '🤖' },
  { id: 3, activity: 'Won Photography Contest', date: 'Sept 5', type: 'extracurricular', icon: '🏆' },
  { id: 4, activity: 'Earned AWS Cloud Certification', date: 'Sept 3', type: 'certification', icon: '☁️' },
];

const weeklyTimeTable = [
  {
    day: 'Monday',
    classes: [
      { subject: 'Database Systems', time: '9:00 - 10:30', room: 'CS-101', instructor: 'Prof. Wilson', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { subject: 'Machine Learning', time: '11:00 - 12:30', room: 'CS-205', instructor: 'Dr. Chen', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'Web Development Lab', time: '2:00 - 4:00', room: 'Lab-3', instructor: 'Prof. Davis', color: 'bg-green-100 text-green-800 border-green-300' }
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { subject: 'Data Structures', time: '10:00 - 11:30', room: 'CS-102', instructor: 'Prof. Kumar', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'Computer Networks', time: '1:00 - 2:30', room: 'CS-301', instructor: 'Dr. Thompson', color: 'bg-red-100 text-red-800 border-red-300' },
      { subject: 'AI Ethics Seminar', time: '3:00 - 4:00', room: 'Seminar Hall', instructor: 'Prof. Wilson', color: 'bg-teal-100 text-teal-800 border-teal-300' }
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      { subject: 'Database Systems', time: '9:00 - 10:30', room: 'CS-101', instructor: 'Prof. Wilson', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { subject: 'Machine Learning Lab', time: '11:00 - 1:00', room: 'Lab-1', instructor: 'Dr. Chen', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'Project Work', time: '2:00 - 4:00', room: 'Various', instructor: 'Self Study', color: 'bg-gray-100 text-gray-800 border-gray-300' }
    ]
  },
  {
    day: 'Thursday',
    classes: [
      { subject: 'Data Structures', time: '10:00 - 11:30', room: 'CS-102', instructor: 'Prof. Kumar', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'Computer Networks Lab', time: '1:00 - 3:00', room: 'Lab-2', instructor: 'Dr. Thompson', color: 'bg-red-100 text-red-800 border-red-300' },
      { subject: 'Career Counseling', time: '3:30 - 4:30', room: 'Counseling Center', instructor: 'Ms. Parker', color: 'bg-pink-100 text-pink-800 border-pink-300' }
    ]
  },
  {
    day: 'Friday',
    classes: [
      { subject: 'Machine Learning', time: '11:00 - 12:30', room: 'CS-205', instructor: 'Dr. Chen', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'Web Development', time: '2:00 - 3:30', room: 'CS-203', instructor: 'Prof. Davis', color: 'bg-green-100 text-green-800 border-green-300' },
      { subject: 'Study Group', time: '4:00 - 5:00', room: 'Library', instructor: 'Peer Study', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' }
    ]
  },
  {
    day: 'Saturday',
    classes: [
      { subject: 'Extra Tutorial', time: '10:00 - 11:00', room: 'CS-101', instructor: 'TA Sessions', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { subject: 'Club Activities', time: '2:00 - 4:00', room: 'Various', instructor: 'Club Leaders', color: 'bg-violet-100 text-violet-800 border-violet-300' }
    ]
  },
  {
    day: 'Sunday',
    classes: [
      { subject: 'Free Day', time: 'All Day', room: 'Relax!', instructor: 'Rest & Recreation', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    ]
  }
];

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [gpaDialogOpen, setGpaDialogOpen] = useState(false);
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [creditsDialogOpen, setCreditsDialogOpen] = useState(false);

  const GPADialog = () => (
    <Dialog open={gpaDialogOpen} onOpenChange={setGpaDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 -m-6 mb-6 rounded-t-xl">
          <DialogTitle className="flex items-center text-2xl font-bold">
            <GraduationCap className="w-6 h-6 mr-3" />
            GPA History & Academic Performance
          </DialogTitle>
          <DialogDescription className="text-blue-100 mt-2 text-base">
            Comprehensive view of your academic journey with detailed performance analytics
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          {/* Enhanced Chart with glassmorphism */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              GPA Progression Over Time
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gpaHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="semester" stroke="#64748b" />
                  <YAxis domain={[3.0, 4.0]} stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gpa" 
                    stroke="url(#gpaGradient)" 
                    strokeWidth={4} 
                    dot={{ fill: '#3b82f6', strokeWidth: 3, r: 8 }} 
                    activeDot={{ r: 10, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
                  />
                  <defs>
                    <linearGradient id="gpaGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Semester Breakdown */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
                Detailed Semester Analysis
              </h4>
              <div className="space-y-4">
                {gpaHistoryData.map((sem, index) => (
                  <div key={index} className="group p-4 bg-gradient-to-r from-white/80 to-slate-50/80 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          index === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                          index === 2 ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                          index === 3 ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                          'bg-gradient-to-r from-indigo-500 to-purple-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{sem.semester}</p>
                          <p className="text-sm text-slate-600">{sem.credits} credits completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{sem.gpa}</p>
                        <Badge variant="outline" className="bg-white/80">{sem.grade}</Badge>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(sem.gpa / 4.0) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Statistics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Academic Excellence
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                    <span className="text-slate-700">Current GPA:</span>
                    <span className="text-2xl font-bold text-blue-600">3.85</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                    <span className="text-slate-700">Credits Progress:</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-purple-600">94/120</span>
                      <div className="w-24 bg-slate-200 rounded-full h-2 mt-1">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl">
                    <span className="text-slate-700">Class Rank:</span>
                    <span className="text-lg font-bold text-green-600">15/240</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-100 to-teal-100 rounded-xl border border-green-300">
                    <span className="text-slate-700">Honors Status:</span>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-green-700">Dean's List</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h4 className="font-semibold text-slate-800 mb-4">Quick Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Download Transcript
                  </Button>
                  <Button variant="outline" className="w-full bg-white/80 hover:bg-white">
                    View Subject-wise Grades
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const AttendanceDialog = () => (
    <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 -m-6 mb-6 rounded-t-xl">
          <DialogTitle className="flex items-center text-2xl font-bold">
            <Calendar className="w-6 h-6 mr-3" />
            Attendance Analytics Dashboard
          </DialogTitle>
          <DialogDescription className="text-green-100 mt-2 text-base">
            Comprehensive attendance tracking with insights and recommendations
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Attendance Chart */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-green-600" />
              Attendance Overview
            </h4>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={attendanceData.map(subject => ({ 
                      name: subject.subject,
                      value: subject.percentage,
                      attended: subject.attended,
                      total: subject.total,
                      color: subject.percentage >= 90 ? '#10b981' : subject.percentage >= 75 ? '#f59e0b' : '#ef4444'
                    }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {attendanceData.map((subject, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={subject.percentage >= 90 ? '#10b981' : subject.percentage >= 75 ? '#f59e0b' : '#ef4444'}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject-wise Detailed Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {attendanceData.map((subject, index) => (
              <div key={index} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      subject.percentage >= 90 ? 'bg-green-500' :
                      subject.percentage >= 75 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                    <h4 className="font-semibold text-slate-800">{subject.subject}</h4>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`font-bold ${
                      subject.percentage >= 90 ? "bg-green-100 text-green-700 border-green-300" :
                      subject.percentage >= 75 ? "bg-yellow-100 text-yellow-700 border-yellow-300" :
                      "bg-red-100 text-red-700 border-red-300"
                    }`}
                  >
                    {subject.percentage}%
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Classes Attended:</span>
                    <span className="font-semibold text-slate-800">{subject.attended}/{subject.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Classes Missed:</span>
                    <span className={`font-semibold ${
                      subject.total - subject.attended > 5 ? 'text-red-600' : 'text-slate-800'
                    }`}>
                      {subject.total - subject.attended}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={subject.percentage} className="h-3" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>0%</span>
                      <span>75% (Minimum)</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {subject.percentage < 75 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-3">
                      <p className="text-xs text-red-700 font-medium">
                        ⚠️ Below minimum requirement. Attend next {Math.ceil((75 * subject.total - 100 * subject.attended) / 25)} classes to reach 75%.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Overall Summary */}
          <div className="bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-white">92%</span>
                </div>
                <h4 className="font-semibold text-slate-800">Overall Attendance</h4>
                <p className="text-sm text-slate-600">195/212 total classes</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-white">17</span>
                </div>
                <h4 className="font-semibold text-slate-800">Classes Missed</h4>
                <p className="text-sm text-slate-600">Across all subjects</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-8 h-8 text-white fill-current" />
                </div>
                <h4 className="font-semibold text-slate-800">Status</h4>
                <p className="text-sm text-green-600 font-semibold">Excellent Attendance</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h4 className="font-semibold text-slate-800 mb-4">Quick Actions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                Export Attendance Report
              </Button>
              <Button variant="outline" className="bg-white/80 hover:bg-white">
                Set Attendance Reminder
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const CreditsDialog = () => (
    <Dialog open={creditsDialogOpen} onOpenChange={setCreditsDialogOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 -m-6 mb-6 rounded-t-xl">
          <DialogTitle className="flex items-center text-2xl font-bold">
            <BookOpen className="w-6 h-6 mr-3" />
            Credits & Degree Progress Tracker
          </DialogTitle>
          <DialogDescription className="text-purple-100 mt-2 text-base">
            Your academic journey roadmap with detailed credit analysis and graduation planning
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          {/* Enhanced Progress Overview */}
          <div className="bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">78%</div>
                      <div className="text-sm text-slate-600">Complete</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-purple-500"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="78, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Degree Progress</h3>
              <p className="text-slate-600">94 of 120 credits completed</p>
            </div>
          </div>

          {/* Credits Chart */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
            <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Semester-wise Credit Distribution
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={creditsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="semester" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar 
                    dataKey="credits" 
                    fill="url(#creditsGradient)" 
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="creditsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enhanced Semester Breakdown */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Semester Timeline
              </h4>
              <div className="space-y-4">
                {creditsData.map((sem, index) => (
                  <div key={index} className="group relative">
                    <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white/80 to-purple-50/80 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
                        sem.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
                        'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {sem.status === 'Completed' ? <Check className="w-6 h-6" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-slate-800">{sem.semester}</h5>
                          <Badge 
                            variant="outline" 
                            className={`${
                              sem.status === 'Completed' ? 'bg-green-100 text-green-700 border-green-300' :
                              'bg-purple-100 text-purple-700 border-purple-300'
                            }`}
                          >
                            {sem.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-slate-600">Credits: {sem.credits}</span>
                          <span className="text-sm font-semibold text-purple-600">Cumulative: {sem.cumulative}</span>
                        </div>
                        <div className="mt-2">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(sem.cumulative / 120) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < creditsData.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-4 bg-gradient-to-b from-purple-300 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Degree Statistics */}
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h4 className="font-semibold text-slate-800 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-purple-600" />
                  Graduation Planning
                </h4>
                <div className="space-y-4">
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Credits Completed:</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-purple-600">94</span>
                        <span className="text-slate-600"> / 120</span>
                      </div>
                    </div>
                    <Progress value={78} className="h-3 mt-2" />
                  </div>
                  
                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700">Remaining Credits:</span>
                      <span className="text-2xl font-bold text-orange-600">26</span>
                    </div>
                    <p className="text-sm text-slate-600">Approximately 1.5 semesters</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-4 border border-green-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700">Expected Graduation:</span>
                      <span className="font-bold text-green-700">Spring 2025</span>
                    </div>
                    <p className="text-sm text-green-600">On track for timely completion</p>
                  </div>

                  <div className="bg-white/70 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-700">Average Credits/Semester:</span>
                      <span className="font-bold text-slate-800">18.8</span>
                    </div>
                    <p className="text-sm text-slate-600">Above recommended minimum</p>
                  </div>
                </div>
              </div>

              {/* Credit Categories */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h4 className="font-semibold text-slate-800 mb-4">Credit Distribution</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Core Subjects:</span>
                    <span className="font-semibold text-blue-600">56/60</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Electives:</span>
                    <span className="font-semibold text-purple-600">24/30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Lab Courses:</span>
                    <span className="font-semibold text-green-600">14/18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Project Work:</span>
                    <span className="font-semibold text-orange-600">0/12</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <h4 className="font-semibold text-slate-800 mb-4">Planning Tools</h4>
                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Plan Next Semester
                  </Button>
                  <Button variant="outline" className="w-full bg-white/80 hover:bg-white">
                    Download Degree Audit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 rounded-3xl p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-semibold mb-2">Welcome back, Alex 👋</h1>
          <p className="text-blue-100 text-lg">Here's your academic journey today.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full transform translate-x-24 translate-y-24"></div>
      </div>

      {/* Performance Panel - Enhanced */}
      <Card className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-2 border-blue-200/50">
        <h2 className="text-xl font-semibold text-slate-800 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
          Academic Performance Dashboard
        </h2>
        
        {/* Interactive Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* GPA Card - Clickable */}
        <Card 
          className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setGpaDialogOpen(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 font-medium mb-1">Current GPA</p>
              <p className="text-3xl font-bold text-blue-900">3.85</p>
              <p className="text-sm text-blue-600 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                ↑ 0.05 from last semester
              </p>
            </div>
            <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 text-blue-600 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            Click to view detailed history →
          </div>
        </Card>

        {/* Attendance Card - Clickable */}
        <Card 
          className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setAttendanceDialogOpen(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 font-medium mb-1">Attendance</p>
              <p className="text-3xl font-bold text-green-900">92%</p>
              <Progress value={92} className="w-20 h-2 mt-2" />
            </div>
            <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 text-green-600 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            Click for subject-wise breakdown →
          </div>
        </Card>

        {/* Credits Card - Clickable */}
        <Card 
          className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => setCreditsDialogOpen(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 font-medium mb-1">Credits Completed</p>
              <p className="text-3xl font-bold text-purple-900">94/120</p>
              <p className="text-sm text-purple-600 mt-1">78% towards degree</p>
            </div>
            <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="mt-4 text-purple-600 text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
            Click to view progression →
          </div>
        </Card>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
        {/* Upcoming Events */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800 flex items-center">
              <Calendar className="w-6 h-6 text-blue-600 mr-2" />
              Upcoming Events
            </h3>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800 mb-1">{event.title}</h4>
                    <p className="text-sm text-slate-600">{event.date} • {event.time}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant={event.registered ? "secondary" : "default"}
                    className={event.registered ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-blue-600 hover:bg-blue-700"}
                  >
                    {event.registered ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Registered
                      </>
                    ) : (
                      'Register'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Joined Clubs with Updates */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-slate-800 flex items-center mb-6">
            <Users className="w-6 h-6 text-purple-600 mr-2" />
            Your Clubs - Recent Updates
          </h3>
          
          <div className="space-y-4">
            {joinedClubs.map((club) => (
              <div key={club.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{club.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-800">{club.name}</h4>
                      <span className="text-xs text-slate-500">{club.time}</span>
                    </div>
                    <p className="text-sm text-slate-600">{club.update}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Activity Tracker Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Balance Pie Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
            <PieChart className="w-5 h-5 text-orange-600 mr-2" />
            Activity Balance
          </h3>
          
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={activityBalanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    startAngle={90}
                    endAngle={450}
                    dataKey="value"
                  >
                    {activityBalanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">65%</div>
                  <div className="text-sm text-slate-500">Academic</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Academic</span>
              </div>
              <span className="font-medium">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Extracurricular</span>
              </div>
              <span className="font-medium">35%</span>
            </div>
          </div>
        </Card>

        {/* Weekly Progress Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
            <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
            Weekly Progress
          </h3>
          
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="academic" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="extracurricular" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Activities Timeline */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
            <Clock className="w-5 h-5 text-teal-600 mr-2" />
            Recent Activities
          </h3>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'academic' ? 'bg-blue-500' : 
                  activity.type === 'certification' ? 'bg-yellow-500' :
                  'bg-purple-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{activity.icon}</span>
                    <p className="text-sm font-medium text-slate-800 flex-1">{activity.activity}</p>
                  </div>
                  <p className="text-xs text-slate-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Campus Tour Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CampusTour />
        
        {/* Campus Info Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-slate-200">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 rounded-full transform translate-x-12 -translate-y-12"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-200/20 rounded-full transform -translate-x-8 translate-y-8"></div>
          
          <div className="relative p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800">Campus Information</h3>
                <p className="text-slate-600 text-sm">Discover our world-class facilities</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-700">
                VNR Vignana Jyothi Institute of Engineering and Technology offers state-of-the-art facilities 
                spread across a beautiful campus designed to foster learning and innovation.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/60 rounded-xl p-3 border border-white/50">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-semibold text-slate-800">5,000+</p>
                      <p className="text-xs text-slate-600">Students</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-3 border border-white/50">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-slate-800">50+</p>
                      <p className="text-xs text-slate-600">Departments</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-3 border border-white/50">
                  <div className="flex items-center space-x-2">
                    <Trees className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-slate-800">100+</p>
                      <p className="text-xs text-slate-600">Acres</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-3 border border-white/50">
                  <div className="flex items-center space-x-2">
                    <Coffee className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="font-semibold text-slate-800">25+</p>
                      <p className="text-xs text-slate-600">Amenities</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-slate-800 mb-2">Why Choose Our Campus?</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                    <span>Modern laboratories and research facilities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span>Eco-friendly green campus environment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                    <span>State-of-the-art sports and recreation facilities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                    <span>24/7 library with digital resources</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Virtual Campus Tour Section */}
      <CampusTour className="w-full" />

      {/* Weekly Time Table Section */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-slate-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 rounded-full transform -translate-x-12 translate-y-12"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-800">Weekly Time Table</h3>
                <p className="text-slate-600">Your class schedule at a glance</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => onNavigate?.('timetable')}
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              View Full Timetable
            </Button>
          </div>

          {/* Time Table Grid */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/50">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-7 gap-2 md:gap-4 min-w-full" style={{ minWidth: '1200px' }}>
                {weeklyTimeTable.map((daySchedule, index) => (
                  <div key={index} className="min-w-40 md:min-w-48">
                    <div className="text-center mb-3 md:mb-4">
                      <h4 className="font-semibold text-slate-800 bg-white/60 rounded-xl py-2 px-2 md:px-3 border border-slate-200 text-sm md:text-base">
                        {daySchedule.day}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {daySchedule.classes.map((classItem, classIndex) => (
                        <div
                          key={classIndex}
                          className={`p-2 md:p-3 rounded-xl border-2 cursor-pointer hover:shadow-md transition-all duration-200 group ${classItem.color}`}
                          title={`${classItem.subject}\nTime: ${classItem.time}\nRoom: ${classItem.room}\nInstructor: ${classItem.instructor}`}
                        >
                          <div className="text-xs font-medium mb-1">{classItem.time}</div>
                          <div className="font-semibold text-xs md:text-sm mb-1 line-clamp-2">{classItem.subject}</div>
                          <div className="text-xs opacity-80 flex items-center">
                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{classItem.room}</span>
                          </div>
                          <div className="text-xs opacity-80 mt-1 flex items-center">
                            <User className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{classItem.instructor}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Time Table Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/60 rounded-xl p-4 border border-white/50">
              <div className="flex items-center space-x-2">
                <BookOpenCheck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-lg font-semibold text-slate-800">18</p>
                  <p className="text-xs text-slate-600">Classes/Week</p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 rounded-xl p-4 border border-white/50">
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-lg font-semibold text-slate-800">28h</p>
                  <p className="text-xs text-slate-600">Study Hours</p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 rounded-xl p-4 border border-white/50">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-lg font-semibold text-slate-800">8</p>
                  <p className="text-xs text-slate-600">Locations</p>
                </div>
              </div>
            </div>
            <div className="bg-white/60 rounded-xl p-4 border border-white/50">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-lg font-semibold text-slate-800">6</p>
                  <p className="text-xs text-slate-600">Instructors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Dialog Components */}
      <GPADialog />
      <AttendanceDialog />
      <CreditsDialog />
    </div>
  );
}