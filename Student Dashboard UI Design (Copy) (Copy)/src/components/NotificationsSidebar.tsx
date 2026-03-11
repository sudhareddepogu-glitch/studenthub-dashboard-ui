import React from 'react';
import { Bell, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card } from './ui/card';

const notifications = [
  {
    id: 1,
    type: 'deadline',
    title: 'Assignment Due',
    message: 'Database Design Project due tomorrow',
    time: '2 hours ago',
    icon: AlertCircle,
    color: 'text-orange-500'
  },
  {
    id: 2,
    type: 'event',
    title: 'Tech Fest Registration',
    message: 'Register for the annual tech fest by Friday',
    time: '4 hours ago',
    icon: Calendar,
    color: 'text-blue-500'
  },
  {
    id: 3,
    type: 'grade',
    title: 'Grade Updated',
    message: 'Your Web Development quiz grade is now available',
    time: '1 day ago',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 4,
    type: 'announcement',
    title: 'Library Hours Extended',
    message: 'Library will be open 24/7 during exam week',
    time: '2 days ago',
    icon: Clock,
    color: 'text-purple-500'
  }
];

const announcements = [
  {
    id: 1,
    title: 'Semester Registration',
    message: 'Spring 2024 course registration opens next Monday',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Career Fair',
    message: 'Annual career fair scheduled for March 15th',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Holiday Schedule',
    message: 'Campus closed for winter break Dec 23 - Jan 8',
    priority: 'low'
  }
];

export function NotificationsSidebar() {
  return (
    <div className="w-80 bg-white/80 backdrop-blur-md border-l border-slate-200/50 p-6 overflow-y-auto">
      {/* Notifications Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Notifications</h3>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card key={notification.id} className="p-4 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-3">
                  <Icon className={`w-4 h-4 mt-1 ${notification.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{notification.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Announcements Section */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Announcements</h3>
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-slate-900">{announcement.title}</h4>
                    <div className={`w-2 h-2 rounded-full ${
                      announcement.priority === 'high' ? 'bg-red-500' :
                      announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{announcement.message}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}