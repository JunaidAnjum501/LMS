'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, BookOpen, TrendingUp, DollarSign, Settings, Shield, BarChart3, Eye, Edit, Trash, Plus, Search, Filter, Download, Calendar, Clock, Award, UserPlus, BookPlus, Activity, AlertTriangle, CheckCircle, XCircle, Mail, Phone, FileText, CreditCard, PieChart, LineChart, BarChart, MapPin, Bell, UserCheck, UserX, Star, ExternalLink, ChevronDown, ChevronRight, MoreVertical } from 'lucide-react';

// Mock data for system overview
const systemStats = {
  totalUsers: 15420,
  totalStudents: 12450,
  totalInstructors: 1850,
  totalParents: 1120,
  totalCourses: 892,
  activeCourses: 645,
  totalRevenue: 284750.50,
  monthlyRevenue: 45230.75,
  newUsersThisMonth: 1245,
  userGrowthRate: 12.5,
  courseCompletionRate: 78.3,
  averageRating: 4.6,
  systemUptime: 99.8,
  supportTickets: 23,
  resolvedTickets: 18,
  pendingTickets: 5,
};

// Mock data for users
const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'student',
    status: 'active',
    joinDate: '2023-10-15',
    lastLogin: '2023-11-12',
    coursesEnrolled: 5,
    coursesCompleted: 3,
    totalSpent: 249.95,
    avatar: '/images/user-1.jpg',
    country: 'United States',
    lastActivity: '2 hours ago',
  },
  {
    id: 2,
    name: 'Robert Smith',
    email: 'robert.smith@example.com',
    role: 'instructor',
    status: 'active',
    joinDate: '2023-09-20',
    lastLogin: '2023-11-12',
    coursesCreated: 8,
    totalStudents: 1245,
    totalRevenue: 12450.00,
    rating: 4.8,
    avatar: '/images/user-2.jpg',
    country: 'United Kingdom',
    lastActivity: '1 hour ago',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'parent',
    status: 'active',
    joinDate: '2023-08-10',
    lastLogin: '2023-11-11',
    childrenCount: 2,
    totalSpent: 499.90,
    avatar: '/images/user-3.jpg',
    country: 'Spain',
    lastActivity: '5 hours ago',
  },
  {
    id: 4,
    name: 'David Lee',
    email: 'david.lee@example.com',
    role: 'student',
    status: 'suspended',
    joinDate: '2023-07-05',
    lastLogin: '2023-11-05',
    coursesEnrolled: 3,
    coursesCompleted: 1,
    totalSpent: 149.97,
    avatar: '/images/user-4.jpg',
    country: 'Canada',
    lastActivity: '7 days ago',
  },
];

// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Sarah Johnson',
    status: 'active',
    createdDate: '2023-09-15',
    studentsEnrolled: 1245,
    completionRate: 78,
    averageRating: 4.8,
    revenue: 62350.00,
    price: 49.99,
    duration: '8 weeks',
    level: 'Beginner',
    category: 'Web Development',
    lessons: 45,
    quizzes: 8,
    assignments: 12,
    image: '/images/course-1.jpg',
    lastUpdated: '2023-11-10',
  },
  {
    id: 2,
    title: 'Advanced Machine Learning',
    instructor: 'Dr. Michael Chen',
    status: 'active',
    createdDate: '2023-08-20',
    studentsEnrolled: 890,
    completionRate: 65,
    averageRating: 4.6,
    revenue: 71250.00,
    price: 79.99,
    duration: '12 weeks',
    level: 'Advanced',
    category: 'Data Science',
    lessons: 60,
    quizzes: 10,
    assignments: 15,
    image: '/images/course-2.jpg',
    lastUpdated: '2023-11-12',
  },
  {
    id: 3,
    title: 'Digital Marketing Fundamentals',
    instructor: 'Emma Wilson',
    status: 'draft',
    createdDate: '2023-10-01',
    studentsEnrolled: 0,
    completionRate: 0,
    averageRating: 0,
    revenue: 0,
    price: 39.99,
    duration: '6 weeks',
    level: 'Beginner',
    category: 'Marketing',
    lessons: 30,
    quizzes: 5,
    assignments: 8,
    image: '/images/course-3.jpg',
    lastUpdated: '2023-11-08',
  },
];

// Mock data for financial analytics
const financialAnalytics = {
  monthlyRevenue: [
    { month: 'Jun', revenue: 38500, users: 1200 },
    { month: 'Jul', revenue: 42100, users: 1350 },
    { month: 'Aug', revenue: 39800, users: 1280 },
    { month: 'Sep', revenue: 45600, users: 1450 },
    { month: 'Oct', revenue: 48900, users: 1520 },
    { month: 'Nov', revenue: 45230, users: 1245 },
  ],
  revenueByCategory: [
    { category: 'Web Development', revenue: 145000, percentage: 35 },
    { category: 'Data Science', revenue: 98000, percentage: 24 },
    { category: 'Marketing', revenue: 67000, percentage: 16 },
    { category: 'Design', revenue: 54000, percentage: 13 },
    { category: 'Business', revenue: 49000, percentage: 12 },
  ],
  topInstructors: [
    { name: 'Sarah Johnson', revenue: 62350, courses: 5, students: 1245 },
    { name: 'Dr. Michael Chen', revenue: 71250, courses: 3, students: 890 },
    { name: 'Emma Wilson', revenue: 45600, courses: 4, students: 650 },
  ],
};

