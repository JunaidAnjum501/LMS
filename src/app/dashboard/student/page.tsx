'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock, Award, Calendar, BarChart2, CheckCircle, FileText, Settings, User, LogOut, Search, Filter, Star, Users, Clock3, BookOpenCheck, Video, Bell, ExternalLink, MessageSquare, CheckSquare, FileCheck, FileQuestion, ThumbsUp, Loader, PenTool, Upload, Download, X, Plus, ChevronDown, ChevronRight, Edit, Trash, AlertCircle, Target, TrendingUp, FilePlus, Info } from 'lucide-react';

// Mock data for all available courses
const availableCourses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 1245,
    price: 49.99,
    duration: '8 weeks',
    level: 'Beginner',
    subject: 'Web Development',
    image: '/images/course-1.jpg',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
  },
  {
    id: 2,
    title: 'Data Science with Python',
    instructor: 'James Wilson',
    rating: 4.6,
    students: 980,
    price: 59.99,
    duration: '10 weeks',
    level: 'Intermediate',
    subject: 'Data Science',
    image: '/images/course-4.jpg',
    description: 'Master data analysis, visualization, and machine learning with Python.',
  },
  {
    id: 3,
    title: 'UX/UI Design Principles',
    instructor: 'Emily Zhang',
    rating: 4.9,
    students: 750,
    price: 69.99,
    duration: '6 weeks',
    level: 'Beginner',
    subject: 'Design',
    image: '/images/course-5.jpg',
    description: 'Learn user experience and interface design principles for creating intuitive applications.',
  },
  {
    id: 4,
    title: 'Advanced JavaScript Frameworks',
    instructor: 'Michael Brown',
    rating: 4.7,
    students: 1120,
    price: 79.99,
    duration: '12 weeks',
    level: 'Advanced',
    subject: 'Web Development',
    image: '/images/course-2.jpg',
    description: 'Master modern JavaScript frameworks like React, Vue, and Angular.',
  },
  {
    id: 5,
    title: 'Mobile App Development with Flutter',
    instructor: 'Lisa Chen',
    rating: 4.5,
    students: 890,
    price: 69.99,
    duration: '10 weeks',
    level: 'Intermediate',
    subject: 'Mobile Development',
    image: '/images/course-3.jpg',
    description: 'Build cross-platform mobile applications using Flutter and Dart.',
  },
  {
    id: 6,
    title: 'Machine Learning Fundamentals',
    instructor: 'David Kim',
    rating: 4.8,
    students: 1350,
    price: 89.99,
    duration: '14 weeks',
    level: 'Advanced',
    subject: 'Data Science',
    image: '/images/course-6.jpg',
    description: 'Learn the core concepts of machine learning and artificial intelligence.',
  },
];

// Mock data for enrolled courses
const enrolledCourses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Sarah Johnson',
    progress: 65,
    nextLesson: 'CSS Flexbox Layout',
    image: '/images/course-1.jpg',
  },
  {
    id: 2,
    title: 'Data Science with Python',
    instructor: 'James Wilson',
    progress: 30,
    nextLesson: 'Data Visualization with Matplotlib',
    image: '/images/course-4.jpg',
  },
  {
    id: 3,
    title: 'UX/UI Design Principles',
    instructor: 'Emily Zhang',
    progress: 10,
    nextLesson: 'User Research Methods',
    image: '/images/course-5.jpg',
  },
];

// Mock data for upcoming deadlines and assignments
const upcomingDeadlines = [
  {
    id: 1,
    title: 'Web Development Project Submission',
    course: 'Introduction to Web Development',
    dueDate: '2023-11-15',
    type: 'Assignment',
    description: 'Create a responsive website using HTML, CSS, and JavaScript. Include at least 3 pages with navigation.',
    maxScore: 100,
    status: 'not_started', // not_started, in_progress, submitted, graded
    attachments: [],
    submissionType: 'file_upload', // file_upload, text_entry, url, media_recording
  },
  {
    id: 2,
    title: 'Data Analysis Quiz',
    course: 'Data Science with Python',
    dueDate: '2023-11-10',
    type: 'Quiz',
    description: 'Multiple choice and short answer questions covering data visualization and statistical analysis.',
    maxScore: 50,
    timeLimit: 60, // minutes
    status: 'not_started',
    questionCount: 25,
  },
  {
    id: 3,
    title: 'User Interface Mockup',
    course: 'UX/UI Design Principles',
    dueDate: '2023-11-20',
    type: 'Project',
    description: 'Design a mobile app interface for a fitness tracking application. Include at least 5 screen mockups.',
    maxScore: 100,
    status: 'in_progress',
    attachments: ['UI_Draft_v1.fig'],
    submissionType: 'file_upload',
  },
  {
    id: 4,
    title: 'Machine Learning Midterm Exam',
    course: 'Machine Learning Fundamentals',
    dueDate: '2023-11-25',
    type: 'Exam',
    description: 'Comprehensive exam covering supervised and unsupervised learning algorithms.',
    maxScore: 100,
    timeLimit: 120, // minutes
    status: 'not_started',
    questionCount: 40,
  },
];

// Mock data for completed assignments and exams with feedback
const completedAssignments = [
  {
    id: 101,
    title: 'CSS Layout Challenge',
    course: 'Introduction to Web Development',
    submittedDate: '2023-10-20',
    dueDate: '2023-10-22',
    type: 'Assignment',
    score: 92,
    maxScore: 100,
    feedback: 'Excellent work on the responsive design! Your grid layout implementation was very well done. Consider adding more comments to your CSS for better maintainability.',
    status: 'graded',
    submissionFiles: ['layout_challenge.zip'],
  },
  {
    id: 102,
    title: 'Python Basics Quiz',
    course: 'Data Science with Python',
    submittedDate: '2023-10-15',
    dueDate: '2023-10-15',
    type: 'Quiz',
    score: 45,
    maxScore: 50,
    feedback: 'Great understanding of Python fundamentals. Question 12 about list comprehensions was incorrect.',
    status: 'graded',
    correctAnswers: 18,
    totalQuestions: 20,
  },
  {
    id: 103,
    title: 'User Research Report',
    course: 'UX/UI Design Principles',
    submittedDate: '2023-10-05',
    dueDate: '2023-10-10',
    type: 'Project',
    score: 85,
    maxScore: 100,
    feedback: 'Your research methodology was sound and your insights valuable. The report could benefit from more visual representations of your findings.',
    status: 'graded',
    submissionFiles: ['user_research_report.pdf', 'interview_recordings.zip'],
  },
];

// Mock data for achievements
const achievements = [
  {
    id: 1,
    title: 'Fast Learner',
    description: 'Completed 5 lessons in one day',
    date: '2023-10-25',
    icon: '/images/achievement-1.svg',
  },
  {
    id: 2,
    title: 'Perfect Score',
    description: 'Scored 100% on a quiz',
    date: '2023-10-20',
    icon: '/images/achievement-2.svg',
  },
  {
    id: 3,
    title: 'Consistent Learner',
    description: 'Logged in for 7 consecutive days',
    date: '2023-10-15',
    icon: '/images/achievement-3.svg',
  },
];

