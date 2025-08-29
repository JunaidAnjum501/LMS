'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, BookOpen, TrendingUp, Award, Calendar, MessageSquare, 
  Bell, Settings, User, LogOut, Eye, Download, Clock, 
  CheckCircle, AlertTriangle, Star, Activity, Target, 
  FileText, Video, Phone, Mail, ChevronRight, Filter, 
  Search, BarChart3, PieChart, Bookmark, ChevronDown,
  Send, MoreVertical, Home, Book, MailOpen
} from 'lucide-react';

// Types
interface Assignment {
  name: string;
  score: number | null;
  maxScore: number;
  status: 'completed' | 'pending' | 'late';
  dueDate?: string;
}

interface Course {
  id: number;
  name: string;
  progress: number;
  instructor: string;
  lastAccess: string;
  nextLesson: string;
  assignments: Assignment[];
}

interface Child {
  id: number;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  email: string;
  totalCourses: number;
  completedCourses: number;
  averageScore: number;
  learningHours: number;
  streak: number;
  recentActivity: string;
  courses: Course[];
}

interface Notification {
  id: number;
  type: 'achievement' | 'assignment' | 'message';
  title: string;
  message: string;
  timestamp: string;
  childName: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

interface TeacherMessage {
  id: number;
  teacherName: string;
  course: string;
  childName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
}

interface Event {
  id: number;
  title: string;
  childName: string;
  teacher?: string;
  date: string;
  time: string;
  type: 'conference' | 'presentation' | 'assessment';
  platform?: string;
  meetingLink?: string;
  location?: string;
}

interface LearningAnalytics {
  weeklyActivity: { day: string; emma: number; lucas: number }[];
  monthlyProgress: { month: string; emma: number; lucas: number }[];
  subjectPerformance: { subject: string; emma: number; lucas: number }[];
}

// Mock data for children
const childrenData: Child[] = [
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
          { name: 'JavaScript Fundamentals', score: null, maxScore: 100, status: 'pending', dueDate: '2023-11-20' },
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
          { name: 'Quadratic Equations Practice', score: null, maxScore: 100, status: 'pending', dueDate: '2023-11-18' },
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
          { name: 'Solar System Model', score: null, maxScore: 100, status: 'pending', dueDate: '2023-11-22' },
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
          { name: 'Creative Writing', score: null, maxScore: 100, status: 'pending', dueDate: '2023-11-13' },
        ],
      },
    ],
  },
];

// Mock data for parent notifications
const parentNotificationsData: Notification[] = [
  {
    id: 1,
    type: 'achievement',
    title: 'Emma completed Web Development course!',
    message: 'Emma has successfully completed "Introduction to Web Development" with a 92% final score.',
    timestamp: '2023-11-12T10:30:00',
    childName: 'Emma Johnson',
    priority: 'high',
    read: false,
  },
  {
    id: 2,
    type: 'assignment',
    title: 'Lucas has a new assignment due',
    message: 'Creative Writing assignment is due tomorrow, November 13th.',
    timestamp: '2023-11-12T14:15:00',
    childName: 'Lucas Johnson',
    priority: 'medium',
    read: false,
  },
  {
    id: 3,
    type: 'message',
    title: 'New message from Sarah Johnson',
    message: 'Emma is showing great progress in web development. She\'s particularly strong in CSS styling.',
    timestamp: '2023-11-11T16:45:00',
    childName: 'Emma Johnson',
    priority: 'low',
    read: true,
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Lucas earned a badge in Science!',
    message: 'Lucas earned the "Space Explorer" badge for excellent work on the planet research project.',
    timestamp: '2023-11-10T09:15:00',
    childName: 'Lucas Johnson',
    priority: 'medium',
    read: true,
  },
];

// Mock data for parent-teacher communication
const teacherMessagesData: TeacherMessage[] = [
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
const learningAnalyticsData: LearningAnalytics = {
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
    { subject: 'History', emma: 78, lucas: 82 },
  ],
};

