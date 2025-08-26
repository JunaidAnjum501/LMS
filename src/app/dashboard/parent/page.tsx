'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, BookOpen, TrendingUp, Award, Calendar, MessageSquare, Bell, Settings, User, LogOut, Eye, Download, Clock, CheckCircle, AlertTriangle, Star, Activity, Target, FileText, Video, Phone, Mail, ChevronRight, Filter, Search } from 'lucide-react';

// Mock data for children
const children = [
  {
    id: 1,
    name: 'Emma Johnson',
    age: 14,
    grade: '9th Grade',
    avatar: '/images/child-1.jpg',
    email: 'emma.johnson@student.com',
    totalCourses: 5,
    completedCourses: 3,
    averageScore: 87,
    learningHours: 42,
    streak: 7,
    recentActivity: '2023-11-12',
    courses: [
      {
        id: 1,
        name: 'Introduction to Web Development',
        progress: 85,
        instructor: 'Sarah Johnson',
        lastAccess: '2023-11-12',
        nextLesson: 'CSS Grid Layout',
        assignments: [
          { name: 'HTML Basics Quiz', score: 92, maxScore: 100, status: 'completed' },
          { name: 'CSS Layout Challenge', score: 88, maxScore: 100, status: 'completed' },
          { name: 'JavaScript Fundamentals', score: null, maxScore: 100, status: 'pending' },
        ],
      },
      {
        id: 2,
        name: 'Mathematics - Algebra I',
        progress: 72,
        instructor: 'Michael Brown',
        lastAccess: '2023-11-11',
        nextLesson: 'Quadratic Equations',
        assignments: [
          { name: 'Linear Equations Test', score: 85, maxScore: 100, status: 'completed' },
          { name: 'Word Problems', score: 79, maxScore: 100, status: 'completed' },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Lucas Johnson',
    age: 12,
    grade: '7th Grade',
    avatar: '/images/child-2.jpg',
    email: 'lucas.johnson@student.com',
    totalCourses: 4,
    completedCourses: 2,
    averageScore: 91,
    learningHours: 38,
    streak: 12,
    recentActivity: '2023-11-12',
    courses: [
      {
        id: 3,
        name: 'Science - Earth & Space',
        progress: 90,
        instructor: 'Emily Zhang',
        lastAccess: '2023-11-12',
        nextLesson: 'Solar System',
        assignments: [
          { name: 'Planet Research Project', score: 95, maxScore: 100, status: 'completed' },
          { name: 'Weather Patterns Quiz', score: 88, maxScore: 100, status: 'completed' },
        ],
      },
      {
        id: 4,
        name: 'English Literature',
        progress: 68,
        instructor: 'David Kim',
        lastAccess: '2023-11-10',
        nextLesson: 'Poetry Analysis',
        assignments: [
          { name: 'Book Report', score: 92, maxScore: 100, status: 'completed' },
          { name: 'Creative Writing', score: null, maxScore: 100, status: 'pending' },
        ],
      },
    ],
  },
];

// Mock data for parent notifications
const parentNotifications = [
  {
    id: 1,
    type: 'achievement',
    title: 'Emma completed Web Development course!',
    message: 'Emma has successfully completed "Introduction to Web Development" with a 92% final score.',
    timestamp: '2023-11-12T10:30:00',
    childName: 'Emma Johnson',
    priority: 'high',
  },
  {
    id: 2,
    type: 'assignment',
    title: 'Lucas has a new assignment due',
    message: 'Creative Writing assignment is due tomorrow, November 13th.',
    timestamp: '2023-11-12T14:15:00',
    childName: 'Lucas Johnson',
    priority: 'medium',
  },
  {
    id: 3,
    type: 'message',
    title: 'New message from Sarah Johnson',
    message: 'Emma is showing great progress in web development. She\'s particularly strong in CSS styling.',
    timestamp: '2023-11-11T16:45:00',
    childName: 'Emma Johnson',
    priority: 'low',
  },
];

// Mock data for parent-teacher communication
const teacherMessages = [
  {
    id: 1,
    teacherName: 'Sarah Johnson',
    course: 'Introduction to Web Development',
    childName: 'Emma Johnson',
    lastMessage: 'Emma is doing excellent work in class. She completed her CSS project ahead of schedule.',
    timestamp: '2023-11-12T09:30:00',
    unread: 2,
    avatar: '/images/teacher-1.jpg',
  },
  {
    id: 2,
    teacherName: 'Michael Brown',
    course: 'Mathematics - Algebra I',
    childName: 'Emma Johnson',
    lastMessage: 'Emma needs more practice with quadratic equations. I\'ve assigned extra homework.',
    timestamp: '2023-11-11T15:20:00',
    unread: 0,
    avatar: '/images/teacher-2.jpg',
  },
  {
    id: 3,
    teacherName: 'Emily Zhang',
    course: 'Science - Earth & Space',
    childName: 'Lucas Johnson',
    lastMessage: 'Lucas showed great enthusiasm during our solar system lesson today!',
    timestamp: '2023-11-12T11:45:00',
    unread: 1,
    avatar: '/images/teacher-3.jpg',
  },
];

// Mock data for learning analytics
const learningAnalytics = {
  weeklyActivity: [
    { day: 'Mon', emma: 2.5, lucas: 3.0 },
    { day: 'Tue', emma: 1.8, lucas: 2.5 },
    { day: 'Wed', emma: 3.2, lucas: 1.5 },
    { day: 'Thu', emma: 2.0, lucas: 2.8 },
    { day: 'Fri', emma: 1.5, lucas: 3.5 },
    { day: 'Sat', emma: 1.0, lucas: 0.5 },
    { day: 'Sun', emma: 0.5, lucas: 1.0 },
  ],
  monthlyProgress: [
    { month: 'Aug', emma: 65, lucas: 70 },
    { month: 'Sep', emma: 72, lucas: 78 },
    { month: 'Oct', emma: 78, lucas: 85 },
    { month: 'Nov', emma: 85, lucas: 90 },
  ],
  subjectPerformance: [
    { subject: 'Web Development', emma: 85, lucas: 0 },
    { subject: 'Mathematics', emma: 72, lucas: 0 },
    { subject: 'Science', emma: 0, lucas: 90 },
    { subject: 'English', emma: 0, lucas: 68 },
  ],
};

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: 'Parent-Teacher Conference',
    childName: 'Emma Johnson',
    teacher: 'Sarah Johnson',
    date: '2023-11-15',
    time: '2:00 PM',
    type: 'conference',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/1234567890',
  },
  {
    id: 2,
    title: 'Science Fair Presentation',
    childName: 'Lucas Johnson',
    date: '2023-11-20',
    time: '10:00 AM',
    type: 'presentation',
    location: 'School Auditorium',
  },
  {
    id: 3,
    title: 'Mathematics Test',
    childName: 'Emma Johnson',
    date: '2023-11-18',
    time: '9:00 AM',
    type: 'assessment',
    location: 'Online',
  },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const [showMessageModal, setShowMessageModal] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden relative">
                  <Image
                    src="/images/parent-avatar.jpg"
                    alt="Parent profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">John Parent</span>
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
                    src="/images/parent-avatar.jpg"
                    alt="Parent profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">John Parent</h2>
                <p className="text-gray-600">Parent of 2 students</p>
              </div>

              <nav className="space-y-1">
                {[
                  { key: 'overview', label: 'Overview', icon: Activity },
                  { key: 'children', label: 'Children Progress', icon: Users },
                  { key: 'communication', label: 'Teacher Messages', icon: MessageSquare },
                  { key: 'analytics', label: 'Learning Analytics', icon: TrendingUp },
                  { key: 'calendar', label: 'Calendar & Events', icon: Calendar },
                  { key: 'notifications', label: 'Notifications', icon: Bell },
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

            {/* Children Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Children Overview</h3>
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium text-gray-900">{child.name}</p>
                        <p className="text-xs text-gray-500">{child.grade}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Avg Score</span>
                        <span className="font-medium">{child.averageScore}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Learning Hours</span>
                        <span className="font-medium">{child.learningHours}h</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Streak</span>
                        <span className="font-medium">{child.streak} days</span>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
                  <p className="mb-4">Stay updated with your children's learning progress and achievements.</p>
                  <div className="flex space-x-4">
                    <button className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                      View Progress
                    </button>
                    <button className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors">
                      Check Messages
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Children', value: children.length, icon: Users, color: 'text-blue-600' },
                    { label: 'Active Courses', value: children.reduce((acc, child) => acc + child.totalCourses, 0), icon: BookOpen, color: 'text-green-600' },
                    { label: 'Avg Score', value: `${Math.round(children.reduce((acc, child) => acc + child.averageScore, 0) / children.length)}%`, icon: Award, color: 'text-yellow-600' },
                    { label: 'Total Hours', value: `${children.reduce((acc, child) => acc + child.learningHours, 0)}h`, icon: Clock, color: 'text-purple-600' },
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

                {/* Recent Notifications */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Recent Notifications</h3>
                    <Link href="/dashboard/parent/notifications" className="text-primary text-sm font-medium hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {parentNotifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'achievement' ? 'bg-green-100 text-green-600' :
                          notification.type === 'assignment' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {notification.type === 'achievement' ? <Award className="h-4 w-4" /> :
                           notification.type === 'assignment' ? <FileText className="h-4 w-4" /> :
                           <MessageSquare className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatTime(notification.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
                    <Link href="/dashboard/parent/calendar" className="text-primary text-sm font-medium hover:underline">
                      View Calendar
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600">{event.childName} • {event.date} at {event.time}</p>
                          <p className="text-xs text-gray-500">{getDaysUntil(event.date)} days remaining</p>
                        </div>
                        <button className="text-primary text-sm font-medium hover:underline">
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Children Progress Tab */}
            {activeTab === 'children' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Children Progress</h2>
                
                {children.map((child) => (
                  <div key={child.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {child.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-900">{child.name}</h3>
                        <p className="text-sm text-gray-600">{child.grade} • {child.age} years old</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.averageScore}%</p>
                        <p className="text-sm text-gray-600">Average Score</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.completedCourses}/{child.totalCourses}</p>
                        <p className="text-sm text-gray-600">Courses Completed</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.learningHours}h</p>
                        <p className="text-sm text-gray-600">Learning Hours</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.streak}</p>
                        <p className="text-sm text-gray-600">Day Streak</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Current Courses</h4>
                      {child.courses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-medium text-gray-900">{course.name}</h5>
                              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                            </div>
                            <span className="text-sm font-medium text-primary">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Last active: {formatDate(course.lastAccess)}</span>
                            <span>Next: {course.nextLesson}</span>
                          </div>
                          
                          {/* Recent Assignments */}
                          <div className="mt-3 space-y-2">
                            <h6 className="text-sm font-medium text-gray-700">Recent Assignments</h6>
                            {course.assignments.slice(0, 2).map((assignment, index) => (
                              <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">{assignment.name}</span>
                                <span className={`font-medium ${
                                  assignment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                                }`}>
                                  {assignment.status === 'completed' ? `${assignment.score}/${assignment.maxScore}` : 'Pending'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Teacher Messages Tab */}
            {activeTab === 'communication' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Teacher Messages</h2>
                
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {teacherMessages.map((message) => (
                      <div key={message.id} className="p-6 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden relative">
                            <Image
                              src={message.avatar}
                              alt={message.teacherName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-bold text-gray-900">{message.teacherName}</h3>
                                <p className="text-sm text-gray-600">{message.course} • {message.childName}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {message.unread > 0 && (
                                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {message.unread}
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2">{message.lastMessage}</p>
                            <div className="mt-3 flex space-x-2">
                              <button
                                onClick={() => setShowMessageModal(message.id)}
                                className="text-sm text-primary hover:text-primary/90 font-medium"
                              >
                                Reply
                              </button>
                              <button className="text-sm text-gray-500 hover:text-gray-700">
                                View Full Conversation
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Learning Analytics</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Learning Hours</h3>
                    <div className="space-y-3">
                      {learningAnalytics.weeklyActivity.map((day, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 w-12">{day.day}</span>
                          <div className="flex-1 mx-3">
                            <div className="flex space-x-1">
                              <div className="flex-1 bg-blue-100 rounded">
                                <div
                                  className="bg-blue-500 h-4 rounded"
                                  style={{ width: `${(day.emma / 4) * 100}%` }}
                                ></div>
                              </div>
                              <div className="flex-1 bg-green-100 rounded">
                                <div
                                  className="bg-green-500 h-4 rounded"
                                  style={{ width: `${(day.lucas / 4) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 w-16 text-right">
                            E:{day.emma}h L:{day.lucas}h
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-center space-x-6 text-sm">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                          <span className="text-gray-600">Emma</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                          <span className="text-gray-600">Lucas</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Subject Performance</h3>
                    <div className="space-y-3">
                      {learningAnalytics.subjectPerformance.map((subject, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{subject.subject}</span>
                            <span className="font-medium">
                              {subject.emma > 0 ? `Emma: ${subject.emma}%` : `Lucas: ${subject.lucas}%`}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${subject.emma > 0 ? subject.emma : subject.lucas}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                  placeholder="Type your message here..."
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => {
                  setShowMessageModal(null);
                  setMessageText('');
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle message sending
                  setShowMessageModal(null);
                  setMessageText('');
                }}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90"
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