// Mock data for learning goals
const learningGoals = [
  {
    id: 1,
    title: 'Complete Web Development Course',
    target: 100,
    current: 65,
    deadline: '2023-12-15',
    type: 'course_completion',
  },
  {
    id: 2,
    title: 'Study 10 hours per week',
    target: 10,
    current: 7.5,
    deadline: '2023-11-12',
    type: 'study_hours',
    recurrence: 'weekly',
  },
  {
    id: 3,
    title: 'Complete 5 practice projects',
    target: 5,
    current: 2,
    deadline: '2023-12-30',
    type: 'projects',
  },
];

// Mock data for learning analytics
const learningAnalytics = {
  weeklyStudyHours: [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.0 },
    { day: 'Wed', hours: 0.5 },
    { day: 'Thu', hours: 1.0 },
    { day: 'Fri', hours: 2.5 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ],
  monthlyProgress: [
    { month: 'Aug', progress: 15 },
    { month: 'Sep', progress: 40 },
    { month: 'Oct', progress: 65 },
    { month: 'Nov', progress: 0 },
  ],
  strengths: ['JavaScript', 'HTML', 'CSS'],
  areasToImprove: ['React', 'Node.js', 'Database Design'],
  streak: 5, // days in a row with activity
  totalHoursLearned: 24.5,
  certificatesEarned: 2,
  coursesCompleted: 2,
  assignmentsCompleted: 12,
  quizAvgScore: 85,
};

// Mock data for live classes and events
const liveClasses = [
  {
    id: 1,
    title: 'Advanced JavaScript Concepts',
    instructor: 'Sarah Johnson',
    course: 'Introduction to Web Development',
    date: '2023-11-15',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    platform: 'Zoom',
    meetingId: '123-456-7890',
    description: 'Deep dive into closures, promises, and async/await patterns.',
    materials: ['slides.pdf', 'code-examples.zip'],
    isRegistered: true,
  },
  {
    id: 2,
    title: 'Data Visualization Workshop',
    instructor: 'James Wilson',
    course: 'Data Science with Python',
    date: '2023-11-17',
    startTime: '2:00 PM',
    endTime: '4:00 PM',
    platform: 'Google Meet',
    meetingId: 'abc-def-ghi',
    description: 'Hands-on workshop on creating effective data visualizations with matplotlib and seaborn.',
    materials: ['workshop-materials.pdf'],
    isRegistered: true,
  },
  {
    id: 3,
    title: 'UX Research Methods',
    instructor: 'Emily Zhang',
    course: 'UX/UI Design Principles',
    date: '2023-11-20',
    startTime: '1:00 PM',
    endTime: '2:30 PM',
    platform: 'Microsoft Teams',
    meetingId: 'ux-research-123',
    description: 'Learn various UX research methods and when to apply them.',
    materials: [],
    isRegistered: false,
  },
];

// Mock data for special events
const specialEvents = [
  {
    id: 1,
    title: 'Industry Expert Panel: Future of Web Development',
    date: '2023-11-25',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    type: 'Panel Discussion',
    speakers: ['John Doe (Google)', 'Jane Smith (Microsoft)', 'Bob Johnson (Meta)'],
    description: 'Join industry experts as they discuss emerging trends and the future of web development.',
    isRegistered: false,
  },
  {
    id: 2,
    title: 'Hackathon: Build an AI-powered App',
    date: '2023-12-10',
    startTime: '9:00 AM',
    endTime: '6:00 PM',
    type: 'Hackathon',
    speakers: ['AI Research Team'],
    description: 'A full-day hackathon to build applications using the latest AI technologies.',
    isRegistered: true,
  },
];

// Mock data for office hours
const officeHours = [
  {
    id: 1,
    instructor: 'Sarah Johnson',
    course: 'Introduction to Web Development',
    day: 'Monday',
    startTime: '3:00 PM',
    endTime: '5:00 PM',
    platform: 'Zoom',
    bookingLink: '/book-office-hours/1',
  },
  {
    id: 2,
    instructor: 'James Wilson',
    course: 'Data Science with Python',
    day: 'Wednesday',
    startTime: '4:00 PM',
    endTime: '6:00 PM',
    platform: 'Google Meet',
    bookingLink: '/book-office-hours/2',
  },
];

// Helper function to check if a date is today
const isToday = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
};

// Helper function to check if a date is tomorrow
const isTomorrow = (dateString: string) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const date = new Date(dateString);
  return date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear();
};