// Mock data for upcoming events
const upcomingEventsData: Event[] = [
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
  {
    id: 4,
    title: 'English Essay Deadline',
    childName: 'Lucas Johnson',
    date: '2023-11-13',
    time: '11:59 PM',
    type: 'assessment',
    location: 'Online',
  },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChild, setSelectedChild] = useState<number | null>(null);
  const [showMessageModal, setShowMessageModal] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>(parentNotificationsData);
  const [teacherMessages, setTeacherMessages] = useState<TeacherMessage[]>(teacherMessagesData);
  const [children, setChildren] = useState<Child[]>(childrenData);
  const [events, setEvents] = useState<Event[]>(upcomingEventsData);
  const [analytics, setAnalytics] = useState<LearningAnalytics>(learningAnalyticsData);
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Calculate unread notifications
  useEffect(() => {
    const unread = notifications.filter(notification => !notification.read).length;
    setUnreadCount(unread);
  }, [notifications]);

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

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const toggleCourseExpansion = (courseId: number) => {
    if (expandedCourses.includes(courseId)) {
      setExpandedCourses(expandedCourses.filter(id => id !== courseId));
    } else {
      setExpandedCourses([...expandedCourses, courseId]);
    }
  };

  const sendMessage = (teacherId: number) => {
    if (messageText.trim()) {
      // In a real app, this would send the message to an API
      console.log(`Sending message to teacher ${teacherId}: ${messageText}`);
      setShowMessageModal(null);
      setMessageText('');
      // Update the message thread
      setTeacherMessages(teacherMessages.map(msg => 
        msg.id === teacherId ? { ...msg, lastMessage: messageText, timestamp: new Date().toISOString(), unread: 0 } : msg
      ));
    }
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAssignmentStatusIcon = (status: 'completed' | 'pending' | 'late') => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'late': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  // Navigation items
  const navItems = [
    { key: 'overview', label: 'Overview', icon: Home },
    { key: 'children', label: 'Children Progress', icon: Users },
    { key: 'communication', label: 'Teacher Messages', icon: MessageSquare },
    { key: 'analytics', label: 'Learning Analytics', icon: BarChart3 },
    { key: 'calendar', label: 'Calendar & Events', icon: Calendar },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      <button 
                        onClick={markAllNotificationsAsRead}
                        className="text-sm text-primary hover:text-primary/80"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-center text-gray-500">No notifications</p>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start">
                              <div className={`p-2 rounded-full mr-3 ${
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
                                <div className="flex justify-between items-center mt-2">
                                  <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                                    {notification.priority}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t border-gray-200 text-center">
                      <Link 
                        href="/dashboard/parent/notifications" 
                        className="text-sm text-primary hover:text-primary/90 font-medium"
                        onClick={() => setShowNotifications(false)}
                      >
                        View All Notifications
                      </Link>
                    </div>
                  </div>
                )}
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
                <p className="text-gray-600">Parent of {children.length} students</p>
              </div>

              <nav className="space-y-1">
                {navItems.map(({ key, label, icon: Icon }) => (
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

            {/* Children Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Children Overview</h3>
              <div className="space-y-4">
                {children.map((child) => (
                  <div 
                    key={child.id} 
                    className={`border rounded-lg p-3 transition-colors cursor-pointer ${
                      selectedChild === child.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedChild(selectedChild === child.id ? null : child.id)}
                  >
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative">
                        <Image
                          src={child.avatar}
                          alt={child.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{child.name}</p>
                        <p className="text-xs text-gray-500">{child.grade}</p>
                      </div>
                      <ChevronDown 
                        className={`h-4 w-4 ml-auto transition-transform ${
                          selectedChild === child.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                    
                    {selectedChild === child.id && (
                      <div className="mt-3 space-y-2 animate-fadeIn">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Email</span>
                          <span className="font-medium truncate ml-2">{child.email}</span>
                        </div>
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
                        <div className="pt-2 mt-2 border-t border-gray-100">
                          <button 
                            className="w-full py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-md hover:bg-primary/20 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTab('children');
                            }}
                          >
                            View Full Progress
                          </button>
                        </div>
                      </div>
                    )}
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
                  <p className="mb-4 opacity-90">Stay updated with your children's learning progress and achievements.</p>
                  <div className="flex flex-wrap gap-3">
                    <button 
                      className="bg-white text-primary px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                      onClick={() => setActiveTab('children')}
                    >
                      View Progress
                    </button>
                    <button 
                      className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors"
                      onClick={() => setActiveTab('communication')}
                    >
                      Check Messages
                    </button>
                    <button 
                      className="border border-white text-white px-4 py-2 rounded-md font-medium hover:bg-white/10 transition-colors"
                      onClick={() => setActiveTab('calendar')}
                    >
                      View Calendar
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    { label: 'Total Children', value: children.length, icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
                    { label: 'Active Courses', value: children.reduce((acc, child) => acc + child.totalCourses, 0), icon: BookOpen, color: 'text-green-600', bgColor: 'bg-green-100' },
                    { label: 'Avg Score', value: `${Math.round(children.reduce((acc, child) => acc + child.averageScore, 0) / children.length)}%`, icon: Award, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
                    { label: 'Total Hours', value: `${children.reduce((acc, child) => acc + child.learningHours, 0)}h`, icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-100' },
                  ].map((metric, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center">
                        <div className={`p-3 rounded-lg ${metric.bgColor} ${metric.color}`}>
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
                  {/* Recent Notifications */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-gray-900">Recent Notifications</h3>
                      <Link href="/dashboard/parent/notifications" className="text-primary text-sm font-medium hover:underline">
                        View All
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {notifications.slice(0, 3).map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`flex items-start space-x-3 p-4 border rounded-lg transition-colors cursor-pointer ${
                            notification.read 
                              ? 'border-gray-200 hover:border-gray-300' 
                              : 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                          }`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className={`p-2 rounded-full flex-shrink-0 ${
                            notification.type === 'achievement' ? 'bg-green-100 text-green-600' :
                            notification.type === 'assignment' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {notification.type === 'achievement' ? <Award className="h-4 w-4" /> :
                            notification.type === 'assignment' ? <FileText className="h-4 w-4" /> :
                            <MessageSquare className="h-4 w-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              {!notification.read && (
                                <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5 ml-2"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{formatTime(notification.timestamp)} • {notification.childName}</p>
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
                      {events.slice(0, 3).map((event) => {
                        const daysUntil = getDaysUntil(event.date);
                        const isSoon = daysUntil <= 2;
                        
                        return (
                          <div 
                            key={event.id} 
                            className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                              isSoon ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center">
                                <h4 className="font-medium text-gray-900">{event.title}</h4>
                                {isSoon && (
                                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                    Soon
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{event.childName} • {formatDate(event.date)} at {event.time}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {daysUntil > 0 
                                  ? `${daysUntil} day${daysUntil !== 1 ? 's' : ''} remaining` 
                                  : 'Today'}
                              </p>
                            </div>
                            <button className="text-primary text-sm font-medium hover:underline whitespace-nowrap ml-2">
                              Details
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Children Progress Preview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Children Progress</h3>
                    <button 
                      onClick={() => setActiveTab('children')}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {children.map((child) => (
                      <div key={child.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="flex items-center mb-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden relative">
                            <Image
                              src={child.avatar}
                              alt={child.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="ml-3">
                            <h4 className="font-medium text-gray-900">{child.name}</h4>
                            <p className="text-sm text-gray-600">{child.grade}</p>
                          </div>
                          <div className="ml-auto bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                            {child.averageScore}% Avg
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Courses Completed</span>
                              <span className="font-medium">{child.completedCourses}/{child.totalCourses}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${(child.completedCourses / child.totalCourses) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600">Learning Hours</span>
                              <span className="font-medium">{child.learningHours}h</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${Math.min((child.learningHours / 50) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-xs pt-2">
                            <div className="flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 mr-1" />
                              <span>{child.streak} day streak</span>
                            </div>
                            <span className="text-gray-500">Last active: {formatDate(child.recentActivity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Children Progress Tab */}
            {activeTab === 'children' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Children Progress</h2>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter
                    </button>
                  </div>
                </div>
                
                {children.map((child) => (
                  <div key={child.id} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center mb-6">
                      <div className="h-14 w-14 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image
                          src={child.avatar}
                          alt={child.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                        <p className="text-sm text-gray-600">{child.grade} • {child.age} years old • {child.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.averageScore}%</p>
                        <p className="text-sm text-gray-600">Average Score</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.completedCourses}/{child.totalCourses}</p>
                        <p className="text-sm text-gray-600">Courses Completed</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.learningHours}h</p>
                        <p className="text-sm text-gray-600">Learning Hours</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-gray-900">{child.streak}</p>
                        <p className="text-sm text-gray-600">Day Streak</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 text-lg">Current Courses</h4>
                      {child.courses.map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h5 className="font-medium text-gray-900">{course.name}</h5>
                              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-primary mr-2">{course.progress}%</span>
                              <button 
                                onClick={() => toggleCourseExpansion(course.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <ChevronDown className={`h-4 w-4 transition-transform ${expandedCourses.includes(course.id) ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                            <div 
                              className="h-2 rounded-full transition-all duration-300" 
                              style={{ 
                                width: `${course.progress}%`,
                                backgroundColor: course.progress >= 80 ? '#10B981' : 
                                              course.progress >= 50 ? '#F59E0B' : '#EF4444'
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Last active: {formatDate(course.lastAccess)}</span>
                            <span>Next: {course.nextLesson}</span>
                          </div>
                          
                          {/* Expanded Assignments Section */}
                          {expandedCourses.includes(course.id) && (
                            <div className="mt-4 pt-4 border-t border-gray-100 animate-fadeIn">
                              <h6 className="text-sm font-medium text-gray-700 mb-3">Assignments</h6>
                              <div className="space-y-3">
                                {course.assignments.map((assignment, index) => (
                                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                    <div className="flex items-center">
                                      {getAssignmentStatusIcon(assignment.status)}
                                      <span className="ml-2 text-sm text-gray-700">{assignment.name}</span>
                                      {assignment.dueDate && (
                                        <span className="ml-2 text-xs text-gray-500">
                                          Due: {formatDate(assignment.dueDate)}
                                        </span>
                                      )}
                                    </div>
                                    <span className={`text-sm font-medium ${
                                      assignment.status === 'completed' 
                                        ? assignment.score && assignment.score >= 90 
                                          ? 'text-green-600' 
                                          : 'text-yellow-600'
                                        : 'text-gray-500'
                                    }`}>
                                      {assignment.status === 'completed' 
                                        ? `${assignment.score}/${assignment.maxScore}`
                                        : assignment.status === 'late'
                                          ? 'Late'
                                          : 'Pending'
                                      }
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-4 flex space-x-2">
                                <button className="text-sm bg-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
                                  Contact Instructor
                                </button>
                                <button className="text-sm border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md font-medium hover:bg-gray-50 transition-colors">
                                  View Course Details
                                </button>
                              </div>
                            </div>
                          )}
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
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Teacher Messages</h2>
                  <button className="flex items-center text-sm text-primary font-medium hover:text-primary/90">
                    <MailOpen className="h-4 w-4 mr-1" />
                    Mark all as read
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    {teacherMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setShowMessageModal(message.id)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                            <Image
                              src={message.avatar}
                              alt={message.teacherName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-sm font-bold text-gray-900 truncate">{message.teacherName}</h3>
                                <p className="text-sm text-gray-600 truncate">{message.course} • {message.childName}</p>
                              </div>
                              <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                                {message.unread > 0 && (
                                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                                    {message.unread}
                                  </span>
                                )}
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                  {formatDate(message.timestamp)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700 mt-2 truncate">{message.lastMessage}</p>
                            <div className="mt-3 flex space-x-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowMessageModal(message.id);
                                }}
                                className="text-sm text-primary hover:text-primary/90 font-medium inline-flex items-center"
                              >
                                <Send className="h-3 w-3 mr-1" />
                                Reply
                              </button>
                              <button 
                                className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </button>
                              <button 
                                className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Video className="h-3 w-3 mr-1" />
                                Video Call
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {teacherMessages.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                    <p className="text-gray-500 mb-4">You don't have any messages from teachers at this time.</p>
                    <button className="text-primary font-medium hover:text-primary/90">
                      Contact a teacher
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Learning Analytics</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Weekly Learning Hours Chart */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-gray-900">Weekly Learning Hours</h3>
                      <div className="flex items-center space-x-2 text-sm">
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
                    <div className="space-y-3">
                      {analytics.weeklyActivity.map((day, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-sm text-gray-600 w-10">{day.day}</span>
                          <div className="flex-1 mx-4">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span>Emma: {day.emma}h</span>
                              <span>Lucas: {day.lucas}h</span>
                            </div>
                            <div className="flex space-x-1 h-3">
                              <div 
                                className="bg-blue-500 rounded"
                                style={{ width: `${(day.emma / 4) * 100}%` }}
                              ></div>
                              <div 
                                className="bg-green-500 rounded"
                                style={{ width: `${(day.lucas / 4) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subject Performance */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Subject Performance</h3>
                    <div className="space-y-4">
                      {analytics.subjectPerformance.map((subject, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{subject.subject}</span>
                            <span className="font-medium">
                              {subject.emma > 0 ? `Emma: ${subject.emma}%` : `Lucas: ${subject.lucas}%`}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full"
                              style={{ 
                                width: `${subject.emma > 0 ? subject.emma : subject.lucas}%`,
                                backgroundColor: (subject.emma > 0 ? subject.emma : subject.lucas) >= 80 ? '#10B981' : 
                                              (subject.emma > 0 ? subject.emma : subject.lucas) >= 50 ? '#F59E0B' : '#EF4444'
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Monthly Progress */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Progress</h3>
                  <div className="flex items-end justify-between h-40">
                    {analytics.monthlyProgress.map((month, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div className="flex items-end justify-center w-full px-2">
                          <div 
                            className="w-full bg-blue-500 rounded-t max-w-12"
                            style={{ height: `${month.emma}%` }}
                          ></div>
                          <div 
                            className="w-full bg-green-500 rounded-t max-w-12 ml-1"
                            style={{ height: `${month.lucas}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-6 mt-4 text-sm">
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

                {/* Performance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Emma's Performance</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Average Score</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Course Completion</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Consistency</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Lucas's Performance</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Average Score</span>
                          <span className="font-medium">91%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '91%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Course Completion</span>
                          <span className="font-medium">50%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Consistency</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Comparison</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Learning Hours (Weekly Avg)</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="w-20">Emma</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                          </div>
                          <span>12.5h</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="w-20">Lucas</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                          <span>16h</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Assignment Completion</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="w-20">Emma</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                          <span>78%</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="w-20">Lucas</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                          <span>85%</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Streak Days</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="w-20">Emma</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                          </div>
                          <span>7 days</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="w-20">Lucas</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                          </div>
                          <span>12 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Calendar & Events Tab */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Calendar & Events</h2>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
                    <div className="flex items-center space-x-2">
                      <button className="text-sm bg-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
                        Add to Calendar
                      </button>
                      <button className="text-sm border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md font-medium hover:bg-gray-50 transition-colors">
                        Export
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {events.map((event) => {
                      const daysUntil = getDaysUntil(event.date);
                      const isToday = daysUntil === 0;
                      const isTomorrow = daysUntil === 1;
                      
                      return (
                        <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <h4 className="font-medium text-gray-900 mr-2">{event.title}</h4>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  isToday 
                                    ? 'bg-red-100 text-red-800' 
                                    : isTomorrow
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {isToday ? 'Today' : isTomorrow ? 'Tomorrow' : `${daysUntil} days`}
                                </span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3">
                                <span className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {formatDate(event.date)}
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {event.time}
                                </span>
                                <span className="flex items-center">
                                  <User className="h-4 w-4 mr-1" />
                                  {event.childName}
                                </span>
                                {event.teacher && (
                                  <span className="flex items-center">
                                    <Book className="h-4 w-4 mr-1" />
                                    {event.teacher}
                                  </span>
                                )}
                              </div>
                              
                              <div className="text-sm">
                                {event.type === 'conference' && (
                                  <p className="text-gray-600">
                                    <span className="font-medium">Platform:</span> {event.platform}
                                    {event.meetingLink && (
                                      <a href={event.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">
                                        Join Meeting
                                      </a>
                                    )}
                                  </p>
                                )}
                                {event.location && (
                                  <p className="text-gray-600">
                                    <span className="font-medium">Location:</span> {event.location}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end space-y-2 ml-4">
                              <button className="text-primary text-sm font-medium hover:underline whitespace-nowrap">
                                Add Reminder
                              </button>
                              {event.type === 'conference' && event.meetingLink && (
                                <a 
                                  href={event.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm bg-primary text-white px-3 py-1 rounded-md font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                                >
                                  Join Meeting
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {events.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming events</h3>
                      <p className="text-gray-500">You don't have any upcoming events scheduled.</p>
                    </div>
                  )}
                </div>
                
                {/* Calendar View Placeholder */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">November 2023</h3>
                  <div className="grid grid-cols-7 gap-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                        {day}
                      </div>
                    ))}
                    
                    {/* Empty days before the first */}
                    {[...Array(3)].map((_, i) => (
                      <div key={`empty-${i}`} className="h-16 border border-gray-100 rounded-lg"></div>
                    ))}
                    
                    {/* Days of the month */}
                    {[...Array(30)].map((_, i) => {
                      const day = i + 1;
                      const hasEvent = events.some(event => {
                        const eventDate = new Date(event.date).getDate();
                        return eventDate === day;
                      });
                      
                      return (
                        <div 
                          key={day} 
                          className={`h-16 border rounded-lg p-1 flex flex-col items-center ${
                            hasEvent ? 'border-primary bg-primary/5' : 'border-gray-100'
                          }`}
                        >
                          <span className="text-sm font-medium">{day}</span>
                          {hasEvent && (
                            <span className="w-2 h-2 bg-primary rounded-full mt-1"></span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={markAllNotificationsAsRead}
                      className="text-sm text-primary font-medium hover:text-primary/90"
                    >
                      Mark all as read
                    </button>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      <Filter className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="border-b border-gray-200">
                    <div className="flex">
                      <button className="px-6 py-3 text-sm font-medium border-b-2 border-primary text-primary">
                        All
                      </button>
                      <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Unread
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center">
                        <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                        <p className="text-gray-500">You don't have any notifications at this time.</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-6 transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                        >
                          <div className="flex items-start space-x-4">
                            <div className={`p-3 rounded-full flex-shrink-0 ${
                              notification.type === 'achievement' ? 'bg-green-100 text-green-600' :
                              notification.type === 'assignment' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-blue-100 text-blue-600'
                            }`}>
                              {notification.type === 'achievement' ? <Award className="h-5 w-5" /> :
                              notification.type === 'assignment' ? <FileText className="h-5 w-5" /> :
                              <MessageSquare className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                  <div className="flex items-center mt-2">
                                    <span className="text-xs text-gray-500">{formatTime(notification.timestamp)}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-xs text-gray-500">{notification.childName}</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(notification.priority)}`}>
                                      {notification.priority}
                                    </span>
                                  </div>
                                </div>
                                {!notification.read && (
                                  <button 
                                    onClick={() => markNotificationAsRead(notification.id)}
                                    className="text-xs text-primary font-medium hover:text-primary/90 ml-4"
                                  >
                                    Mark as read
                                  </button>
                                )}
                              </div>
                              
                              <div className="mt-4 flex space-x-2">
                                {notification.type === 'assignment' && (
                                  <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors">
                                    View Assignment
                                  </button>
                                )}
                                {notification.type === 'message' && (
                                  <button 
                                    className="text-xs bg-primary text-white px-3 py-1.5 rounded-md font-medium hover:bg-primary/90 transition-colors"
                                    onClick={() => setActiveTab('communication')}
                                  >
                                    Reply to Message
                                  </button>
                                )}
                                <button className="text-xs border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md font-medium hover:bg-gray-50 transition-colors">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden relative mb-4">
                      <Image
                        src="/images/parent-avatar.jpg"
                        alt="Parent profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">John Parent</h3>
                    <p className="text-gray-600">Parent of {children.length} students</p>
                    <button className="mt-2 text-sm text-primary font-medium hover:text-primary/90">
                      Change Photo
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Parent"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        defaultValue="john.parent@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        defaultValue="123 Education Street, Learning City"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Email Notifications', defaultChecked: true },
                        { label: 'Push Notifications', defaultChecked: true },
                        { label: 'SMS Alerts', defaultChecked: false },
                        { label: 'Assignment Reminders', defaultChecked: true },
                        { label: 'Grade Updates', defaultChecked: true },
                        { label: 'Event Reminders', defaultChecked: true },
                      ].map((pref, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={pref.defaultChecked}
                            id={`pref-${index}`}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor={`pref-${index}`} className="ml-2 text-sm text-gray-700">
                            {pref.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>
                  
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
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Allow teachers to contact me', defaultChecked: true },
                        { label: 'Share my children\'s progress with teachers', defaultChecked: true },
                        { label: 'Receive promotional emails', defaultChecked: false },
                        { label: 'Show my children in class leaderboards', defaultChecked: true },
                      ].map((pref, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            defaultChecked={pref.defaultChecked}
                            id={`privacy-${index}`}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor={`privacy-${index}`} className="ml-2 text-sm text-gray-700">
                            {pref.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Danger Zone</h3>
                    <div className="space-y-4">
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Deactivate Account
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        Delete Account
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Send Message</h3>
              <button 
                onClick={() => {
                  setShowMessageModal(null);
                  setMessageText('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                &times;
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                To: {teacherMessages.find(m => m.id === showMessageModal)?.teacherName}
              </p>
              <p className="text-sm text-gray-600">
                Regarding: {teacherMessages.find(m => m.id === showMessageModal)?.course}
              </p>
            </div>
            
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
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => sendMessage(showMessageModal)}
                disabled={!messageText.trim()}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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