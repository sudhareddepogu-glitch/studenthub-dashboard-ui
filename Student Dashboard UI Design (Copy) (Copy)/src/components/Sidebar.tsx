import React from 'react';
import { 
  Home,
  GraduationCap, 
  BookOpen, 
  FileText, 
  Calendar, 
  Activity, 
  Award, 
  User,
  Settings,
  HelpCircle
} from 'lucide-react';

type ActivePage = 'dashboard' | 'education' | 'learning' | 'records' | 'events' | 'activity' | 'certificates' | 'profile';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'learning', label: 'Learning', icon: BookOpen },
  { id: 'records', label: 'Records', icon: FileText },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'activity', label: 'Activity', icon: Activity },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'profile', label: 'Profile', icon: User },
];

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  return (
    <div className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/50 p-6 hidden lg:block">
      <div className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as ActivePage)}
              className={`w-full px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 text-left ${
                activePage === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 pt-8 border-t border-slate-200">
        <div className="space-y-2">
          <button className="w-full px-4 py-3 rounded-xl flex items-center space-x-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full px-4 py-3 rounded-xl flex items-center space-x-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all duration-200">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
}