// Helper function to get days remaining until a date
const getDaysRemaining = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dateString);
  date.setHours(0, 0, 0, 0);
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function StudentDashboard() {
  const router = useRouter();
  
  // Mock user role - in real app, this would come from auth context
  const [userRole, setUserRole] = useState('student');

  useEffect(() => {
    // In a real app, this would check the actual user role from auth context
    // For now, we'll use the mock role to demonstrate routing
    switch (userRole) {
      case 'instructor':
        router.push('/dashboard/instructor');
        break;
      case 'parent':
        router.push('/dashboard/parent');
        break;
      case 'admin':
        router.push('/dashboard/admin');
        break;
      // student stays on this page
    }
  }, [userRole, router]);

  // State for active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for course filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    subject: '',
    level: '',
    instructor: '',
    price: '',
    rating: 0,
    duration: '',
  });
  
  // State for course preview
  const [previewCourse, setPreviewCourse] = useState<number | null>(null);
  
  // State for new goal form
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: 0,
    deadline: '',
    type: 'course_completion',
  });
  
  // State for event registration
  const [showEventDetails, setShowEventDetails] = useState<number | null>(null);
  
  // State for assignment and quiz modals
  const [showAssignmentDetails, setShowAssignmentDetails] = useState<number | null>(null);
  const [showQuizDetails, setShowQuizDetails] = useState<number | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<number | null>(null);
  const [fileUploads, setFileUploads] = useState<string[]>([]);
  const [textSubmission, setTextSubmission] = useState('');
  const [submissionUrl, setSubmissionUrl] = useState('');
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Calculate days remaining
  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Role Switcher for Demo */}
          <div className="mb-4 flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Current Role:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
              <option value="parent">Parent</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden relative">
                  <Image 
                    src="/images/avatar-placeholder.jpg" 
                    alt="User profile" 
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden relative mb-4">
                  <Image 
                    src="/images/avatar-placeholder.jpg" 
                    alt="User profile" 
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">Student</p>
              </div>
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'overview' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <BarChart2 className="mr-3 h-5 w-5" />
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'courses' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <BookOpen className="mr-3 h-5 w-5" />
                  My Courses
                </button>
                <button 
                  onClick={() => setActiveTab('discover')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'discover' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Search className="mr-3 h-5 w-5" />
                  Discover Courses
                </button>
                <button 
                  onClick={() => setActiveTab('progress')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'progress' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <BarChart2 className="mr-3 h-5 w-5" />
                  Learning Progress
                </button>
                <button 
                  onClick={() => setActiveTab('live-classes')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'live-classes' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Video className="mr-3 h-5 w-5" />
                  Live Classes & Events
                </button>
                <button 
                  onClick={() => setActiveTab('assignments')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'assignments' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FileText className="mr-3 h-5 w-5" />
                  Assignments
                </button>
                <button 
                  onClick={() => setActiveTab('achievements')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'achievements' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Award className="mr-3 h-5 w-5" />
                  Achievements
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${activeTab === 'settings' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </button>
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Hours Learned</span>
                    <span className="font-medium">{learningAnalytics.totalHoursLearned}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Courses Completed</span>
                    <span className="font-medium">{learningAnalytics.coursesCompleted}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Assignments</span>
                    <span className="font-medium">{learningAnalytics.assignmentsCompleted}/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Quiz Average Score</span>
                    <span className="font-medium">{learningAnalytics.quizAvgScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${learningAnalytics.quizAvgScore}%` }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-orange-100 text-orange-600 p-1.5 rounded-full mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">{learningAnalytics.streak} Day Streak</span>
                    </div>
                    <span className="text-xs text-gray-500">Keep it up!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-primary text-white rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
                  <p className="mb-4">You've completed 65% of your weekly learning goal. Keep it up!</p>
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4">
                    <div className="bg-white h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <button className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                    Continue Learning
                  </button>
                </div>
                
                {/* In Progress Courses */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">In Progress Courses</h3>
                    <Link href="/dashboard/courses" className="text-primary text-sm font-medium hover:underline">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {enrolledCourses.slice(0, 2).map(course => (
                      <div key={course.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 rounded-md bg-gray-200 overflow-hidden relative flex-shrink-0">
                          <Image 
                            src={course.image} 
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">{course.title}</h4>
                          <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Upcoming Deadlines */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Deadlines</h3>
                    <Link href="/dashboard/assignments" className="text-primary text-sm font-medium hover:underline">
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingDeadlines.map(deadline => {
                      const daysRemaining = getDaysRemaining(deadline.dueDate);
                      return (
                        <div key={deadline.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${daysRemaining <= 2 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-gray-900">{deadline.title}</h4>
                            <p className="text-xs text-gray-600 mb-1">{deadline.course}</p>
                            <div className="flex justify-between">
                              <span className="text-xs text-gray-600">{deadline.type}</span>
                              <span className={`text-xs font-medium ${daysRemaining <= 2 ? 'text-red-600' : 'text-blue-600'}`}>
                                Due {formatDate(deadline.dueDate)} ({daysRemaining} days left)
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Recent Achievements */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Achievements</h3>
                    <Link href="/dashboard/achievements" className="text-primary text-sm font-medium hover:underline">
                      View All
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.map(achievement => (
                      <div key={achievement.id} className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-3">
                          <Image 
                            src={achievement.icon} 
                            alt={achievement.title}
                            width={48}
                            height={48}
                          />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 mb-1">{achievement.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{formatDate(achievement.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Discover Courses Tab */}
            {activeTab === 'discover' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Discover Courses</h2>
                
                {/* Search and Filters */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search courses..."
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-primary focus:border-primary"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button 
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        onClick={() => document.getElementById('filterPanel')?.classList.toggle('hidden')}
                      >
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                      </button>
                    </div>
                  </div>
                  
                  {/* Filter Panel */}
                  <div id="filterPanel" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 border border-gray-200 rounded-lg mb-4 hidden">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        value={selectedFilters.subject}
                        onChange={(e) => setSelectedFilters({...selectedFilters, subject: e.target.value})}
                      >
                        <option value="">All Subjects</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Design">Design</option>
                        <option value="Mobile Development">Mobile Development</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                      <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        value={selectedFilters.level}
                        onChange={(e) => setSelectedFilters({...selectedFilters, level: e.target.value})}
                      >
                        <option value="">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                      <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        value={selectedFilters.instructor}
                        onChange={(e) => setSelectedFilters({...selectedFilters, instructor: e.target.value})}
                      >
                        <option value="">All Instructors</option>
                        <option value="Sarah Johnson">Sarah Johnson</option>
                        <option value="James Wilson">James Wilson</option>
                        <option value="Emily Zhang">Emily Zhang</option>
                        <option value="Michael Brown">Michael Brown</option>
                        <option value="Lisa Chen">Lisa Chen</option>
                        <option value="David Kim">David Kim</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        value={selectedFilters.price}
                        onChange={(e) => setSelectedFilters({...selectedFilters, price: e.target.value})}
                      >
                        <option value="">Any Price</option>
                        <option value="0-50">$0 - $50</option>
                        <option value="50-100">$50 - $100</option>
                        <option value="100+">$100+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                      <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        value={selectedFilters.rating}
                        onChange={(e) => setSelectedFilters({...selectedFilters, rating: Number(e.target.value)})}
                      >
                        <option value="0">Any Rating</option>
                        <option value="4">4+ Stars</option>
                        <option value="4.5">4.5+ Stars</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                        value={selectedFilters.duration}
                        onChange={(e) => setSelectedFilters({...selectedFilters, duration: e.target.value})}
                      >
                        <option value="">Any Duration</option>
                        <option value="short">Short ({'<'} 6 weeks)</option>
                        <option value="medium">Medium (6-10 weeks)</option>
                        <option value="long">Long ({'>'} 10 weeks)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="text-sm text-primary hover:underline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedFilters({
                          subject: '',
                          level: '',
                          instructor: '',
                          price: '',
                          rating: 0,
                          duration: '',
                        });
                      }}
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
                
                {/* Course Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {availableCourses
                    .filter(course => {
                      // Apply search term filter
                      if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
                          !course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) &&
                          !course.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return false;
                      }
                      
                      // Apply subject filter
                      if (selectedFilters.subject && course.subject !== selectedFilters.subject) {
                        return false;
                      }
                      
                      // Apply level filter
                      if (selectedFilters.level && course.level !== selectedFilters.level) {
                        return false;
                      }
                      
                      // Apply instructor filter
                      if (selectedFilters.instructor && course.instructor !== selectedFilters.instructor) {
                        return false;
                      }
                      
                      // Apply price filter
                      if (selectedFilters.price) {
                        const [min, max] = selectedFilters.price.split('-').map(Number);
                        if (max) {
                          if (course.price < min || course.price > max) return false;
                        } else {
                          if (course.price < min) return false;
                        }
                      }
                      
                      // Apply rating filter
                      if (selectedFilters.rating > 0 && course.rating < selectedFilters.rating) {
                        return false;
                      }
                      
                      // Apply duration filter
                      if (selectedFilters.duration) {
                        const duration = parseInt(course.duration);
                        if (selectedFilters.duration === 'short' && duration >= 6) return false;
                        if (selectedFilters.duration === 'medium' && (duration < 6 || duration > 10)) return false;
                        if (selectedFilters.duration === 'long' && duration <= 10) return false;
                      }
                      
                      return true;
                    })
                    .map(course => (
                      <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-48 bg-gray-200">
                          <Image 
                            src={course.image} 
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex items-center text-yellow-400 mr-1">
                              <Star className="h-4 w-4 fill-current" />
                            </div>
                            <span className="text-sm font-medium">{course.rating}</span>
                            <span className="text-sm text-gray-500 ml-1">({course.students} students)</span>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="text-sm font-bold text-primary">${course.price}</div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600">{course.level}</span>
                            <button 
                              onClick={() => setPreviewCourse(course.id)}
                              className="text-primary text-sm font-medium hover:underline"
                            >
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                
                {/* Course Preview Modal */}
                {previewCourse && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                      {(() => {
                        const course = availableCourses.find(c => c.id === previewCourse);
                        if (!course) return null;
                        
                        return (
                          <div>
                            <div className="relative h-64 bg-gray-200">
                              <Image 
                                src={course.image} 
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                              <button 
                                onClick={() => setPreviewCourse(null)}
                                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                            
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{course.title}</h2>
                                  <p className="text-gray-600">{course.subject} • {course.level}</p>
                                </div>
                                <div className="text-2xl font-bold text-primary">${course.price}</div>
                              </div>
                              
                              <div className="flex items-center mb-6">
                                <div className="flex items-center text-yellow-400 mr-2">
                                  <Star className="h-5 w-5 fill-current" />
                                  <span className="ml-1 text-lg font-medium">{course.rating}</span>
                                </div>
                                <div className="flex items-center text-gray-600 mr-2">
                                  <Users className="h-5 w-5 mr-1" />
                                  <span>{course.students} students</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                  <Clock3 className="h-5 w-5 mr-1" />
                                  <span>{course.duration}</span>
                                </div>
                              </div>
                              
                              <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">About This Course</h3>
                                <p className="text-gray-700">{course.description}</p>
                              </div>
                              
                              <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Course Syllabus</h3>
                                <div className="space-y-3">
                                  <div className="p-3 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <h4 className="font-medium">Module 1: Introduction</h4>
                                      <span className="text-sm text-gray-500">2 hours</span>
                                    </div>
                                  </div>
                                  <div className="p-3 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <h4 className="font-medium">Module 2: Core Concepts</h4>
                                      <span className="text-sm text-gray-500">3 hours</span>
                                    </div>
                                  </div>
                                  <div className="p-3 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between items-center">
                                      <h4 className="font-medium">Module 3: Advanced Techniques</h4>
                                      <span className="text-sm text-gray-500">4 hours</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Course Preview</h3>
                                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="bg-white bg-opacity-80 rounded-full p-4 shadow-md">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">What You'll Learn</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <li className="flex items-start">
                                    <BookOpenCheck className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Core concepts and fundamentals</span>
                                  </li>
                                  <li className="flex items-start">
                                    <BookOpenCheck className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Practical, hands-on projects</span>
                                  </li>
                                  <li className="flex items-start">
                                    <BookOpenCheck className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Industry best practices</span>
                                  </li>
                                  <li className="flex items-start">
                                    <BookOpenCheck className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Advanced techniques and methods</span>
                                  </li>
                                </ul>
                              </div>
                              
                              <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Instructor</h3>
                                <div className="flex items-center">
                                  <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden relative mr-4">
                                    <Image 
                                      src="/images/avatar-placeholder.jpg" 
                                      alt={course.instructor}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="text-md font-bold text-gray-900">{course.instructor}</h4>
                                    <p className="text-sm text-gray-600">Expert {course.subject} Instructor</p>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <button className="text-primary text-sm font-medium hover:underline">View Full Profile</button>
                                </div>
                              </div>
                              
                              <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                  <h3 className="text-lg font-bold text-gray-900">Student Reviews</h3>
                                  <div className="flex items-center">
                                    <div className="flex items-center text-yellow-400 mr-1">
                                      <Star className="h-5 w-5 fill-current" />
                                    </div>
                                    <span className="font-medium">{course.rating}</span>
                                    <span className="text-gray-500 ml-1">({course.students} reviews)</span>
                                  </div>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between mb-1">
                                      <h4 className="font-medium">Alex Johnson</h4>
                                      <div className="flex items-center text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                          <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">2 weeks ago</p>
                                    <p className="text-gray-700">This course exceeded my expectations. The instructor explains complex concepts in a way that's easy to understand.</p>
                                  </div>
                                  
                                  <div className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex justify-between mb-1">
                                      <h4 className="font-medium">Maria Garcia</h4>
                                      <div className="flex items-center text-yellow-400">
                                        {[...Array(4)].map((_, i) => (
                                          <Star key={i} className="h-4 w-4 fill-current" />
                                        ))}
                                        {[...Array(1)].map((_, i) => (
                                          <Star key={i} className="h-4 w-4 text-gray-300" />
                                        ))}
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">1 month ago</p>
                                    <p className="text-gray-700">Great content and well-structured. Would have liked more practical examples.</p>
                                  </div>
                                </div>
                                
                                <div className="mt-3 text-center">
                                  <button className="text-primary text-sm font-medium hover:underline">View All Reviews</button>
                                </div>
                              </div>
                              
                              <div className="flex gap-4">
                                <button 
                                  className="btn btn-primary flex-1"
                                  onClick={() => {
                                    // Logic to enroll in the course
                                    alert(`You have successfully enrolled in ${course.title}`);
                                    setPreviewCourse(null);
                                  }}
                                >
                                  Enroll Now
                                </button>
                                <button className="btn btn-outline flex-1">Add to Wishlist</button>
                              </div>
                              <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">You can unenroll within 7 days for a full refund</p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Courses</h2>
                
                <div className="space-y-6">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="flex flex-col md:flex-row gap-6 p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-full md:w-48 h-32 rounded-md bg-gray-200 overflow-hidden relative flex-shrink-0">
                        <Image 
                          src={course.image} 
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor}</p>
                        
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Next: {course.nextLesson}</span>
                          </div>
                          
                          <Link 
                            href={`/courses/${course.id}`}
                            className="text-primary text-sm font-medium hover:underline"
                          >
                            Continue Learning
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <Link 
                    href="/courses"
                    className="btn btn-primary inline-flex items-center"
                  >
                    Browse More Courses
                  </Link>
                </div>
              </div>
            )}
            
            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Assignments & Exams</h2>
                  <div className="flex gap-2">
                    <button className="btn btn-outline btn-sm flex items-center gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                    <button className="btn btn-outline btn-sm flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Sort by Due Date
                    </button>
                  </div>
                </div>
                
                {/* Tabs for Upcoming and Completed */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button 
                    className={`px-4 py-2 font-medium text-sm ${!showFeedback ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
                    onClick={() => setShowFeedback(null)}
                  >
                    Upcoming
                  </button>
                  <button 
                    className={`px-4 py-2 font-medium text-sm ${showFeedback ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
                    onClick={() => setShowFeedback(101)} // Just to toggle the view
                  >
                    Completed & Feedback
                  </button>
                </div>
                
                {/* Upcoming Assignments */}
                {!showFeedback && (
                  <div className="space-y-6">
                    {upcomingDeadlines.map(deadline => {
                      const daysRemaining = getDaysRemaining(deadline.dueDate);
                      return (
                        <div key={deadline.id} className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg font-bold text-gray-900">{deadline.title}</h3>
                                {deadline.status === 'in_progress' && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{deadline.course}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${deadline.type === 'Exam' ? 'bg-purple-100 text-purple-600' : daysRemaining <= 2 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                              {deadline.type}
                            </div>
                          </div>
                          
                          <div className="mt-3 text-sm text-gray-700">
                            <p>{deadline.description}</p>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between mt-4">
                            <div className="flex items-center text-sm text-gray-600 mr-4">
                              <Calendar className="h-4 w-4 mr-2" />
                              <span>Due {formatDate(deadline.dueDate)}</span>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              {deadline.type === 'Quiz' || deadline.type === 'Exam' ? (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{deadline.timeLimit} minutes</span>
                                </div>
                              ) : null}
                              
                              <div className={`text-sm font-medium ${daysRemaining <= 2 ? 'text-red-600' : 'text-blue-600'}`}>
                                {daysRemaining} days remaining
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-wrap gap-3">
                            {deadline.type === 'Quiz' || deadline.type === 'Exam' ? (
                              <button 
                                className="btn btn-primary flex items-center gap-1"
                                onClick={() => setShowQuizDetails(deadline.id)}
                              >
                                <FileQuestion className="h-4 w-4" />
                                Start {deadline.type}
                              </button>
                            ) : (
                              <button 
                                className="btn btn-primary flex items-center gap-1"
                                onClick={() => setShowSubmissionForm(deadline.id)}
                              >
                                <FilePlus className="h-4 w-4" />
                                {deadline.status === 'in_progress' ? 'Continue Working' : 'Start Assignment'}
                              </button>
                            )}
                            
                            <button 
                              className="btn btn-outline flex items-center gap-1"
                              onClick={() => setShowAssignmentDetails(deadline.id)}
                            >
                              <Info className="h-4 w-4" />
                              View Details
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Completed Assignments with Feedback */}
                {showFeedback && (
                  <div className="space-y-6">
                    {completedAssignments.map(assignment => (
                      <div key={assignment.id} className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
                            </div>
                            <p className="text-sm text-gray-600">{assignment.course}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${assignment.type === 'Quiz' || assignment.type === 'Exam' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                            {assignment.type}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 rounded-lg mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">Feedback</h4>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-2">Score: </span>
                              <span className="text-sm font-bold">{assignment.score}/{assignment.maxScore}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{assignment.feedback}</p>
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-between">
                          <div className="flex items-center text-sm text-gray-600 mr-4">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                            <span>Submitted {formatDate(assignment.submittedDate)}</span>
                          </div>
                          
                          {assignment.type === 'Quiz' && (
                            <div className="text-sm text-gray-600">
                              {assignment.correctAnswers}/{assignment.totalQuestions} correct answers
                            </div>
                          )}
                        </div>
                        
                        {assignment.submissionFiles && assignment.submissionFiles.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Your Submission</h4>
                            <div className="flex flex-wrap gap-2">
                              {assignment.submissionFiles.map((file, index) => (
                                <div key={index} className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-sm">
                                  <Paperclip className="h-4 w-4 mr-2 text-gray-500" />
                                  <span>{file}</span>
                                  <button className="ml-2 text-gray-500 hover:text-gray-700">
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Assignment Details Modal */}
            {showAssignmentDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.course}
                        </p>
                      </div>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowAssignmentDetails(null)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-md font-bold text-gray-900 mb-2">Description</h3>
                        <p className="text-sm text-gray-700">
                          {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.description}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-bold text-gray-900 mb-2">Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Due Date</p>
                            <p className="font-medium">{formatDate(upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.dueDate || '')}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Type</p>
                            <p className="font-medium">{upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.type}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Max Score</p>
                            <p className="font-medium">{upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.maxScore} points</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Status</p>
                            <p className="font-medium capitalize">
                              {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.status.replace('_', ' ')}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.type === 'Assignment' && (
                        <div>
                          <h3 className="text-md font-bold text-gray-900 mb-2">Submission Type</h3>
                          <p className="text-sm text-gray-700 capitalize">
                            {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.submissionType.replace('_', ' ')}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex gap-4 pt-4">
                        {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.type === 'Quiz' || 
                         upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.type === 'Exam' ? (
                          <button 
                            className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                            onClick={() => {
                              setShowQuizDetails(showAssignmentDetails);
                              setShowAssignmentDetails(null);
                            }}
                          >
                            <FileQuestion className="h-4 w-4" />
                            Start {upcomingDeadlines.find(d => d.id === showAssignmentDetails)?.type}
                          </button>
                        ) : (
                          <button 
                            className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                            onClick={() => {
                              setShowSubmissionForm(showAssignmentDetails);
                              setShowAssignmentDetails(null);
                            }}
                          >
                            <FilePlus className="h-4 w-4" />
                            Submit Assignment
                          </button>
                        )}
                        <button 
                          className="btn btn-outline flex-1"
                          onClick={() => setShowAssignmentDetails(null)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quiz/Exam Start Modal */}
            {showQuizDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          {upcomingDeadlines.find(d => d.id === showQuizDetails)?.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {upcomingDeadlines.find(d => d.id === showQuizDetails)?.course}
                        </p>
                      </div>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowQuizDetails(null)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h3 className="text-md font-bold text-yellow-800 mb-2 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2" />
                          Important Information
                        </h3>
                        <ul className="text-sm text-yellow-800 space-y-2">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>This {upcomingDeadlines.find(d => d.id === showQuizDetails)?.type.toLowerCase()} has a time limit of {upcomingDeadlines.find(d => d.id === showQuizDetails)?.timeLimit} minutes.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>It contains {upcomingDeadlines.find(d => d.id === showQuizDetails)?.questionCount} questions.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Once started, you must complete it in one session.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>Ensure you have a stable internet connection before starting.</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                          <FileQuestion className="h-4 w-4" />
                          Begin {upcomingDeadlines.find(d => d.id === showQuizDetails)?.type}
                        </button>
                        <button 
                          className="btn btn-outline flex-1"
                          onClick={() => setShowQuizDetails(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Assignment Submission Modal */}
            {showSubmissionForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          Submit: {upcomingDeadlines.find(d => d.id === showSubmissionForm)?.title}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {upcomingDeadlines.find(d => d.id === showSubmissionForm)?.course}
                        </p>
                      </div>
                      <button 
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setShowSubmissionForm(null)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-md font-bold text-gray-900 mb-2">Assignment Details</h3>
                        <p className="text-sm text-gray-700 mb-2">
                          {upcomingDeadlines.find(d => d.id === showSubmissionForm)?.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Due {formatDate(upcomingDeadlines.find(d => d.id === showSubmissionForm)?.dueDate || '')}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-bold text-gray-900 mb-3">Your Submission</h3>
                        
                        {upcomingDeadlines.find(d => d.id === showSubmissionForm)?.submissionType === 'file_upload' && (
                          <div className="mb-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                              <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                              <button className="btn btn-outline btn-sm">Browse Files</button>
                            </div>
                            
                            {fileUploads.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {fileUploads.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                      <Paperclip className="h-4 w-4 mr-2 text-gray-500" />
                                      <span className="text-sm">{file}</span>
                                    </div>
                                    <button 
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => setFileUploads(fileUploads.filter((_, i) => i !== index))}
                                    >
                                      <Trash className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {upcomingDeadlines.find(d => d.id === showSubmissionForm)?.submissionType === 'text_entry' && (
                          <div className="mb-4">
                            <textarea
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary min-h-[200px]"
                              placeholder="Enter your submission text here..."
                              value={textSubmission}
                              onChange={(e) => setTextSubmission(e.target.value)}
                            ></textarea>
                          </div>
                        )}
                        
                        {upcomingDeadlines.find(d => d.id === showSubmissionForm)?.submissionType === 'url' && (
                          <div className="mb-4">
                            <input
                              type="url"
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                              placeholder="Enter submission URL here..."
                              value={submissionUrl}
                              onChange={(e) => setSubmissionUrl(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-4 pt-4">
                        <button className="btn btn-primary flex-1 flex items-center justify-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          Submit Assignment
                        </button>
                        <button className="btn btn-outline flex-1 flex items-center justify-center gap-2">
                          <Loader className="h-4 w-4" />
                          Save as Draft
                        </button>
                        <button 
                          className="btn btn-outline flex-1"
                          onClick={() => setShowSubmissionForm(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Achievements</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {achievements.map(achievement => (
                    <div key={achievement.id} className="p-6 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                      <div className="w-16 h-16 mx-auto mb-4">
                        <Image 
                          src={achievement.icon} 
                          alt={achievement.title}
                          width={64}
                          height={64}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      <p className="text-xs text-gray-500">Earned on {formatDate(achievement.date)}</p>
                    </div>
                  ))}
                  
                  {/* Locked Achievement */}
                  <div className="p-6 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors opacity-60">
                    <div className="w-16 h-16 mx-auto mb-4 grayscale">
                      <Image 
                        src="/images/achievement-4.svg" 
                        alt="Locked Achievement"
                        width={64}
                        height={64}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Course Completer</h3>
                    <p className="text-sm text-gray-600 mb-3">Complete your first course</p>
                    <p className="text-xs text-gray-500">Locked</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">My Profile</h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 overflow-hidden relative mb-4">
                        <Image 
                          src="/images/avatar-placeholder.jpg" 
                          alt="User profile" 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button className="btn btn-outline mb-6">Change Photo</button>
                      
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <h3 className="font-bold text-gray-900 mb-1">Account Status</h3>
                        <p className="text-sm text-gray-600 mb-2">Student</p>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <form>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                          <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                            defaultValue="John"
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                          <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                            defaultValue="Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                            defaultValue="john.doe@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                            defaultValue="(123) 456-7890"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea 
                          id="bio" 
                          name="bio" 
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                          defaultValue="I'm a student passionate about learning new skills and expanding my knowledge in various fields."
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            
            {/* Live Classes & Events Tab */}
             {activeTab === 'live-classes' && (
               <div className="space-y-6">
                 {/* Calendar View */}
                 <div className="bg-white rounded-xl shadow-sm p-6">
                   <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Classes & Events</h2>
                   
                   {/* Calendar Navigation */}
                   <div className="flex justify-between items-center mb-6">
                     <button className="text-gray-600 hover:text-gray-900">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                     </button>
                     <h3 className="text-lg font-medium">November 2023</h3>
                     <button className="text-gray-600 hover:text-gray-900">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                         <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                       </svg>
                     </button>
                   </div>
                   
                   {/* Calendar Grid */}
                   <div className="grid grid-cols-7 gap-2 mb-4">
                     {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                       <div key={day} className="text-center text-sm font-medium text-gray-600">{day}</div>
                     ))}
                   </div>
                   
                   <div className="grid grid-cols-7 gap-2">
                     {/* First week with empty days */}
                     <div className="h-24 border border-gray-200 rounded-md p-1 opacity-50"></div>
                     <div className="h-24 border border-gray-200 rounded-md p-1 opacity-50"></div>
                     <div className="h-24 border border-gray-200 rounded-md p-1 opacity-50"></div>
                     {Array.from({ length: 30 }).map((_, i) => {
                       const day = i + 1;
                       const date = `2023-11-${day.toString().padStart(2, '0')}`;
                       const hasClass = liveClasses.some(cls => cls.date === date);
                       const hasEvent = specialEvents.some(event => event.date === date);
                       
                       return (
                         <div 
                           key={day} 
                           className={`h-24 border rounded-md p-1 relative ${hasClass || hasEvent ? 'border-primary' : 'border-gray-200'}`}
                         >
                           <div className="text-xs font-medium">{day}</div>
                           {hasClass && (
                             <div className="mt-1 bg-primary text-white text-xs p-1 rounded truncate">
                               {liveClasses.find(cls => cls.date === date)?.title.substring(0, 12)}...
                             </div>
                           )}
                           {hasEvent && (
                             <div className="mt-1 bg-secondary text-white text-xs p-1 rounded truncate">
                               {specialEvents.find(event => event.date === date)?.title.substring(0, 12)}...
                             </div>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 </div>
                 
                 {/* Live Classes */}
                 <div className="bg-white rounded-xl shadow-sm p-6">
                   <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Live Classes</h2>
                   
                   <div className="space-y-4">
                     {liveClasses.map(liveClass => {
                       const daysRemaining = getDaysRemaining(liveClass.date);
                       const dateLabel = isToday(liveClass.date) ? 'Today' : 
                                        isTomorrow(liveClass.date) ? 'Tomorrow' : 
                                        `In ${daysRemaining} days`;
                       
                       return (
                         <div key={liveClass.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                             <div>
                               <h3 className="text-lg font-medium text-gray-900">{liveClass.title}</h3>
                               <p className="text-sm text-gray-600 mb-2">Instructor: {liveClass.instructor}</p>
                               <div className="flex items-center text-sm text-gray-600 mb-1">
                                 <Calendar className="h-4 w-4 mr-1" />
                                 <span>{formatDate(liveClass.date)} ({dateLabel})</span>
                               </div>
                               <div className="flex items-center text-sm text-gray-600 mb-1">
                                 <Clock className="h-4 w-4 mr-1" />
                                 <span>{liveClass.startTime} - {liveClass.endTime}</span>
                               </div>
                               <div className="flex items-center text-sm text-gray-600">
                                 <Video className="h-4 w-4 mr-1" />
                                 <span>{liveClass.platform}</span>
                               </div>
                             </div>
                             
                             <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                               {liveClass.isRegistered ? (
                                 <button className="btn btn-primary">
                                   Join Class
                                 </button>
                               ) : (
                                 <button className="btn btn-primary">
                                   Register
                                 </button>
                               )}
                               <button className="btn btn-outline">
                                 View Details
                               </button>
                             </div>
                           </div>
                           
                           {liveClass.materials.length > 0 && (
                             <div className="mt-4 pt-4 border-t border-gray-200">
                               <h4 className="text-sm font-medium text-gray-900 mb-2">Class Materials:</h4>
                               <div className="flex flex-wrap gap-2">
                                 {liveClass.materials.map((material, index) => (
                                   <a 
                                     key={index} 
                                     href="#" 
                                     className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                   >
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                     </svg>
                                     {material}
                                   </a>
                                 ))}
                               </div>
                             </div>
                           )}
                         </div>
                       );
                     })}
                   </div>
                 </div>
                 
                 {/* Special Events */}
                 <div className="bg-white rounded-xl shadow-sm p-6">
                   <h2 className="text-xl font-bold text-gray-900 mb-6">Special Events</h2>
                   
                   <div className="space-y-4">
                     {specialEvents.map(event => {
                       const daysRemaining = getDaysRemaining(event.date);
                       
                       return (
                         <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                             <div>
                               <div className="flex items-start">
                                 <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white mr-3">
                                   <Calendar className="h-4 w-4" />
                                 </span>
                                 <div>
                                   <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                                   <p className="text-sm text-gray-600 mb-2">{event.type}</p>
                                 </div>
                               </div>
                               
                               <div className="ml-11">
                                 <div className="flex items-center text-sm text-gray-600 mb-1">
                                   <Calendar className="h-4 w-4 mr-1" />
                                   <span>{formatDate(event.date)} ({daysRemaining} days away)</span>
                                 </div>
                                 <div className="flex items-center text-sm text-gray-600 mb-3">
                                   <Clock className="h-4 w-4 mr-1" />
                                   <span>{event.startTime} - {event.endTime}</span>
                                 </div>
                                 
                                 <div className="text-sm text-gray-700 mb-2">
                                   <p>{event.description}</p>
                                 </div>
                                 
                                 {event.speakers.length > 0 && (
                                   <div className="mb-2">
                                     <span className="text-sm font-medium text-gray-900">Speakers: </span>
                                     <span className="text-sm text-gray-700">{event.speakers.join(', ')}</span>
                                   </div>
                                 )}
                               </div>
                             </div>
                             
                             <div className="mt-4 md:mt-0">
                               {event.isRegistered ? (
                                 <div className="flex flex-col items-center space-y-2">
                                   <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                     <CheckCircle className="h-3 w-3 mr-1" />
                                     Registered
                                   </span>
                                   <button className="btn btn-primary">
                                     View Details
                                   </button>
                                 </div>
                               ) : (
                                 <button 
                                   className="btn btn-primary"
                                   onClick={() => setShowEventDetails(event.id)}
                                 >
                                   Register Now
                                 </button>
                               )}
                             </div>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
                 
                 {/* Office Hours */}
                 <div className="bg-white rounded-xl shadow-sm p-6">
                   <h2 className="text-xl font-bold text-gray-900 mb-6">Instructor Office Hours</h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {officeHours.map(office => (
                       <div key={office.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                         <div className="flex items-start">
                           <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                             <User className="h-6 w-6 text-gray-600" />
                           </div>
                           <div>
                             <h3 className="text-md font-medium text-gray-900">{office.instructor}</h3>
                             <p className="text-sm text-gray-600 mb-2">{office.course}</p>
                             
                             <div className="flex items-center text-sm text-gray-600 mb-1">
                               <Calendar className="h-4 w-4 mr-1" />
                               <span>Every {office.day}</span>
                             </div>
                             <div className="flex items-center text-sm text-gray-600 mb-3">
                               <Clock className="h-4 w-4 mr-1" />
                               <span>{office.startTime} - {office.endTime}</span>
                             </div>
                             
                             <div className="flex items-center text-sm text-gray-600 mb-3">
                               <Video className="h-4 w-4 mr-1" />
                               <span>{office.platform}</span>
                             </div>
                             
                             <Link href={office.bookingLink} className="btn btn-sm btn-primary">
                               Book a Slot
                             </Link>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
                 
                 {/* Event Registration Modal */}
                 {showEventDetails !== null && (
                   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                     <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                       <div className="p-6">
                         <div className="flex justify-between items-start mb-4">
                           <h2 className="text-xl font-bold text-gray-900">
                             {specialEvents.find(e => e.id === showEventDetails)?.title}
                           </h2>
                           <button 
                             onClick={() => setShowEventDetails(null)}
                             className="text-gray-500 hover:text-gray-700"
                           >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                             </svg>
                           </button>
                         </div>
                         
                         <div className="space-y-4">
                           <div>
                             <h3 className="text-md font-medium text-gray-900 mb-2">Event Details</h3>
                             <p className="text-sm text-gray-700">
                               {specialEvents.find(e => e.id === showEventDetails)?.description}
                             </p>
                           </div>
                           
                           <div className="grid grid-cols-2 gap-4">
                             <div>
                               <h3 className="text-md font-medium text-gray-900 mb-2">Date & Time</h3>
                               <div className="flex items-center text-sm text-gray-600 mb-1">
                                 <Calendar className="h-4 w-4 mr-1" />
                                 <span>{formatDate(specialEvents.find(e => e.id === showEventDetails)?.date || '')}</span>
                               </div>
                               <div className="flex items-center text-sm text-gray-600">
                                 <Clock className="h-4 w-4 mr-1" />
                                 <span>
                                   {specialEvents.find(e => e.id === showEventDetails)?.startTime} - 
                                   {specialEvents.find(e => e.id === showEventDetails)?.endTime}
                                 </span>
                               </div>
                             </div>
                             
                             <div>
                               <h3 className="text-md font-medium text-gray-900 mb-2">Event Type</h3>
                               <div className="flex items-center text-sm text-gray-600">
                                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                   {specialEvents.find(e => e.id === showEventDetails)?.type}
                                 </span>
                               </div>
                             </div>
                           </div>
                           
                           <div>
                             <h3 className="text-md font-medium text-gray-900 mb-2">Speakers</h3>
                             <ul className="list-disc list-inside text-sm text-gray-700">
                               {specialEvents.find(e => e.id === showEventDetails)?.speakers.map((speaker, index) => (
                                 <li key={index}>{speaker}</li>
                               ))}
                             </ul>
                           </div>
                           
                           <div className="pt-4 border-t border-gray-200">
                             <h3 className="text-md font-medium text-gray-900 mb-2">Registration</h3>
                             <p className="text-sm text-gray-700 mb-4">
                               Register for this event to receive updates and access to materials. You can cancel your registration at any time.
                             </p>
                             
                             <div className="flex justify-end space-x-3">
                               <button 
                                 onClick={() => setShowEventDetails(null)}
                                 className="btn btn-outline"
                               >
                                 Cancel
                               </button>
                               <button 
                                 className="btn btn-primary"
                                 onClick={() => {
                                   // In a real app, this would register the user
                                   alert('You have been registered for this event!');
                                   setShowEventDetails(null);
                                 }}
                               >
                                 Register Now
                               </button>
                             </div>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 )}
               </div>
             )}
             
             {/* Learning Progress Tab */}
             {activeTab === 'progress' && (
              <div className="space-y-6">
                {/* Learning Analytics */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Analytics</h2>
                  
                  {/* Learning Stats Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{learningAnalytics.streak}</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{learningAnalytics.totalHoursLearned}</div>
                      <div className="text-sm text-gray-600">Hours Learned</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{learningAnalytics.certificatesEarned}</div>
                      <div className="text-sm text-gray-600">Certificates</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">{learningAnalytics.coursesCompleted}</div>
                      <div className="text-sm text-gray-600">Courses Completed</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Weekly Study Hours */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Study Hours</h3>
                      <div className="h-64 flex items-end justify-between space-x-2">
                        {learningAnalytics.weeklyStudyHours.map((day) => (
                          <div key={day.day} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-primary rounded-t-md" 
                              style={{ height: `${(day.hours / 3) * 100}%` }}
                            ></div>
                            <div className="text-xs mt-2">{day.day}</div>
                            <div className="text-xs font-medium">{day.hours}h</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Total this week: {learningAnalytics.weeklyStudyHours.reduce((acc, day) => acc + day.hours, 0)} hours</p>
                      </div>
                    </div>
                    
                    {/* Monthly Progress */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Progress</h3>
                      <div className="h-64 flex items-end justify-between space-x-2">
                        {learningAnalytics.monthlyProgress.map((month) => (
                          <div key={month.month} className="flex flex-col items-center flex-1">
                            <div 
                              className="w-full bg-secondary rounded-t-md" 
                              style={{ height: `${month.progress}%` }}
                            ></div>
                            <div className="text-xs mt-2">{month.month}</div>
                            <div className="text-xs font-medium">{month.progress}%</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Current progress: {learningAnalytics.monthlyProgress[2].progress}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Strengths */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Your Strengths</h3>
                      <div className="space-y-2">
                        {learningAnalytics.strengths.map((strength, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="text-gray-700">{strength}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Areas to Improve */}
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Areas to Improve</h3>
                      <div className="space-y-2">
                        {learningAnalytics.areasToImprove.map((area, index) => (
                          <div key={index} className="flex items-center">
                            <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                            <span className="text-gray-700">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Learning Goals */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Learning Goals</h2>
                    <button 
                      onClick={() => setShowGoalForm(!showGoalForm)}
                      className="btn btn-primary btn-sm"
                    >
                      {showGoalForm ? 'Cancel' : 'Add New Goal'}
                    </button>
                  </div>
                  
                  {/* New Goal Form */}
                  {showGoalForm && (
                    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Goal</h3>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="goalTitle" className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                          <input 
                            type="text" 
                            id="goalTitle" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                            placeholder="e.g., Complete JavaScript Course"
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="goalType" className="block text-sm font-medium text-gray-700 mb-1">Goal Type</label>
                            <select 
                              id="goalType" 
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                              value={newGoal.type}
                              onChange={(e) => setNewGoal({...newGoal, type: e.target.value})}
                            >
                              <option value="course_completion">Course Completion</option>
                              <option value="study_hours">Study Hours</option>
                              <option value="projects">Projects</option>
                              <option value="assignments">Assignments</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="goalTarget" className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
                            <input 
                              type="number" 
                              id="goalTarget" 
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                              placeholder="e.g., 10 hours"
                              value={newGoal.target}
                              onChange={(e) => setNewGoal({...newGoal, target: Number(e.target.value)})}
                            />
                          </div>
                          <div>
                            <label htmlFor="goalDeadline" className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                            <input 
                              type="date" 
                              id="goalDeadline" 
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                              value={newGoal.deadline}
                              onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              // In a real app, this would save to a database
                              alert('Goal created successfully!');
                              setShowGoalForm(false);
                              setNewGoal({
                                title: '',
                                target: 0,
                                deadline: '',
                                type: 'course_completion',
                              });
                            }}
                          >
                            Create Goal
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Goals List */}
                  <div className="space-y-4">
                    {learningGoals.map(goal => {
                      const progress = (goal.current / goal.target) * 100;
                      const daysRemaining = getDaysRemaining(goal.deadline);
                      
                      return (
                        <div key={goal.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{goal.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${daysRemaining <= 7 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                              {daysRemaining} days left
                            </span>
                          </div>
                          
                          <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">
                                {goal.type === 'course_completion' && 'Course Progress'}
                                {goal.type === 'study_hours' && 'Study Hours'}
                                {goal.type === 'projects' && 'Projects Completed'}
                              </span>
                              <span className="font-medium">{goal.current} / {goal.target} {goal.type === 'study_hours' && 'hours'}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-primary'}`} 
                                style={{ width: `${Math.min(progress, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                              {goal.recurrence && `Recurs ${goal.recurrence}`}
                            </span>
                            <span className="text-gray-600">Due {formatDate(goal.deadline)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Certificates and Badges */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Certificates & Badges</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Certificates */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Your Certificates</h3>
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-md font-bold text-gray-900">HTML & CSS Fundamentals</h4>
                              <p className="text-sm text-gray-600 mb-2">Issued on Oct 10, 2023</p>
                              <button className="text-primary text-sm font-medium hover:underline">View Certificate</button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-md font-bold text-gray-900">JavaScript Basics</h4>
                              <p className="text-sm text-gray-600 mb-2">Issued on Sep 15, 2023</p>
                              <button className="text-primary text-sm font-medium hover:underline">View Certificate</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Your Badges</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {achievements.map(achievement => (
                          <div key={achievement.id} className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors">
                            <div className="w-12 h-12 mx-auto mb-2">
                              <Image 
                                src={achievement.icon} 
                                alt={achievement.title}
                                width={48}
                                height={48}
                              />
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1">{achievement.title}</h4>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                          </div>
                        ))}
                        
                        {/* Locked Badge */}
                        <div className="p-4 border border-gray-200 rounded-lg text-center hover:bg-gray-50 transition-colors opacity-60">
                          <div className="w-12 h-12 mx-auto mb-2 grayscale">
                            <Image 
                              src="/images/achievement-4.svg" 
                              alt="Locked Badge"
                              width={48}
                              height={48}
                            />
                          </div>
                          <h4 className="text-sm font-bold text-gray-900 mb-1">Course Completer</h4>
                          <p className="text-xs text-gray-600">Complete your first course</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  {/* Password Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input 
                          type="password" 
                          id="currentPassword" 
                          name="currentPassword" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input 
                          type="password" 
                          id="newPassword" 
                          name="newPassword" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          id="confirmPassword" 
                          name="confirmPassword" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <button type="submit" className="btn btn-primary">Update Password</button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Notification Settings */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive emails about course updates and announcements</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="emailNotifications" defaultChecked className="sr-only" />
                          <label htmlFor="emailNotifications" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                            <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out translate-x-4"></span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Assignment Reminders</h4>
                          <p className="text-sm text-gray-600">Receive reminders about upcoming assignment deadlines</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="assignmentReminders" defaultChecked className="sr-only" />
                          <label htmlFor="assignmentReminders" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                            <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out translate-x-4"></span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Course Recommendations</h4>
                          <p className="text-sm text-gray-600">Receive personalized course recommendations</p>
                        </div>
                        <div className="relative inline-block w-10 mr-2 align-middle select-none">
                          <input type="checkbox" id="courseRecommendations" defaultChecked className="sr-only" />
                          <label htmlFor="courseRecommendations" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
                            <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out translate-x-4"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Account Management */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Management</h3>
                    <div className="space-y-4">
                      <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}