// Mock data for system activities
const systemActivities = [
  {
    id: 1,
    user: 'Alice Johnson',
    action: 'enrolled',
    target: 'Introduction to Web Development',
    timestamp: '2023-11-12T10:30:00',
    type: 'course_enrollment',
  },
  {
    id: 2,
    user: 'Robert Smith',
    action: 'created',
    target: 'Advanced React Patterns',
    timestamp: '2023-11-12T09:15:00',
    type: 'course_creation',
  },
  {
    id: 3,
    user: 'Maria Garcia',
    action: 'completed',
    target: 'Python Basics Course',
    timestamp: '2023-11-12T08:45:00',
    type: 'course_completion',
  },
  {
    id: 4,
    user: 'David Wilson',
    action: 'reported',
    target: 'Technical Issue #1234',
    timestamp: '2023-11-12T07:30:00',
    type: 'support_ticket',
  },
];

// Mock data for support tickets
const supportTickets = [
  {
    id: 1,
    user: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    subject: 'Cannot access course content',
    priority: 'high',
    status: 'open',
    category: 'Technical',
    createdDate: '2023-11-12',
    lastUpdate: '2023-11-12',
    assignedTo: 'Support Team',
  },
  {
    id: 2,
    user: 'Robert Smith',
    email: 'robert.smith@example.com',
    subject: 'Payment issue with subscription',
    priority: 'medium',
    status: 'in_progress',
    category: 'Billing',
    createdDate: '2023-11-11',
    lastUpdate: '2023-11-12',
    assignedTo: 'Billing Team',
  },
  {
    id: 3,
    user: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    subject: 'Request for course refund',
    priority: 'low',
    status: 'resolved',
    category: 'Refund',
    createdDate: '2023-11-10',
    lastUpdate: '2023-11-11',
    assignedTo: 'Customer Success',
  },
];

