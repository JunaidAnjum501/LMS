'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Users, BarChart3, Award, Calendar, FileText, Settings, User, LogOut, Search, Filter, Star, TrendingUp, MessageSquare, Video, Bell, Edit, Trash, Plus, Eye, Download, Upload, CheckCircle, AlertCircle, Clock, DollarSign, Target, UserCheck, BookMarked, Activity, ChevronDown, ChevronUp, Menu, X, Mail, MessageCircle, Send, File, Book, CreditCard, PieChart, BarChart2, HelpCircle } from 'lucide-react';

// Mock data for instructor courses
const instructorCourses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    enrolledStudents: 1245,
    totalRevenue: 62250,
    completionRate: 78,
    averageRating: 4.8,
    status: 'active',
    lastUpdated: '2023-11-10',
    upcomingLessons: 3,
    pendingAssignments: 45,
    image: '/images/course-1.jpg',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
    category: 'Web Development',
    level: 'Beginner',
    price: 49.99,
    duration: '8 weeks',
    lessons: 24,
    createdAt: '2023-01-15',
  },
  {
    id: 2,
    title: 'Advanced JavaScript Frameworks',
    enrolledStudents: 890,
    totalRevenue: 71100,
    completionRate: 65,
    averageRating: 4.7,
    status: 'active',
    lastUpdated: '2023-11-08',
    upcomingLessons: 5,
    pendingAssignments: 32,
    image: '/images/course-2.jpg',
    description: 'Master advanced JavaScript frameworks like React, Angular, and Vue.',
    category: 'Web Development',
    level: 'Advanced',
    price: 79.99,
    duration: '10 weeks',
    lessons: 32,
    createdAt: '2023-03-20',
  },
  {
    id: 3,
    title: 'React Native Mobile Development',
    enrolledStudents: 567,
    totalRevenue: 45360,
    completionRate: 82,
    averageRating: 4.9,
    status: 'draft',
    lastUpdated: '2023-11-05',
    upcomingLessons: 0,
    pendingAssignments: 0,
    image: '/images/course-3.jpg',
    description: 'Build cross-platform mobile apps with React Native.',
    category: 'Mobile Development',
    level: 'Intermediate',
    price: 69.99,
    duration: '6 weeks',
    lessons: 18,
    createdAt: '2023-05-10',
  },
];

// Mock data for student submissions
const studentSubmissions = [
  {
    id: 1,
    studentName: 'Alice Johnson',
    course: 'Introduction to Web Development',
    assignment: 'CSS Layout Challenge',
    submittedDate: '2023-11-12',
    dueDate: '2023-11-15',
    status: 'submitted',
    score: null,
    maxScore: 100,
    submissionFiles: ['assignment1.html', 'styles.css'],
    submissionText: 'I have completed the responsive layout challenge using CSS Grid and Flexbox.',
  },
  {
    id: 2,
    studentName: 'Bob Smith',
    course: 'Advanced JavaScript Frameworks',
    assignment: 'React Component Architecture',
    submittedDate: '2023-11-10',
    dueDate: '2023-11-10',
    status: 'graded',
    score: 85,
    maxScore: 100,
    submissionFiles: ['App.js', 'components.zip'],
    feedback: 'Great work on component structure. Consider adding more prop validation.',
  },
  {
    id: 3,
    studentName: 'Carol Davis',
    course: 'Introduction to Web Development',
    assignment: 'JavaScript Fundamentals Quiz',
    submittedDate: '2023-11-11',
    dueDate: '2023-11-12',
    status: 'late',
    score: 92,
    maxScore: 100,
    submissionFiles: [],
    feedback: 'Excellent understanding of JavaScript concepts.',
  },
  {
    id: 4,
    studentName: 'David Wilson',
    course: 'React Native Mobile Development',
    assignment: 'Mobile UI Design',
    submittedDate: '2023-11-13',
    dueDate: '2023-11-14',
    status: 'submitted',
    score: null,
    maxScore: 100,
    submissionFiles: ['ui-design.fig'],
    submissionText: 'Designed the mobile UI following the provided guidelines.',
  },
];

