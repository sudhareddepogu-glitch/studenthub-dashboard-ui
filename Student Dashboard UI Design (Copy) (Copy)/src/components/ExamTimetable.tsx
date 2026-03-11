import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  Download, 
  Filter, 
  Clock, 
  MapPin, 
  User, 
  FileText,
  Calendar,
  Building,
  GraduationCap,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

// Mock exam data
const examDates = [
  { date: '15th Sept 2025', day: 'Monday' },
  { date: '16th Sept 2025', day: 'Tuesday' },
  { date: '17th Sept 2025', day: 'Wednesday' },
  { date: '18th Sept 2025', day: 'Thursday' },
  { date: '19th Sept 2025', day: 'Friday' },
  { date: '20th Sept 2025', day: 'Saturday' }
];

const branches = ['CE', 'EEE', 'ME', 'ECE', 'CSE', 'CS-AIML', 'CS-DS', 'CS-IOT', 'AIDS'];

const examSchedule = {
  'CE': {
    '15th Sept 2025': { subject: 'Probability Statistics and Time Series', code: '22BS1MT201', faculty: 'Dr. Sharma', room: 'E-404', common: 'CE, AIML, DS, AIDS' },
    '16th Sept 2025': { subject: 'Engineering Mathematics-III', code: '22BS1MT301', faculty: 'Prof. Kumar', room: 'F-203', common: 'CE, EEE, ME' },
    '17th Sept 2025': { subject: 'Structural Analysis', code: '22CE1CE301', faculty: 'Dr. Reddy', room: 'E-105', common: null },
    '18th Sept 2025': { subject: 'Concrete Technology', code: '22CE1CE302', faculty: 'Prof. Rao', room: 'E-205', common: null },
    '19th Sept 2025': { subject: 'Surveying', code: '22CE1CE303', faculty: 'Dr. Singh', room: 'F-101', common: null },
    '20th Sept 2025': { subject: 'Fluid Mechanics', code: '22CE1CE304', faculty: 'Prof. Gupta', room: 'E-301', common: 'CE, ME' }
  },
  'EEE': {
    '15th Sept 2025': { subject: 'Circuit Analysis', code: '22EE1EE201', faculty: 'Dr. Patel', room: 'F-302', common: null },
    '16th Sept 2025': { subject: 'Engineering Mathematics-III', code: '22BS1MT301', faculty: 'Prof. Kumar', room: 'F-203', common: 'CE, EEE, ME' },
    '17th Sept 2025': { subject: 'Electrical Machines-I', code: '22EE1EE301', faculty: 'Dr. Joshi', room: 'F-402', common: null },
    '18th Sept 2025': { subject: 'Control Systems', code: '22EE1EE302', faculty: 'Prof. Verma', room: 'E-402', common: null },
    '19th Sept 2025': { subject: 'Power Electronics', code: '22EE1EE303', faculty: 'Dr. Agarwal', room: 'F-501', common: null },
    '20th Sept 2025': { subject: 'Digital Electronics', code: '22EE1EE304', faculty: 'Prof. Mehta', room: 'E-502', common: 'EEE, ECE' }
  },
  'ME': {
    '15th Sept 2025': { subject: 'Thermodynamics', code: '22ME1ME201', faculty: 'Dr. Chandra', room: 'Main Hall A', common: null },
    '16th Sept 2025': { subject: 'Engineering Mathematics-III', code: '22BS1MT301', faculty: 'Prof. Kumar', room: 'F-203', common: 'CE, EEE, ME' },
    '17th Sept 2025': { subject: 'Manufacturing Processes', code: '22ME1ME301', faculty: 'Dr. Prasad', room: 'Workshop-1', common: null },
    '18th Sept 2025': { subject: 'Machine Design', code: '22ME1ME302', faculty: 'Prof. Iyer', room: 'E-305', common: null },
    '19th Sept 2025': { subject: 'Heat Transfer', code: '22ME1ME303', faculty: 'Dr. Nair', room: 'F-305', common: null },
    '20th Sept 2025': { subject: 'Fluid Mechanics', code: '22CE1CE304', faculty: 'Prof. Gupta', room: 'E-301', common: 'CE, ME' }
  },
  'ECE': {
    '15th Sept 2025': { subject: 'Signals and Systems', code: '22EC1EC201', faculty: 'Dr. Saxena', room: 'E-501', common: null },
    '16th Sept 2025': { subject: 'Network Analysis', code: '22EC1EC301', faculty: 'Prof. Bansal', room: 'F-401', common: null },
    '17th Sept 2025': { subject: 'Analog Electronics', code: '22EC1EC302', faculty: 'Dr. Malhotra', room: 'E-601', common: null },
    '18th Sept 2025': { subject: 'Electromagnetic Fields', code: '22EC1EC303', faculty: 'Prof. Chopra', room: 'F-601', common: null },
    '19th Sept 2025': { subject: 'Communication Systems', code: '22EC1EC304', faculty: 'Dr. Sinha', room: 'E-701', common: null },
    '20th Sept 2025': { subject: 'Digital Electronics', code: '22EE1EE304', faculty: 'Prof. Mehta', room: 'E-502', common: 'EEE, ECE' }
  },
  'CSE': {
    '15th Sept 2025': { subject: 'Data Structures and Algorithms', code: '22CS1CS201', faculty: 'Dr. Wilson', room: 'CS-Block A', common: null },
    '16th Sept 2025': { subject: 'Database Management Systems', code: '22CS1CS301', faculty: 'Prof. Chen', room: 'CS-Block B', common: null },
    '17th Sept 2025': { subject: 'Operating Systems', code: '22CS1CS302', faculty: 'Dr. Davis', room: 'CS-Block C', common: null },
    '18th Sept 2025': { subject: 'Computer Networks', code: '22CS1CS303', faculty: 'Prof. Thompson', room: 'CS-Block D', common: null },
    '19th Sept 2025': { subject: 'Software Engineering', code: '22CS1CS304', faculty: 'Dr. Miller', room: 'CS-Block E', common: null },
    '20th Sept 2025': { subject: 'Web Technologies', code: '22CS1CS305', faculty: 'Prof. Taylor', room: 'CS-Block F', common: null }
  },
  'CS-AIML': {
    '15th Sept 2025': { subject: 'Probability Statistics and Time Series', code: '22BS1MT201', faculty: 'Dr. Sharma', room: 'E-404', common: 'CE, AIML, DS, AIDS' },
    '16th Sept 2025': { subject: 'Machine Learning Fundamentals', code: '22AI1AI201', faculty: 'Dr. Anderson', room: 'AI-Lab 1', common: null },
    '17th Sept 2025': { subject: 'Python Programming', code: '22AI1AI301', faculty: 'Prof. Rodriguez', room: 'AI-Lab 2', common: 'AIML, DS' },
    '18th Sept 2025': { subject: 'Linear Algebra', code: '22AI1AI302', faculty: 'Dr. Kim', room: 'AI-Lab 3', common: 'AIML, DS, AIDS' },
    '19th Sept 2025': { subject: 'Deep Learning', code: '22AI1AI303', faculty: 'Prof. Zhang', room: 'AI-Lab 4', common: null },
    '20th Sept 2025': { subject: 'Neural Networks', code: '22AI1AI304', faculty: 'Dr. Watson', room: 'AI-Lab 5', common: 'AIML, AIDS' }
  },
  'CS-DS': {
    '15th Sept 2025': { subject: 'Probability Statistics and Time Series', code: '22BS1MT201', faculty: 'Dr. Sharma', room: 'E-404', common: 'CE, AIML, DS, AIDS' },
    '16th Sept 2025': { subject: 'Data Analytics', code: '22DS1DS201', faculty: 'Dr. Brown', room: 'DS-Lab 1', common: null },
    '17th Sept 2025': { subject: 'Python Programming', code: '22AI1AI301', faculty: 'Prof. Rodriguez', room: 'AI-Lab 2', common: 'AIML, DS' },
    '18th Sept 2025': { subject: 'Linear Algebra', code: '22AI1AI302', faculty: 'Dr. Kim', room: 'AI-Lab 3', common: 'AIML, DS, AIDS' },
    '19th Sept 2025': { subject: 'Big Data Analytics', code: '22DS1DS301', faculty: 'Prof. Clark', room: 'DS-Lab 2', common: null },
    '20th Sept 2025': { subject: 'Data Visualization', code: '22DS1DS302', faculty: 'Dr. Lewis', room: 'DS-Lab 3', common: null }
  },
  'CS-IOT': {
    '15th Sept 2025': { subject: 'Embedded Systems', code: '22IT1IT201', faculty: 'Dr. Johnson', room: 'IoT-Lab 1', common: null },
    '16th Sept 2025': { subject: 'Sensor Networks', code: '22IT1IT301', faculty: 'Prof. Williams', room: 'IoT-Lab 2', common: null },
    '17th Sept 2025': { subject: 'Wireless Communication', code: '22IT1IT302', faculty: 'Dr. Garcia', room: 'IoT-Lab 3', common: null },
    '18th Sept 2025': { subject: 'Cloud Computing', code: '22IT1IT303', faculty: 'Prof. Martinez', room: 'IoT-Lab 4', common: null },
    '19th Sept 2025': { subject: 'IoT Security', code: '22IT1IT304', faculty: 'Dr. Robinson', room: 'IoT-Lab 5', common: null },
    '20th Sept 2025': { subject: 'Edge Computing', code: '22IT1IT305', faculty: 'Prof. Lee', room: 'IoT-Lab 6', common: null }
  },
  'AIDS': {
    '15th Sept 2025': { subject: 'Probability Statistics and Time Series', code: '22BS1MT201', faculty: 'Dr. Sharma', room: 'E-404', common: 'CE, AIML, DS, AIDS' },
    '16th Sept 2025': { subject: 'Artificial Intelligence', code: '22AD1AD201', faculty: 'Dr. White', room: 'AIDS-Lab 1', common: null },
    '17th Sept 2025': { subject: 'Data Science Fundamentals', code: '22AD1AD301', faculty: 'Prof. Hall', room: 'AIDS-Lab 2', common: null },
    '18th Sept 2025': { subject: 'Linear Algebra', code: '22AI1AI302', faculty: 'Dr. Kim', room: 'AI-Lab 3', common: 'AIML, DS, AIDS' },
    '19th Sept 2025': { subject: 'Machine Learning Applications', code: '22AD1AD302', faculty: 'Prof. Allen', room: 'AIDS-Lab 3', common: null },
    '20th Sept 2025': { subject: 'Neural Networks', code: '22AI1AI304', faculty: 'Dr. Watson', room: 'AI-Lab 5', common: 'AIML, AIDS' }
  }
};