// Mock data for platform settings
const platformSettings = {
  general: {
    siteName: 'LearnHub Academy',
    siteDescription: 'Your gateway to professional learning',
    supportEmail: 'support@learnhub.com',
    supportPhone: '+1 (555) 123-4567',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    language: 'English',
  },
  features: {
    enableCertificates: true,
    enableGamification: true,
    enableDiscussionForums: true,
    enableLiveClasses: true,
    enableMobileApp: true,
    enableSocialLogin: true,
  },
  payment: {
    currency: 'USD',
    paymentMethods: ['stripe', 'paypal', 'credit_card'],
    commissionRate: 30,
    minimumPayout: 100,
    payoutSchedule: 'monthly',
  },
  email: {
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    fromEmail: 'noreply@learnhub.com',
    fromName: 'LearnHub Academy',
  },
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const getDaysAgo = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'inactive':
        return 'text-gray-600 bg-gray-100';
      case 'suspended':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'draft':
        return 'text-gray-600 bg-gray-100';
      case 'open':
        return 'text-red-600 bg-red-100';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'resolved':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Administrator Dashboard</h1>
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
                    src="/images/admin-avatar.jpg"
                    alt="Admin profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Admin User</span>
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
                    src="/images/admin-avatar.jpg"
                    alt="Admin profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Admin User</h2>
                <p className="text-gray-600">System Administrator</p>
              </div>

              <nav className="space-y-1">
                {[
                  { key: 'overview', label: 'System Overview', icon: BarChart3 },
                  { key: 'users', label: 'User Management', icon: Users },
                  { key: 'courses', label: 'Course Management', icon: BookOpen },
                  { key: 'analytics', label: 'Analytics & Reports', icon: TrendingUp },
                  { key: 'finance', label: 'Financial Overview', icon: DollarSign },
                  { key: 'support', label: 'Support Tickets', icon: AlertTriangle },
                  { key: 'settings', label: 'Platform Settings', icon: Settings },
                  { key: 'security', label: 'Security', icon: Shield },
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
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowUserModal(true)}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <UserPlus className="mr-3 h-4 w-4" />
                  Add New User
                </button>
                <button
                  onClick={() => setShowCourseModal(true)}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <BookPlus className="mr-3 h-4 w-4" />
                  Create Course
                </button>
                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                  <Download className="mr-3 h-4 w-4" />
                  Export Reports
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* System Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Users', value: systemStats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-600' },
                    { label: 'Total Courses', value: systemStats.totalCourses.toLocaleString(), icon: BookOpen, color: 'text-green-600' },
                    { label: 'Monthly Revenue', value: formatCurrency(systemStats.monthlyRevenue), icon: DollarSign, color: 'text-yellow-600' },
                    { label: 'System Uptime', value: `${systemStats.systemUptime}%`, icon: Activity, color: 'text-purple-600' },
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

                {/* Detailed Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">User Distribution</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Students</span>
                        <span className="font-medium">{systemStats.totalStudents.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Instructors</span>
                        <span className="font-medium">{systemStats.totalInstructors.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Parents</span>
                        <span className="font-medium">{systemStats.totalParents.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Course Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Courses</span>
                        <span className="font-medium">{systemStats.activeCourses}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg. Rating</span>
                        <span className="font-medium">{systemStats.averageRating}/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completion Rate</span>
                        <span className="font-medium">{systemStats.courseCompletionRate}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Support Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Tickets</span>
                        <span className="font-medium">{systemStats.supportTickets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resolved</span>
                        <span className="font-medium">{systemStats.resolvedTickets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pending</span>
                        <span className="font-medium">{systemStats.pendingTickets}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Recent System Activity</h3>
                    <button className="text-primary text-sm font-medium hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {systemActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-2">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {activity.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-900">
                              <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                            </p>
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                  <button
                    onClick={() => setShowUserModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90"
                  >
                    <UserPlus className="inline-block mr-2 h-4 w-4" />
                    Add User
                  </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">All Roles</option>
                      <option value="student">Students</option>
                      <option value="instructor">Instructors</option>
                      <option value="parent">Parents</option>
                    </select>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900 capitalize">{user.role}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(user.joinDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.lastActivity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-primary hover:text-primary/90 mr-3">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Course Management Tab */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90">
                    <BookPlus className="inline-block mr-2 h-4 w-4" />
                    Create Course
                  </button>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'text-blue-600' },
                    { label: 'Active Courses', value: courses.filter(c => c.status === 'active').length, icon: CheckCircle, color: 'text-green-600' },
                    { label: 'Draft Courses', value: courses.filter(c => c.status === 'draft').length, icon: FileText, color: 'text-yellow-600' },
                    { label: 'Total Revenue', value: formatCurrency(courses.reduce((sum, c) => sum + c.revenue, 0)), icon: DollarSign, color: 'text-purple-600' },
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

                {/* Courses Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                          <tr key={course.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                <div className="text-sm text-gray-500">{course.category} • {course.level}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {course.instructor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}>
                                {course.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {course.studentsEnrolled}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                              {formatCurrency(course.revenue)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-primary hover:text-primary/90 mr-3">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-primary hover:text-primary/90 mr-3">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Overview Tab */}
            {activeTab === 'finance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-green-100 text-green-600">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(systemStats.totalRevenue)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                        <p className="text-2xl font-bold text-gray-900">+{systemStats.userGrowthRate}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                        <Users className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Students</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.totalStudents.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                        <Award className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.averageRating}/5.0</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Revenue Trend</h3>
                    <div className="space-y-3">
                      {financialAnalytics.monthlyRevenue.map((month, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-sm text-gray-600 w-16">{month.month}</span>
                          <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${(month.revenue / 50000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-20 text-right">{formatCurrency(month.revenue)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Category</h3>
                    <div className="space-y-3">
                      {financialAnalytics.revenueByCategory.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{category.category}</span>
                            <span className="font-medium">{category.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Instructors */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Instructors</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Instructor</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Revenue</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Courses</th>
                          <th className="text-left py-2 text-sm font-medium text-gray-600">Students</th>
                        </tr>
                      </thead>
                      <tbody>
                        {financialAnalytics.topInstructors.map((instructor, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 text-sm text-gray-900">{instructor.name}</td>
                            <td className="py-3 text-sm text-gray-900">{formatCurrency(instructor.revenue)}</td>
                            <td className="py-3 text-sm text-gray-900">{instructor.courses}</td>
                            <td className="py-3 text-sm text-gray-900">{instructor.students.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Support Tickets Tab */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-red-100 text-red-600">
                        <AlertTriangle className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.supportTickets - systemStats.resolvedTickets}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">In Progress</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.pendingTickets}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-green-100 text-green-600">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Resolved</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.resolvedTickets}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                        <p className="text-2xl font-bold text-gray-900">{systemStats.supportTickets}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {supportTickets.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">{ticket.user}</div>
                                <div className="text-sm text-gray-500">{ticket.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {ticket.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.priority)}`}>
                                {ticket.priority}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                                {ticket.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ticket.assignedTo}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-primary hover:text-primary/90">
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New User</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Course</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Select Instructor</option>
                  <option>Sarah Johnson</option>
                  <option>Dr. Michael Chen</option>
                  <option>Emma Wilson</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Select Category</option>
                  <option>Web Development</option>
                  <option>Data Science</option>
                  <option>Marketing</option>
                  <option>Design</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCourseModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}