import React, { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Clock,
  User,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const gradeData = [
  { semester: 'Fall 2022', gpa: 3.6 },
  { semester: 'Spring 2023', gpa: 3.7 },
  { semester: 'Fall 2023', gpa: 3.8 },
  { semester: 'Spring 2024', gpa: 3.8 }
];

const attendanceData = [
  { name: 'Present', value: 85, color: '#10b981' },
  { name: 'Absent', value: 15, color: '#f59e0b' }
];

const subjects = [
  { id: 1, name: 'Database Management Systems', code: 'CS401', credits: 4, grade: 'A', attendance: 88 },
  { id: 2, name: 'Web Development', code: 'CS402', credits: 3, grade: 'A-', attendance: 92 },
  { id: 3, name: 'Machine Learning', code: 'CS403', credits: 4, grade: 'B+', attendance: 78 },
  { id: 4, name: 'Software Engineering', code: 'CS404', credits: 3, grade: 'A', attendance: 85 },
  { id: 5, name: 'Computer Networks', code: 'CS405', credits: 3, grade: 'B+', attendance: 80 }
];

const timetable = [
  { time: '09:00 AM', monday: 'DBMS\nCS401\nRoom 101', tuesday: 'ML\nCS403\nLab 2', wednesday: 'Web Dev\nCS402\nRoom 205', thursday: 'Networks\nCS405\nRoom 301', friday: 'SE\nCS404\nRoom 102' },
  { time: '10:30 AM', monday: 'ML\nCS403\nRoom 301', tuesday: 'Web Dev\nCS402\nLab 1', wednesday: 'SE\nCS404\nRoom 102', thursday: 'DBMS\nCS401\nLab 3', friday: '' },
  { time: '12:00 PM', monday: 'LUNCH BREAK', tuesday: 'LUNCH BREAK', wednesday: 'LUNCH BREAK', thursday: 'LUNCH BREAK', friday: 'LUNCH BREAK' },
  { time: '01:30 PM', monday: 'Networks\nCS405\nRoom 205', tuesday: 'SE\nCS404\nRoom 301', wednesday: 'ML\nCS403\nRoom 102', thursday: 'Web Dev\nCS402\nRoom 205', friday: 'DBMS\nCS401\nRoom 101' },
  { time: '03:00 PM', monday: '', tuesday: '', wednesday: 'Lab\nCS402\nLab 1', thursday: '', friday: 'Lab\nCS401\nLab 3' }
];

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export function Education() {
  const [activeTab, setActiveTab] = useState('syllabus');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Education</h1>
          <p className="text-slate-600 mt-1">Academic progress and course management</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">Fall 2024</Badge>
          <Badge variant="outline">Semester 7</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Marks/Grades</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
        </TabsList>

        <TabsContent value="syllabus" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-500" />
                Current Courses
              </h3>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{subject.name}</h4>
                      <Badge variant="outline">{subject.credits} Credits</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span>{subject.code}</span>
                      <span>•</span>
                      <span>Grade: {subject.grade}</span>
                      <span>•</span>
                      <span>Attendance: {subject.attendance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Academic Overview
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Current GPA</span>
                    <span className="font-bold text-2xl text-blue-600">3.8</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Credits Completed</span>
                    <span className="font-medium">105/120</span>
                  </div>
                  <Progress value={87.5} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Overall Attendance</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="pt-4 border-t">
                  <div className="text-sm text-slate-600 space-y-2">
                    <div className="flex justify-between">
                      <span>Expected Graduation:</span>
                      <span className="font-medium">May 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Major:</span>
                      <span className="font-medium">Computer Science</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Minor:</span>
                      <span className="font-medium">Mathematics</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                Overall Attendance
              </h3>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">85%</div>
                      <div className="text-sm text-slate-500">Present</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Present Days</span>
                  </div>
                  <span className="font-medium">85 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Absent Days</span>
                  </div>
                  <span className="font-medium">15 days</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Subject-wise Attendance</h3>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{subject.code}</span>
                      <span className="text-sm text-slate-600">{subject.attendance}%</span>
                    </div>
                    <Progress value={subject.attendance} className="h-2" />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Attendance Alert</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Your ML course attendance is below 80%. Attend next 3 classes to meet minimum requirement.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grades" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                GPA Trend
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[3.0, 4.0]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="gpa" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-green-500" />
                Current Semester Grades
              </h3>
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{subject.code}</p>
                      <p className="text-xs text-slate-500">{subject.name}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={subject.grade.startsWith('A') ? 'default' : 'secondary'}
                        className={subject.grade.startsWith('A') ? 'bg-green-100 text-green-700' : ''}
                      >
                        {subject.grade}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">{subject.credits} credits</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-blue-900">Semester GPA</span>
                  <span className="text-2xl font-bold text-blue-600">3.8</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
              Weekly Timetable
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-slate-600">Time</th>
                    {dayNames.map((day) => (
                      <th key={day} className="text-left p-3 font-medium text-slate-600">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((slot, index) => (
                    <tr key={index} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-medium text-slate-700">{slot.time}</td>
                      {days.map((day) => (
                        <td key={day} className="p-3">
                          {slot[day as keyof typeof slot] && slot[day as keyof typeof slot] !== 'LUNCH BREAK' ? (
                            <div className={`p-2 rounded-lg text-xs ${
                              slot[day as keyof typeof slot] === '' ? '' : 
                              slot[day as keyof typeof slot] === 'LUNCH BREAK' ? 'bg-gray-100 text-gray-600 text-center' :
                              'bg-gradient-to-r from-blue-100 to-teal-100 border border-blue-200'
                            }`}>
                              {slot[day as keyof typeof slot].split('\n').map((line, i) => (
                                <div key={i} className={i === 0 ? 'font-medium' : 'text-slate-600'}>
                                  {line}
                                </div>
                              ))}
                            </div>
                          ) : slot[day as keyof typeof slot] === 'LUNCH BREAK' ? (
                            <div className="p-2 rounded-lg text-xs bg-gray-100 text-gray-600 text-center">
                              LUNCH BREAK
                            </div>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}