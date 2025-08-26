'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Users, BarChart3, Award, Calendar, FileText, Settings, User, LogOut, Search, Filter, Star, TrendingUp, MessageSquare, Video, Bell, Edit, Trash, Plus, Eye, Download, Upload, CheckCircle, AlertCircle, Clock, DollarSign, Target, UserCheck, BookMarked, Activity } from 'lucide-react';

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
  },
];

// Mock data for student progress tracking
const studentProgressData = [
  {
    studentId: 1,
    studentName: 'Alice Johnson',
    email: 'alice@example.com',
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
];

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState<number | null>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
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
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
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
                  { key: 'profile', label: 'Profile', icon: User },
                  { key: 'settings', label: 'Settings', icon: Settings },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
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
                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
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
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-6">
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Sarah!</h2>
                  <p className="mb-4">You have {studentSubmissions.filter(s => s.status === 'submitted').length} new submissions to grade.</p>
                  <div className="flex space-x-4">
                    <button className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                      Grade Submissions
                    </button>
                    <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors">
                      View Analytics
                    </button>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Students', value: instructorAnalytics.totalStudents, icon: Users, color: 'text-blue-600' },
                    { label: 'Total Revenue', value: formatCurrency(instructorAnalytics.totalRevenue), icon: DollarSign, color: 'text-green-600' },
                    { label: 'Average Rating', value: `${instructorAnalytics.averageRating}/5.0`, icon: Star, color: 'text-yellow-600' },
                    { label: 'Active Courses', value: instructorAnalytics.activeCourses, icon: BookOpen, color: 'text-purple-600' },
                  ].map((metric, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg bg-gray-100 ${metric.color}`}>
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

                {/* Recent Submissions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Submissions</h3>
                    <Link href="/dashboard/instructor/submissions" className="text-primary text-sm font-medium hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {studentSubmissions.slice(0, 3).map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{submission.assignment}</h4>
                          <p className="text-sm text-gray-600">{submission.studentName} • {submission.course}</p>
                          <p className="text-xs text-gray-500">Submitted {formatDate(submission.submittedDate)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.status === 'submitted' && (
                            <button
                              onClick={() => setShowGradeModal(submission.id)}
                              className="bg-primary text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-primary/90"
                            >
                              Grade
                            </button>
                          )}
                          <button className="text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Courses Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                  <button
                    onClick={() => setShowCreateCourse(true)}
                    className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Course
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {instructorCourses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                          <button className="flex-1 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                            Edit Course
                          </button>
                          <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                            View Analytics
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Student Progress</h2>
                
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                            <tr key={`${student.studentId}-${course.courseId}`}>
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
                                <button className="text-primary hover:text-primary/90 mr-3">View</button>
                                <button className="text-gray-400 hover:text-gray-600">Message</button>
                              </td>
                            </tr>
                          ))
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === 'submissions' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Student Submissions</h2>
                
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex space-x-4">
                      <button className="text-sm font-medium text-primary border-b-2 border-primary pb-2">All ({studentSubmissions.length})</button>
                      <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2">Pending ({studentSubmissions.filter(s => s.status === 'submitted').length})</button>
                      <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2">Graded ({studentSubmissions.filter(s => s.status === 'graded').length})</button>
                      <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-2">Late ({studentSubmissions.filter(s => s.status === 'late').length})</button>
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
                        {studentSubmissions.map((submission) => (
                          <tr key={submission.id}>
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
                              {submission.status === 'submitted' ? (
                                <button
                                  onClick={() => setShowGradeModal(submission.id)}
                                  className="text-primary hover:text-primary/90"
                                >
                                  Grade
                                </button>
                              ) : (
                                <button className="text-primary hover:text-primary/90">View</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                
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
              </div>
            )}

            {/* Live Sessions Tab */}
            {activeTab === 'live-sessions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Live Sessions</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 flex items-center">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Session
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingLiveSessions.map((session) => (
                    <div key={session.id} className="bg-white rounded-xl shadow-sm p-6">
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
                        <button className="flex-1 bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary/90">
                          Start Session
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grade Modal */}
      {showGradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle grade submission
                  setShowGradeModal(null);
                  setGrade('');
                  setFeedback('');
                }}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90"
              >
                Submit Grade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}