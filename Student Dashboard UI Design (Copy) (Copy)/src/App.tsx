import React, { useState, useRef, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { Learning } from './components/Learning';
import { Records } from './components/Records';
import { Events } from './components/Events';
import { Clubs } from './components/Clubs';
import { Placements } from './components/Placements';
import { StudentFeedback } from './components/StudentFeedback';
import { Mentoring } from './components/Mentoring';
import { Activities } from './components/Activities';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { Schedule } from './components/Schedule';
import { CollegeTimetable } from './components/CollegeTimetable';
import { ExamTimetable } from './components/ExamTimetable';
import { VoiceSearch } from './components/VoiceSearch';
import { toast, Toaster } from 'sonner@2.0.3';
import { 
  GraduationCap, 
  Users, 
  Briefcase, 
  MessageSquare, 
  UserCheck, 
  Activity, 
  Award, 
  User,
  Home,
  Settings as SettingsIcon,
  Menu,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  BookOpen,
  FileText,
  Calendar,
  MapPin,
  Info,
  CalendarDays,
  Trash2
} from 'lucide-react';

type ActivePage = 'dashboard' | 'learning' | 'records' | 'events' | 'clubs' | 'placements' | 'feedback' | 'mentoring' | 'activity' | 'profile' | 'settings' | 'help' | 'schedule' | 'timetable' | 'exam-timetable';

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'records', label: 'Records', icon: FileText },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'clubs', label: 'Clubs', icon: Users },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'placements', label: 'Placements', icon: Briefcase },
  { id: 'feedback', label: 'Student Feedback', icon: MessageSquare },
  { id: 'mentoring', label: 'Mentoring', icon: UserCheck },
  { id: 'activity', label: 'Activity Tracker', icon: Activity },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
  { id: 'help', label: 'Help & Support', icon: Info },
];

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Assignment Due', message: 'Data Structures homework due tomorrow', time: '2h ago', type: 'warning' },
    { id: 2, title: 'Grade Updated', message: 'Machine Learning Quiz - Grade: A-', time: '4h ago', type: 'success' },
    { id: 3, title: 'Event Reminder', message: 'Tech Talk: AI in Healthcare - 3 PM today', time: '6h ago', type: 'info' },
    { id: 4, title: 'New Course Material', message: 'Week 5 lectures uploaded', time: '1d ago', type: 'info' },
  ]);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success('Notification removed');
  };

  const handleVoiceSearch = (transcript: string) => {
    setSearchQuery(transcript);
    toast.success(`Voice search: "${transcript}"`);
    // Here you would trigger actual search functionality
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={setActivePage} />;
      case 'learning':
        return <Learning />;
      case 'records':
        return <Records />;
      case 'events':
        return <Events />;
      case 'clubs':
        return <Clubs />;
      case 'placements':
        return <Placements />;
      case 'feedback':
        return <StudentFeedback />;
      case 'mentoring':
        return <Mentoring />;
      case 'activity':
        return <Activities />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      case 'schedule':
        return <Schedule onNavigate={setActivePage} />;
      case 'timetable':
        return <CollegeTimetable />;
      case 'exam-timetable':
        return <ExamTimetable />;
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
      {/* Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo, App Name, Menu Button */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  StudentHub
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Center - Search Bar (Hidden on mobile, shown on larger screens) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search courses, assignments, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-16 py-2 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <VoiceSearch onTranscript={handleVoiceSearch} />
                </div>
              </div>
            </div>

            {/* Mobile Search Button */}
            <div className="md:hidden">
              <button className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Right Side - Home, Notifications, Profile */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Home Button */}
              <button
                onClick={() => setActivePage('dashboard')}
                className={`p-2 rounded-xl transition-colors ${
                  activePage === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Home className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setNotificationOpen(!notificationOpen)}
                  className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    {notifications.length}
                  </span>
                </button>

                {/* Notifications Dropdown */}
                {notificationOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-800">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-slate-100 hover:bg-slate-50 transition-all duration-200 group">
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.type === 'warning' ? 'bg-orange-500' :
                              notification.type === 'success' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-800">{notification.title}</h4>
                              <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                            </div>
                            <button
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                </button>

                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50">
                    <div className="p-4 border-b border-slate-200">
                      <p className="font-medium text-slate-800">Alex Johnson</p>
                      <p className="text-sm text-slate-600">alex@university.edu</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { setActivePage('profile'); setProfileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center space-x-2"
                      >
                        <User className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-700">Profile</span>
                      </button>
                      <button
                        onClick={() => { setActivePage('settings'); setProfileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors flex items-center space-x-2"
                      >
                        <SettingsIcon className="w-4 h-4 text-slate-600" />
                        <span className="text-slate-700">Settings</span>
                      </button>
                      <hr className="my-2 border-slate-200" />
                      <button className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-50 transition-colors flex items-center space-x-2 text-red-600">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Collapsible Sidebar */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={() => setSidebarOpen(false)} />
          <div ref={sidebarRef} className="fixed left-0 top-[80px] h-[calc(100vh-80px)] w-72 md:w-64 bg-white/95 backdrop-blur-md border-r border-slate-200 z-50 overflow-y-auto">
            <div className="p-4 md:p-6">
              <h3 className="font-semibold text-slate-800 mb-6">Navigation</h3>
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActivePage(item.id as ActivePage);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left px-4 py-4 md:py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 touch-manipulation ${
                        activePage === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="min-h-[calc(100vh-80px)] p-4 md:p-6 pb-20 md:pb-6">
        {renderPage()}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40">
        <div className="flex items-center justify-around px-4 py-2">
          {[
            { id: 'dashboard', icon: Home, label: 'Home' },
            { id: 'learning', icon: BookOpen, label: 'Learning' },
            { id: 'events', icon: Calendar, label: 'Events' },
            { id: 'schedule', icon: CalendarDays, label: 'Schedule' },
            { id: 'profile', icon: User, label: 'Profile' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as ActivePage)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 touch-manipulation ${
                  activePage === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${activePage === item.id ? 'text-blue-600' : 'text-slate-600'}`} />
                <span className={`text-xs font-medium ${activePage === item.id ? 'text-blue-600' : 'text-slate-600'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toast Notifications */}
      <Toaster position="bottom-center" richColors />
    </div>
  );
}