// Mock data for instructor analytics
const instructorAnalytics = {
  totalStudents: 2702,
  totalRevenue: 178710,
  averageRating: 4.8,
  coursesPublished: 3,
  activeCourses: 2,
  monthlyRevenue: [
    { month: 'Aug', revenue: 45000 },
    { month: 'Sep', revenue: 52000 },
    { month: 'Oct', revenue: 61000 },
    { month: 'Nov', revenue: 20710 },
  ],
  studentEngagement: [
    { week: 'Week 1', active: 85, completed: 65 },
    { week: 'Week 2', active: 78, completed: 72 },
    { week: 'Week 3', active: 92, completed: 88 },
    { week: 'Week 4', active: 88, completed: 85 },
  ],
  coursePerformance: [
    { course: 'Intro Web Dev', completion: 78, satisfaction: 96 },
    { course: 'Advanced JS', completion: 65, satisfaction: 94 },
    { course: 'React Native', completion: 82, satisfaction: 98 },
  ],
  topCourses: [
    { name: 'Intro to Web Dev', revenue: 62250, students: 1245 },
    { name: 'Advanced JS', revenue: 71100, students: 890 },
    { name: 'React Native', revenue: 45360, students: 567 },
  ],
};

// Mock data for upcoming live sessions
const upcomingLiveSessions = [
  {
    id: 1,
    title: 'Advanced CSS Techniques',
    course: 'Introduction to Web Development',
    date: '2023-11-15',
    startTime: '10:00 AM',
    duration: '90 minutes',
    enrolled: 45,
    maxCapacity: 100,
    platform: 'Zoom',
    meetingId: 'inst-123-456',
    joinLink: 'https://zoom.us/j/123456',
  },
  {
    id: 2,
    title: 'React Hooks Deep Dive',
    course: 'Advanced JavaScript Frameworks',
    date: '2023-11-17',
    startTime: '2:00 PM',
    duration: '120 minutes',
    enrolled: 32,
    maxCapacity: 75,
    platform: 'Google Meet',
    meetingId: 'inst-789-012',
    joinLink: 'https://meet.google.com/abc-def-ghi',
  },
  {
    id: 3,
    title: 'Mobile App Deployment',
    course: 'React Native Mobile Development',
    date: '2023-11-20',
    startTime: '11:00 AM',
    duration: '60 minutes',
    enrolled: 28,
    maxCapacity: 50,
    platform: 'Zoom',
    meetingId: 'inst-345-678',
    joinLink: 'https://zoom.us/j/345678',
  },
];

// Mock data for Q&A forum
const forumQuestions = [
  {
    id: 1,
    studentName: 'David Lee',
    course: 'Introduction to Web Development',
    question: 'How do I center a div both horizontally and vertically?',
    askedDate: '2023-11-12',
    replies: 3,
    status: 'unanswered',
    priority: 'high',
    tags: ['css', 'layout'],
  },
  {
    id: 2,
    studentName: 'Emma Wilson',
    course: 'Advanced JavaScript Frameworks',
    question: 'What\'s the difference between useEffect and useLayoutEffect?',
    askedDate: '2023-11-11',
    replies: 5,
    status: 'answered',
    priority: 'medium',
    tags: ['react', 'hooks'],
  },
  {
    id: 3,
    studentName: 'Michael Brown',
    course: 'React Native Mobile Development',
    question: 'How to handle navigation in React Native apps?',
    askedDate: '2023-11-13',
    replies: 2,
    status: 'unanswered',
    priority: 'high',
    tags: ['react-native', 'navigation'],
  },
];

