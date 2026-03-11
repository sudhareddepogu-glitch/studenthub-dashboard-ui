import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Building, Clock, MapPin, User, Download, Printer, Share2, ChevronDown } from 'lucide-react';

// Timetable data with subjects, timings, and faculty details
const timeSlots = [
  '10:00 - 11:00',
  '11:00 - 12:00', 
  '12:00 - 1:00',
  '1:00 - 1:40', // Lunch
  '1:40 - 2:40',
  '2:40 - 3:40',
  '3:40 - 4:40'
];

const weeklySchedule = [
  {
    day: 'Monday',
    classes: [
      { subject: 'MFCS', fullName: 'Mathematical Foundations of Computer Science', room: 'CS-101', faculty: 'Dr. A. Kumar', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { subject: 'DBMS', fullName: 'Database Management Systems', room: 'CS-205', faculty: 'Prof. S. Sharma', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'DAA', fullName: 'Design and Analysis of Algorithms', room: 'CS-102', faculty: 'Dr. R. Patel', color: 'bg-green-100 text-green-800 border-green-300' },
      { type: 'lunch', subject: 'LUNCH', fullName: 'Lunch Break', room: 'Cafeteria', faculty: 'Break Time', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'OOPJ LAB*', fullName: 'Object Oriented Programming with Java Lab', room: 'Lab-3', faculty: 'Ms. T. Reddy', color: 'bg-teal-100 text-teal-800 border-teal-300' },
      { subject: 'OOPJ LAB*', fullName: 'Object Oriented Programming with Java Lab', room: 'Lab-3', faculty: 'Ms. T. Reddy', color: 'bg-teal-100 text-teal-800 border-teal-300' },
      { subject: 'ECA', fullName: 'Extra Curricular Activities', room: 'Various', faculty: 'Activity Coordinator', color: 'bg-pink-100 text-pink-800 border-pink-300' }
    ]
  },
  {
    day: 'Tuesday',
    classes: [
      { subject: 'DAA', fullName: 'Design and Analysis of Algorithms', room: 'CS-102', faculty: 'Dr. R. Patel', color: 'bg-green-100 text-green-800 border-green-300' },
      { subject: 'MFCS', fullName: 'Mathematical Foundations of Computer Science', room: 'CS-101', faculty: 'Dr. A. Kumar', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { subject: 'AI&DS', fullName: 'Artificial Intelligence & Data Science', room: 'CS-301', faculty: 'Prof. M. Singh', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { type: 'lunch', subject: 'LUNCH', fullName: 'Lunch Break', room: 'Cafeteria', faculty: 'Break Time', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'DBMS LAB*', fullName: 'Database Management Systems Lab', room: 'Lab-1', faculty: 'Prof. S. Sharma', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'DBMS LAB*', fullName: 'Database Management Systems Lab', room: 'Lab-1', faculty: 'Prof. S. Sharma', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'LIBRARY', fullName: 'Library Study Period', room: 'Central Library', faculty: 'Self Study', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' }
    ]
  },
  {
    day: 'Wednesday',
    classes: [
      { subject: 'AI&DS', fullName: 'Artificial Intelligence & Data Science', room: 'CS-301', faculty: 'Prof. M. Singh', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { subject: 'DAA', fullName: 'Design and Analysis of Algorithms', room: 'CS-102', faculty: 'Dr. R. Patel', color: 'bg-green-100 text-green-800 border-green-300' },
      { subject: 'DBMS', fullName: 'Database Management Systems', room: 'CS-205', faculty: 'Prof. S. Sharma', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { type: 'lunch', subject: 'LUNCH', fullName: 'Lunch Break', room: 'Cafeteria', faculty: 'Break Time', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'MFCS*', fullName: 'Mathematical Foundations of Computer Science Tutorial', room: 'CS-101', faculty: 'Dr. A. Kumar', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { subject: 'AI&DS LAB*', fullName: 'Artificial Intelligence & Data Science Lab', room: 'Lab-2', faculty: 'Prof. M. Singh', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { subject: 'SPORTS', fullName: 'Sports & Physical Activities', room: 'Sports Complex', faculty: 'Sports Instructor', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' }
    ]
  },
  {
    day: 'Thursday',
    classes: [
      { subject: 'DBMS', fullName: 'Database Management Systems', room: 'CS-205', faculty: 'Prof. S. Sharma', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'AI&DS', fullName: 'Artificial Intelligence & Data Science', room: 'CS-301', faculty: 'Prof. M. Singh', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { subject: 'MFCS', fullName: 'Mathematical Foundations of Computer Science', room: 'CS-101', faculty: 'Dr. A. Kumar', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { type: 'lunch', subject: 'LUNCH', fullName: 'Lunch Break', room: 'Cafeteria', faculty: 'Break Time', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'DAA*', fullName: 'Design and Analysis of Algorithms Tutorial', room: 'CS-102', faculty: 'Dr. R. Patel', color: 'bg-green-100 text-green-800 border-green-300' },
      { subject: 'PROJECT', fullName: 'Project Work & Research', room: 'Various', faculty: 'Project Supervisor', color: 'bg-gray-100 text-gray-800 border-gray-300' },
      { subject: 'ECA', fullName: 'Extra Curricular Activities', room: 'Various', faculty: 'Activity Coordinator', color: 'bg-pink-100 text-pink-800 border-pink-300' }
    ]
  },
  {
    day: 'Friday',
    classes: [
      { subject: 'MFCS', fullName: 'Mathematical Foundations of Computer Science', room: 'CS-101', faculty: 'Dr. A. Kumar', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      { subject: 'DBMS', fullName: 'Database Management Systems', room: 'CS-205', faculty: 'Prof. S. Sharma', color: 'bg-purple-100 text-purple-800 border-purple-300' },
      { subject: 'AI&DS', fullName: 'Artificial Intelligence & Data Science', room: 'CS-301', faculty: 'Prof. M. Singh', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { type: 'lunch', subject: 'LUNCH', fullName: 'Lunch Break', room: 'Cafeteria', faculty: 'Break Time', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'DAA', fullName: 'Design and Analysis of Algorithms', room: 'CS-102', faculty: 'Dr. R. Patel', color: 'bg-green-100 text-green-800 border-green-300' },
      { subject: 'SEMINAR', fullName: 'Technical Seminar', room: 'Seminar Hall', faculty: 'Guest Speaker', color: 'bg-rose-100 text-rose-800 border-rose-300' },
      { subject: 'LIBRARY', fullName: 'Library Study Period', room: 'Central Library', faculty: 'Self Study', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' }
    ]
  },
  {
    day: 'Saturday',
    classes: [
      { subject: 'OOPJ*', fullName: 'Object Oriented Programming with Java Tutorial', room: 'CS-203', faculty: 'Ms. T. Reddy', color: 'bg-teal-100 text-teal-800 border-teal-300' },
      { subject: 'AI&DS*', fullName: 'Artificial Intelligence & Data Science Tutorial', room: 'CS-301', faculty: 'Prof. M. Singh', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
      { subject: 'COUNSELING', fullName: 'Academic Counseling', room: 'Counseling Center', faculty: 'Academic Advisor', color: 'bg-amber-100 text-amber-800 border-amber-300' },
      { type: 'lunch', subject: 'LUNCH', fullName: 'Lunch Break', room: 'Cafeteria', faculty: 'Break Time', color: 'bg-orange-100 text-orange-800 border-orange-300' },
      { subject: 'CLUB ACT', fullName: 'Club Activities', room: 'Various', faculty: 'Club Coordinators', color: 'bg-violet-100 text-violet-800 border-violet-300' },
      { subject: 'SPORTS', fullName: 'Sports & Physical Activities', room: 'Sports Complex', faculty: 'Sports Instructor', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
      { subject: 'FREE', fullName: 'Free Period', room: 'Various', faculty: 'Self Study', color: 'bg-slate-100 text-slate-800 border-slate-300' }
    ]
  }
];

// Course details data
const courseDetails = [
  { courseCode: '22P1CS01', shortName: 'MFCS', fullName: 'Mathematical Foundations of Computer Science', room: 'CS-101', coordinator: 'Dr. A. Kumar', category: 'Core', activity: 'Theory + Tutorial', activityCoordinator: 'Dr. A. Kumar' },
  { courseCode: '22P1CS02', shortName: 'DAA', fullName: 'Design and Analysis of Algorithms', room: 'CS-102', coordinator: 'Dr. R. Patel', category: 'Core', activity: 'Theory + Tutorial', activityCoordinator: 'Dr. R. Patel' },
  { courseCode: '22P1CS03', shortName: 'DBMS', fullName: 'Database Management Systems', room: 'CS-205', coordinator: 'Prof. S. Sharma', category: 'Core', activity: 'Theory + Lab', activityCoordinator: 'Prof. S. Sharma' },
  { courseCode: '22P1CS04', shortName: 'AI&DS', fullName: 'Artificial Intelligence & Data Science', room: 'CS-301', coordinator: 'Prof. M. Singh', category: 'Core', activity: 'Theory + Lab', activityCoordinator: 'Prof. M. Singh' },
  { courseCode: '22P1CS05', shortName: 'OOPJ', fullName: 'Object Oriented Programming with Java', room: 'CS-203/Lab-3', coordinator: 'Ms. T. Reddy', category: 'Core', activity: 'Theory + Lab', activityCoordinator: 'Ms. T. Reddy' },
  { courseCode: '22P1GE01', shortName: 'ECA', fullName: 'Extra Curricular Activities', room: 'Various', coordinator: 'Activity Coordinator', category: 'General', activity: 'Club Activities', activityCoordinator: 'Club Leaders' },
  { courseCode: '22P1PE01', shortName: 'SPORTS', fullName: 'Physical Education & Sports', room: 'Sports Complex', coordinator: 'Sports Instructor', category: 'Physical', activity: 'Sports Activities', activityCoordinator: 'Sports Team' },
  { courseCode: '22P1LI01', shortName: 'LIBRARY', fullName: 'Library & Self Study', room: 'Central Library', coordinator: 'Librarian', category: 'Study', activity: 'Independent Study', activityCoordinator: 'Study Groups' }
];

export function CollegeTimetable() {
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [subjectDialogOpen, setSubjectDialogOpen] = useState(false);

  const handleSubjectClick = (classInfo: any) => {
    if (classInfo.type === 'lunch') return;
    
    const courseDetail = courseDetails.find(course => 
      course.shortName === classInfo.subject.replace('*', '').replace(' LAB', '')
    );
    
    setSelectedSubject({
      ...classInfo,
      courseDetail
    });
    setSubjectDialogOpen(true);
  };

  const isSpecialActivity = (subject: string) => {
    return ['ECA', 'SPORTS', 'LIBRARY', 'CLUB ACT', 'FREE'].includes(subject);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center space-y-2 mb-8">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white p-6 rounded-2xl">
          <h1 className="text-2xl font-bold mb-2">VNR Vignana Jyothi Institute of Engineering & Technology, Hyderabad</h1>
          <h2 className="text-lg mb-4">Department of CSE (CyS, DS, AI&DS) → Class Timetable</h2>
          
          {/* Info Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-blue-200">Academic Year</span>
                <span className="font-semibold">2024-25</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-blue-200">Regulation</span>
                <span className="font-semibold">R22</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-blue-200">Section</span>
                <span className="font-semibold">A</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-blue-200">Program</span>
                <span className="font-semibold">B.Tech</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-blue-200">Branch</span>
                <span className="font-semibold">CSE-DS&AI</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-blue-200">Classroom</span>
                <span className="font-semibold">CS-Block</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-blue-200">Semester</span>
                <span className="font-semibold">V</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <Button variant="outline" className="flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Printer className="w-4 h-4" />
          <span>Print</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </Button>
      </div>

      {/* Timetable Grid */}
      <Card className="p-6 overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-slate-100 to-slate-200">
                <th className="border border-slate-300 p-3 font-semibold text-slate-800 bg-slate-200">Day/Time</th>
                {timeSlots.map((slot) => (
                  <th key={slot} className={`border border-slate-300 p-3 font-semibold text-slate-800 ${
                    slot === '1:00 - 1:40' ? 'bg-orange-100' : 'bg-slate-100'
                  }`}>
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeklySchedule.map((day) => (
                <tr key={day.day} className="hover:bg-slate-50 transition-colors">
                  <td className="border border-slate-300 p-3 font-semibold text-slate-800 bg-slate-100 text-center">
                    {day.day}
                  </td>
                  {day.classes.map((classInfo, index) => (
                    <td
                      key={index}
                      className={`border border-slate-300 p-2 text-center cursor-pointer hover:shadow-md transition-all ${classInfo.color} ${
                        classInfo.type === 'lunch' ? 'bg-orange-200 border-orange-400' : ''
                      } ${isSpecialActivity(classInfo.subject) ? 'font-semibold' : ''}`}
                      onClick={() => handleSubjectClick(classInfo)}
                    >
                      <div className="space-y-1">
                        <div className="font-semibold text-sm">{classInfo.subject}</div>
                        {classInfo.type !== 'lunch' && (
                          <>
                            <div className="text-xs text-slate-600">{classInfo.room}</div>
                            <div className="text-xs font-medium">{classInfo.faculty}</div>
                            {classInfo.subject.includes('*') && (
                              <div className="text-xs text-blue-600 font-semibold">Tutorial</div>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 text-xs text-slate-600 flex items-center space-x-4">
          <span>* Tutorial Classes</span>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-200 border border-pink-300 rounded"></div>
            <span>ECA/CCA Activities</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-200 border border-emerald-300 rounded"></div>
            <span>Sports</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-200 border border-yellow-300 rounded"></div>
            <span>Library</span>
          </div>
        </div>
      </Card>

      {/* Course Details Table */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
          <Building className="w-5 h-5 mr-2 text-blue-600" />
          Course Details
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Course Code</th>
                <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Name of the Course (Short Name)</th>
                <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Room No</th>
                <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Course Coordinator</th>
                <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Category</th>
                <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Name of the Activity</th>
                <th className="border border-slate-300 p-3 text-left font-semibold text-slate-800">Activity Coordinator</th>
              </tr>
            </thead>
            <tbody>
              {courseDetails.map((course, index) => (
                <tr key={course.courseCode} className={`hover:bg-slate-50 transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                }`}>
                  <td className="border border-slate-300 p-3 font-mono text-sm font-semibold text-blue-600">
                    {course.courseCode}
                  </td>
                  <td className="border border-slate-300 p-3">
                    <div>
                      <div className="font-semibold text-slate-800">{course.fullName}</div>
                      <div className="text-sm text-purple-600 font-medium">({course.shortName})</div>
                    </div>
                  </td>
                  <td className="border border-slate-300 p-3 text-sm font-medium text-slate-700">
                    {course.room}
                  </td>
                  <td className="border border-slate-300 p-3 text-sm font-medium text-slate-700">
                    {course.coordinator}
                  </td>
                  <td className="border border-slate-300 p-3">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                  </td>
                  <td className="border border-slate-300 p-3 text-sm text-slate-700">
                    {course.activity}
                  </td>
                  <td className="border border-slate-300 p-3 text-sm font-medium text-slate-700">
                    {course.activityCoordinator}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Footer */}
      <Card className="p-6 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-slate-800">Academic Coordination</h4>
            <p className="text-sm text-slate-600">For any timetable queries, contact the academic office</p>
          </div>
          <div className="text-center md:text-right space-y-2">
            <div className="flex flex-col md:items-end space-y-1">
              <div className="text-sm">
                <span className="font-medium text-slate-700">Class Coordinator:</span>
                <span className="ml-2 text-slate-600">Prof. A. Sharma</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">I/C Timetables:</span>
                <span className="ml-2 text-slate-600">Dr. B. Patel</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-700">HOD:</span>
                <span className="ml-2 text-slate-600">Dr. C. Kumar</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Subject Details Dialog */}
      <Dialog open={subjectDialogOpen} onOpenChange={setSubjectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Subject Details
            </DialogTitle>
            <DialogDescription>
              Detailed information about the selected subject
            </DialogDescription>
          </DialogHeader>
          {selectedSubject && (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${selectedSubject.color}`}>
                <h3 className="font-semibold text-lg">{selectedSubject.subject}</h3>
                <p className="text-sm opacity-90">{selectedSubject.fullName}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="font-medium text-slate-700">Room:</span>
                    <span className="ml-2 text-slate-600">{selectedSubject.room}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-slate-600" />
                  <div>
                    <span className="font-medium text-slate-700">Faculty:</span>
                    <span className="ml-2 text-slate-600">{selectedSubject.faculty}</span>
                  </div>
                </div>
                
                {selectedSubject.courseDetail && (
                  <div className="pt-3 border-t border-slate-200">
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Course Code:</span>
                        <span className="ml-2 text-blue-600 font-mono">{selectedSubject.courseDetail.courseCode}</span>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Category:</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {selectedSubject.courseDetail.category}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Activity Type:</span>
                        <span className="ml-2 text-slate-600">{selectedSubject.courseDetail.activity}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}