export function ExamTimetable() {
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const filteredBranches = selectedBranch === 'all' ? branches : [selectedBranch];

  const handleExportPDF = () => {
    // Simulate PDF export
    setTimeout(() => {
      alert('Exam Timetable PDF downloaded successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200/20 rounded-full transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative p-8 text-center">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                VNR Vignana Jyothi Institute of Engineering and Technology
              </h1>
              <p className="text-slate-600 text-sm md:text-base">
                Vignanapuri, Pragathi Nagar, Nizampet (S.O), Hyderabad – 500 090, Telangana, India
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-2xl inline-block">
              <h2 className="text-lg md:text-xl font-bold">
                TIMETABLE FOR II B.Tech, I Semester (R22)
              </h2>
              <p className="text-orange-100 mt-1">
                Sessional Examination – I, September 2025
              </p>
            </div>
          </div>
        </Card>

        {/* Controls Section */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <label className="text-sm font-medium text-slate-700">Filter by Branch:</label>
              </div>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Exam Timetable (PDF)
            </Button>
          </div>
        </Card>

        {/* Date Row */}
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {examDates.map((dateInfo, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl text-center"
              >
                <div className="font-bold text-sm md:text-base">{dateInfo.date}</div>
                <div className="text-orange-100 text-xs md:text-sm">{dateInfo.day}</div>
                <div className="text-orange-100 text-xs mt-1">10:00 AM – 12:00 Noon</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Timetable */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Examination Timetable</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 min-w-[1200px]">
              <thead>
                <tr className="bg-slate-700 text-white">
                  <th className="border border-slate-400 p-3 text-left font-semibold">Branch</th>
                  {examDates.map((dateInfo, index) => (
                    <th key={index} className="border border-slate-400 p-3 text-center font-semibold min-w-[180px]">
                      <div>{dateInfo.date}</div>
                      <div className="text-xs text-slate-300 mt-1">{dateInfo.day}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch) => (
                  <tr key={branch} className="hover:bg-slate-50 transition-colors">
                    <td className="border border-slate-300 p-3 font-semibold bg-slate-100 text-slate-800">
                      {branch}
                    </td>
                    {examDates.map((dateInfo, dateIndex) => {
                      const exam = examSchedule[branch]?.[dateInfo.date];
                      const cellKey = `${branch}-${dateInfo.date}`;
                      
                      return (
                        <TooltipProvider key={dateIndex}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <td 
                                className="border border-slate-300 p-3 text-sm cursor-pointer hover:bg-blue-50 transition-colors"
                                onMouseEnter={() => setHoveredCell(cellKey)}
                                onMouseLeave={() => setHoveredCell(null)}
                              >
                                {exam ? (
                                  <div className="space-y-2">
                                    <div className="font-semibold text-slate-800 leading-tight">
                                      {exam.subject}
                                    </div>
                                    <div className="text-xs text-slate-600 font-mono">
                                      {exam.code}
                                    </div>
                                    {exam.common && (
                                      <div className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-lg border border-orange-300">
                                        Common to: {exam.common}
                                      </div>
                                    )}
                                    <div className="flex items-center text-xs text-blue-600">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      {exam.room}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-slate-400 text-center">—</div>
                                )}
                              </td>
                            </TooltipTrigger>
                            {exam && (
                              <TooltipContent side="top" className="max-w-xs">
                                <div className="space-y-2">
                                  <div className="font-semibold">{exam.subject}</div>
                                  <div className="text-xs space-y-1">
                                    <div className="flex items-center">
                                      <FileText className="w-3 h-3 mr-1" />
                                      Code: {exam.code}
                                    </div>
                                    <div className="flex items-center">
                                      <User className="w-3 h-3 mr-1" />
                                      Faculty: {exam.faculty}
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      Room: {exam.room}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Time: 10:00 AM – 12:00 Noon
                                    </div>
                                  </div>
                                </div>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Room Allotment Section */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Room Allotment Matrix</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-700 text-white">
                  <th className="border border-slate-400 p-3 text-left font-semibold">Branch</th>
                  <th className="border border-slate-400 p-3 text-left font-semibold">Exam Date</th>
                  <th className="border border-slate-400 p-3 text-left font-semibold">Subject</th>
                  <th className="border border-slate-400 p-3 text-left font-semibold">Subject Code</th>
                  <th className="border border-slate-400 p-3 text-left font-semibold">Room No.</th>
                  <th className="border border-slate-400 p-3 text-left font-semibold">Faculty</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((branch) => 
                  examDates.map((dateInfo) => {
                    const exam = examSchedule[branch]?.[dateInfo.date];
                    if (!exam) return null;
                    
                    return (
                      <tr key={`${branch}-${dateInfo.date}`} className="hover:bg-slate-50 transition-colors">
                        <td className="border border-slate-300 p-3 font-semibold text-slate-800">
                          {branch}
                        </td>
                        <td className="border border-slate-300 p-3 text-slate-700">
                          {dateInfo.date}
                        </td>
                        <td className="border border-slate-300 p-3 text-slate-700">
                          {exam.subject}
                        </td>
                        <td className="border border-slate-300 p-3 font-mono text-sm text-slate-600">
                          {exam.code}
                        </td>
                        <td className="border border-slate-300 p-3">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                            {exam.room}
                          </Badge>
                        </td>
                        <td className="border border-slate-300 p-3 text-slate-700">
                          {exam.faculty}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Special Notes Section */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-bold text-slate-800">Important Instructions</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">Note 1: Report Issues Immediately</h4>
                    <p className="text-orange-700 text-sm">
                      Any omissions or clashes in the timetable must be informed to the Exam Branch immediately. 
                      Contact the Controller of Examinations office for urgent clarifications.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">Note 2: Holiday Policy</h4>
                    <p className="text-blue-700 text-sm">
                      Even if the Government declares a holiday, examinations will be conducted as per the scheduled timetable. 
                      Students must attend all examinations regardless of holidays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex justify-between items-end">
                <div className="text-sm text-slate-600">
                  <p>For any queries, contact:</p>
                  <p className="font-semibold">Exam Branch Office</p>
                  <p>VNR VJIET, Hyderabad</p>
                </div>
                <div className="text-right">
                  <div className="w-40 h-16 border-b border-slate-400 mb-2"></div>
                  <p className="text-sm font-semibold text-slate-800">Controller of Examinations</p>
                  <p className="text-xs text-slate-600">VNR Vignana Jyothi Institute of Engineering & Technology</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}