// Mock data for student progress tracking
const studentProgressData = [
  {
    studentId: 1,
    studentName: 'Alice Johnson',
    email: 'alice@example.com',
    joinDate: '2023-09-10',
    lastActive: '2023-11-12',
    courses: [
      {
        courseId: 1,
        courseName: 'Introduction to Web Development',
        progress: 85,
        lastActive: '2023-11-12',
        assignmentsCompleted: 8,
        totalAssignments: 10,
        averageScore: 92,
        certificates: ['HTML Basics', 'CSS Fundamentals'],
      },
    ],
  },
  {
    studentId: 2,
    studentName: 'Bob Smith',
    email: 'bob@example.com',
    joinDate: '2023-08-15',
    lastActive: '2023-11-10',
    courses: [
      {
        courseId: 1,
        courseName: 'Introduction to Web Development',
        progress: 65,
        lastActive: '2023-11-10',
        assignmentsCompleted: 6,
        totalAssignments: 10,
        averageScore: 78,
        certificates: ['HTML Basics'],
      },
      {
        courseId: 2,
        courseName: 'Advanced JavaScript Frameworks',
        progress: 45,
        lastActive: '2023-11-11',
        assignmentsCompleted: 4,
        totalAssignments: 12,
        averageScore: 85,
        certificates: [],
      },
    ],
  },
  {
    studentId: 3,
    studentName: 'Carol Davis',
    email: 'carol@example.com',
    joinDate: '2023-10-05',
    lastActive: '2023-11-13',
    courses: [
      {
        courseId: 3,
        courseName: 'React Native Mobile Development',
        progress: 72,
        lastActive: '2023-11-13',
        assignmentsCompleted: 7,
        totalAssignments: 10,
        averageScore: 88,
        certificates: ['React Native Basics'],
      },
    ],
  },
];

// Mock data for earnings
const earningsData = {
  totalEarnings: 178710,
  currentBalance: 12500,
  pendingPayout: 3500,
  payoutHistory: [
    { date: '2023-10-31', amount: 8200, status: 'completed' },
    { date: '2023-09-30', amount: 10500, status: 'completed' },
    { date: '2023-08-31', amount: 9200, status: 'completed' },
  ],
  monthlyEarnings: [
    { month: 'August', earnings: 9200 },
    { month: 'September', earnings: 10500 },
    { month: 'October', earnings: 8200 },
    { month: 'November', earnings: 3500 },
  ],
};

// Mock data for messages
const messagesData = [
  {
    id: 1,
    studentName: 'Alice Johnson',
    course: 'Introduction to Web Development',
    message: 'I need help with the CSS Grid assignment.',
    date: '2023-11-12',
    unread: true,
  },
  {
    id: 2,
    studentName: 'Bob Smith',
    course: 'Advanced JavaScript Frameworks',
    message: 'Thank you for the feedback on my project!',
    date: '2023-11-11',
    unread: false,
  },
  {
    id: 3,
    studentName: 'Carol Davis',
    course: 'React Native Mobile Development',
    message: 'When will the next live session be scheduled?',
    date: '2023-11-10',
    unread: true,
  },
];

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState<number | null>(null);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState<number | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submissionFilter, setSubmissionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sessionForm, setSessionForm] = useState({
    title: '',
    course: '',
    date: '',
    startTime: '',
    duration: '',
    platform: 'Zoom',
    maxCapacity: '',
  });
  const [messageText, setMessageText] = useState('');
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    level: 'beginner',
    duration: '',
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleCreateCourse = () => {
    // In a real app, this would send data to an API
    console.log('Creating course:', courseForm);
    setShowCreateCourse(false);
    setCourseForm({
      title: '',
      description: '',
      category: '',
      price: '',
      level: 'beginner',
      duration: '',
    });
    // Show success message
    alert('Course created successfully!');
  };

  const handleGradeSubmission = () => {
    if (!showGradeModal) return;
    
    // In a real app, this would update the submission in the database
    const submission = studentSubmissions.find(s => s.id === showGradeModal);
    if (submission) {
      console.log('Grading submission:', {
        submissionId: showGradeModal,
        score: grade,
        feedback: feedback
      });
      
      // Show success message
      alert(`Submission graded successfully with score: ${grade}/100`);
    }
    
    setShowGradeModal(null);
    setGrade('');
    setFeedback('');
  };

  const handleScheduleSession = () => {
    // In a real app, this would send data to an API
    console.log('Scheduling session:', sessionForm);
    setShowSessionModal(false);
    setSessionForm({
      title: '',
      course: '',
      date: '',
      startTime: '',
      duration: '',
      platform: 'Zoom',
      maxCapacity: '',
    });
    // Show success message
    alert('Live session scheduled successfully!');
  };

  const handleSendMessage = () => {
    if (!showMessageModal) return;
    
    // In a real app, this would send the message
    console.log('Sending message:', {
      studentId: showMessageModal,
      message: messageText
    });
    
    setShowMessageModal(null);
    setMessageText('');
    // Show success message
    alert('Message sent successfully!');
  };

  const filteredSubmissions = studentSubmissions.filter(submission => {
    if (submissionFilter === 'all') return true;
    return submission.status === submissionFilter;
  });

  const filteredCourses = instructorCourses.filter(course => {
    return course.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
              <p className="mb-4">You have {studentSubmissions.filter(s => s.status === 'submitted').length} new submissions to grade and {messagesData.filter(m => m.unread).length} unread messages.</p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveTab('submissions')}
                  className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Grade Submissions
                </button>
                <button 
                  onClick={() => setActiveTab('messages')}
                  className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  View Messages
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  View Analytics
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Total Students', value: instructorAnalytics.totalStudents, icon: Users, color: 'text-blue-600', change: '+12%' },
                { label: 'Total Revenue', value: formatCurrency(instructorAnalytics.totalRevenue), icon: DollarSign, color: 'text-green-600', change: '+8%' },
                { label: 'Average Rating', value: `${instructorAnalytics.averageRating}/5.0`, icon: Star, color: 'text-yellow-600', change: '+0.2' },
                { label: 'Active Courses', value: instructorAnalytics.activeCourses, icon: BookOpen, color: 'text-purple-600', change: '+1' },
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg bg-gray-100 ${metric.color}`}>
                        <metric.icon className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-green-600">{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Submissions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Submissions</h3>
                  <button 
                    onClick={() => setActiveTab('submissions')}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {studentSubmissions.slice(0, 3).map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{submission.assignment}</h4>
                        <p className="text-sm text-gray-600">{submission.studentName} • {submission.course}</p>
                        <p className="text-xs text-gray-500">Submitted {formatDate(submission.submittedDate)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {submission.status === 'submitted' && (
                          <button
                            onClick={() => setShowGradeModal(submission.id)}
                            className="bg-primary text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            Grade
                          </button>
                        )}
                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Live Sessions */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Live Sessions</h3>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setActiveTab('live-sessions')}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      View All
                    </button>
                    <button 
                      onClick={() => setShowSessionModal(true)}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      + New
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {upcomingLiveSessions.slice(0, 2).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-600">{session.course}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(session.date)} at {session.startTime}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          session.enrolled / session.maxCapacity > 0.8 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {session.enrolled}/{session.maxCapacity}
                        </span>
                        <button className="bg-primary text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                          Start
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Questions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Questions</h3>
                <button 
                  onClick={() => setActiveTab('forum')}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {forumQuestions.slice(0, 2).map((question) => (
                  <div key={question.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{question.question}</h4>
                      <p className="text-sm text-gray-600">{question.studentName} • {question.course}</p>
                      <div className="flex items-center mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                          question.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {question.status === 'answered' ? 'Answered' : 'Unanswered'}
                        </span>
                        <span className="text-xs text-gray-500">{question.replies} replies</span>
                      </div>
                    </div>
                    <button className="ml-4 text-primary hover:text-primary/90 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <div className="flex space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowCreateCourse(true)}
                  className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Course
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Students</p>
                        <p className="font-bold">{course.enrolledStudents}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="font-bold">{formatCurrency(course.totalRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completion</p>
                        <p className="font-bold">{course.completionRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-bold">{course.averageRating}/5.0</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                        Edit Course
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedCourse(course.id);
                          setActiveTab('analytics');
                        }}
                        className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        View Analytics
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'students':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Student Progress</h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentProgressData.map((student) => (
                      student.courses.map((course, index) => (
                        <tr key={`${student.studentId}-${course.courseId}`} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-sm font-medium text-gray-600">
                                  {student.studentName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{course.courseName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 mr-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-600">{course.progress}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(course.lastActive)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-primary hover:text-primary/90 mr-3 transition-colors">View</button>
                            <button 
                              onClick={() => setShowMessageModal(student.studentId)}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <Mail className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'submissions':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Student Submissions</h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSubmissionFilter('all')}
                      className={`text-sm font-medium pb-2 px-2 ${submissionFilter === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      All ({studentSubmissions.length})
                    </button>
                    <button 
                      onClick={() => setSubmissionFilter('submitted')}
                      className={`text-sm font-medium pb-2 px-2 ${submissionFilter === 'submitted' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Pending ({studentSubmissions.filter(s => s.status === 'submitted').length})
                    </button>
                    <button 
                      onClick={() => setSubmissionFilter('graded')}
                      className={`text-sm font-medium pb-2 px-2 ${submissionFilter === 'graded' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Graded ({studentSubmissions.filter(s => s.status === 'graded').length})
                    </button>
                    <button 
                      onClick={() => setSubmissionFilter('late')}
                      className={`text-sm font-medium pb-2 px-2 ${submissionFilter === 'late' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Late ({studentSubmissions.filter(s => s.status === 'late').length})
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="relative max-w-xs">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="Search submissions..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSubmissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                          <div className="text-sm text-gray-500">{submission.course}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.assignment}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            submission.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                            submission.status === 'graded' ? 'bg-green-100 text-green-800' :
                            submission.status === 'late' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(submission.dueDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {submission.score !== null ? `${submission.score}/${submission.maxScore}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {submission.status === 'submitted' ? (
                              <button
                                onClick={() => setShowGradeModal(submission.id)}
                                className="text-primary hover:text-primary/90 transition-colors"
                              >
                                Grade
                              </button>
                            ) : (
                              <button className="text-primary hover:text-primary/90 transition-colors">View</button>
                            )}
                            <button className="text-gray-400 hover:text-gray-600 transition-colors">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Total Students', value: instructorAnalytics.totalStudents, icon: Users, color: 'bg-blue-500' },
                { label: 'Total Revenue', value: formatCurrency(instructorAnalytics.totalRevenue), icon: DollarSign, color: 'bg-green-500' },
                { label: 'Avg. Rating', value: `${instructorAnalytics.averageRating}/5.0`, icon: Star, color: 'bg-yellow-500' },
                { label: 'Courses', value: instructorAnalytics.coursesPublished, icon: BookOpen, color: 'bg-purple-500' },
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${metric.color} text-white`}>
                      <metric.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Revenue</h3>
                <div className="space-y-2">
                  {instructorAnalytics.monthlyRevenue.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{item.month}</span>
                      <div className="flex-1 mx-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(item.revenue / 70000) * 100}%` }}></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{formatCurrency(item.revenue)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Course Performance</h3>
                <div className="space-y-4">
                  {instructorAnalytics.coursePerformance.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{item.course}</span>
                        <span className="font-medium">{item.completion}% completion</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${item.completion}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Top Courses</h3>
              <div className="space-y-4">
                {instructorAnalytics.topCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{course.name}</h4>
                      <p className="text-sm text-gray-600">{course.students} students</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(course.revenue)}</p>
                      <p className="text-sm text-green-600">+15% from last month</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'live-sessions':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Live Sessions</h2>
              <button 
                onClick={() => setShowSessionModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingLiveSessions.map((session) => (
                <div key={session.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-600">{session.course}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Upcoming
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><Calendar className="inline h-4 w-4 mr-1" /> {formatDate(session.date)}</p>
                    <p><Clock className="inline h-4 w-4 mr-1" /> {session.startTime} ({session.duration})</p>
                    <p><Users className="inline h-4 w-4 mr-1" /> {session.enrolled}/{session.maxCapacity} enrolled</p>
                    <p><Video className="inline h-4 w-4 mr-1" /> {session.platform}</p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <a 
                      href={session.joinLink} 
                      target="_blank"
                      className="flex-1 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors text-center"
                    >
                      Start Session
                    </a>
                    <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Past Sessions</h3>
              <div className="text-center py-8 text-gray-500">
                <Video className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">No past sessions yet</p>
              </div>
            </div>
          </div>
        );
      
      case 'forum':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Q&A Forum</h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className={`px-3 py-2 rounded-md text-sm font-medium ${submissionFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                    All Questions
                  </button>
                  <button className={`px-3 py-2 rounded-md text-sm font-medium ${submissionFilter === 'unanswered' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
                    Unanswered
                  </button>
                </div>
                <div className="relative max-w-xs">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {forumQuestions.map((question) => (
                  <div key={question.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{question.question}</h3>
                        <p className="text-sm text-gray-600 mt-1">{question.studentName} • {question.course}</p>
                        
                        <div className="flex items-center mt-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                            question.status === 'answered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {question.status === 'answered' ? 'Answered' : 'Unanswered'}
                          </span>
                          <span className="text-xs text-gray-500">{question.replies} replies • {formatDate(question.askedDate)}</span>
                        </div>
                        
                        <div className="flex flex-wrap mt-2">
                          {question.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2 mb-2">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="ml-4 text-primary hover:text-primary/90 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {question.status === 'answered' && (
                      <div className="mt-4 p-4 bg-green-50 rounded-lg">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                              <User className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-900">Instructor Response</p>
                            <p className="mt-1 text-sm text-green-700">Great question! The main difference between useEffect and useLayoutEffect is the timing of when they run. useEffect runs after the browser has painted, while useLayoutEffect runs before.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'earnings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Earnings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsData.totalEarnings)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 text-green-600">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-green-600">+15% from last month</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Balance</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsData.currentBalance)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Next payout: Nov 30, 2023</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Payout</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsData.pendingPayout)}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">Processing</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Earnings</h3>
              <div className="space-y-3">
                {earningsData.monthlyEarnings.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{item.month}</span>
                    <div className="flex-1 mx-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${(item.earnings / 15000) * 100}%` }}></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{formatCurrency(item.earnings)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payout History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {earningsData.payoutHistory.map((payout, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(payout.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(payout.amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            {payout.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary hover:text-primary/90 transition-colors">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'messages':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {messagesData.map((message) => (
                  <div key={message.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{message.studentName}</h3>
                          {message.unread && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{message.course}</p>
                        <p className="mt-2 text-gray-700">{message.message}</p>
                        <p className="mt-2 text-xs text-gray-500">{formatDate(message.date)}</p>
                      </div>
                      <button 
                        onClick={() => setShowMessageModal(message.id)}
                        className="ml-4 text-primary hover:text-primary/90 transition-colors"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden relative">
                  <Image
                    src="/images/instructor-avatar.jpg"
                    alt="Instructor profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
                  <p className="text-gray-600">Senior Web Development Instructor</p>
                  <p className="text-sm text-gray-500 mt-1">Joined January 2022</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Sarah Johnson"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue="sarah@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        defaultValue="Experienced web developer and instructor with over 10 years of experience in the industry."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Social Links</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                      <input
                        type="url"
                        placeholder="https://twitter.com/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive emails about your courses and students</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-600">Receive browser notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive text messages for urgent matters</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payout Method</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>PayPal</option>
                    <option>Bank Transfer</option>
                    <option>Stripe</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payout Email</label>
                  <input
                    type="email"
                    defaultValue="sarah@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Information</label>
                  <input
                    type="text"
                    placeholder="Enter your tax ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden mr-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateCourse(true)}
                className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </button>
              <div className="relative">
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 transition-colors">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden relative">
                  <Image
                    src="/images/instructor-avatar.jpg"
                    alt="Instructor profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Sarah Johnson</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
              <div className="fixed inset-y-0 left-0 w-80 bg-white shadow-lg p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col items-center text-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden relative mb-4">
                    <Image
                      src="/images/instructor-avatar.jpg"
                      alt="Instructor profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Sarah Johnson</h2>
                  <p className="text-gray-600">Senior Web Development Instructor</p>
                </div>

                <nav className="space-y-1">
                  {[
                    { key: 'overview', label: 'Overview', icon: BarChart3 },
                    { key: 'courses', label: 'My Courses', icon: BookOpen },
                    { key: 'students', label: 'Student Progress', icon: Users },
                    { key: 'submissions', label: 'Submissions', icon: FileText },
                    { key: 'live-sessions', label: 'Live Sessions', icon: Video },
                    { key: 'forum', label: 'Q&A Forum', icon: MessageSquare },
                    { key: 'analytics', label: 'Analytics', icon: TrendingUp },
                    { key: 'earnings', label: 'Earnings', icon: DollarSign },
                    { key: 'messages', label: 'Messages', icon: Mail },
                    { key: 'profile', label: 'Profile', icon: User },
                    { key: 'settings', label: 'Settings', icon: Settings },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveTab(key);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === key
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {label}
                    </button>
                  ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                  </button>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Total Students</span>
                        <span className="font-medium">{instructorAnalytics.totalStudents}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Monthly Revenue</span>
                        <span className="font-medium">{formatCurrency(instructorAnalytics.monthlyRevenue[instructorAnalytics.monthlyRevenue.length - 1].revenue)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Average Rating</span>
                        <span className="font-medium">{instructorAnalytics.averageRating}/5.0</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(instructorAnalytics.averageRating / 5) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden relative mb-4">
                  <Image
                    src="/images/instructor-avatar.jpg"
                    alt="Instructor profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Sarah Johnson</h2>
                <p className="text-gray-600">Senior Web Development Instructor</p>
              </div>

              <nav className="space-y-1">
                {[
                  { key: 'overview', label: 'Overview', icon: BarChart3 },
                  { key: 'courses', label: 'My Courses', icon: BookOpen },
                  { key: 'students', label: 'Student Progress', icon: Users },
                  { key: 'submissions', label: 'Submissions', icon: FileText },
                  { key: 'live-sessions', label: 'Live Sessions', icon: Video },
                  { key: 'forum', label: 'Q&A Forum', icon: MessageSquare },
                  { key: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { key: 'earnings', label: 'Earnings', icon: DollarSign },
                  { key: 'messages', label: 'Messages', icon: Mail },
                  { key: 'profile', label: 'Profile', icon: User },
                  { key: 'settings', label: 'Settings', icon: Settings },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === key
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Total Students</span>
                    <span className="font-medium">{instructorAnalytics.totalStudents}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Monthly Revenue</span>
                    <span className="font-medium">{formatCurrency(instructorAnalytics.monthlyRevenue[instructorAnalytics.monthlyRevenue.length - 1].revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-medium">{instructorAnalytics.averageRating}/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(instructorAnalytics.averageRating / 5) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Course</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter course description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter course category"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => setCourseForm({...courseForm, level: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={courseForm.duration}
                  onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 8 weeks"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowCreateCourse(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCourse}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {showGradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Grade Submission</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                <input
                  type="number"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter score (0-100)"
                  max="100"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Provide feedback to student"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => {
                  setShowGradeModal(null);
                  setGrade('');
                  setFeedback('');
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGradeSubmission}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Submit Grade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule Live Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Title</label>
                <input
                  type="text"
                  value={sessionForm.title}
                  onChange={(e) => setSessionForm({...sessionForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter session title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <select
                  value={sessionForm.course}
                  onChange={(e) => setSessionForm({...sessionForm, course: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a course</option>
                  {instructorCourses.map(course => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm({...sessionForm, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={sessionForm.startTime}
                    onChange={(e) => setSessionForm({...sessionForm, startTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={sessionForm.duration}
                    onChange={(e) => setSessionForm({...sessionForm, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 90 minutes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    value={sessionForm.platform}
                    onChange={(e) => setSessionForm({...sessionForm, platform: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Zoom">Zoom</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                <input
                  type="number"
                  value={sessionForm.maxCapacity}
                  onChange={(e) => setSessionForm({...sessionForm, maxCapacity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter maximum participants"
                  min="1"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowSessionModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleSession}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Schedule Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Send Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Type your message here"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => {
                  setShowMessageModal(null);
                  setMessageText('');
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}