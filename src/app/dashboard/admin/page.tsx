'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, BookOpen, TrendingUp, DollarSign, Settings, Shield, BarChart3, Eye, Edit, Trash, Plus, Search, Filter, Download, Calendar, Clock, Award, UserPlus, BookPlus, Activity, AlertTriangle, CheckCircle, XCircle, Mail, Phone, FileText, CreditCard, PieChart, LineChart, BarChart, MapPin, Bell, UserCheck, UserX, Star, ExternalLink, ChevronDown, ChevronRight, MoreVertical } from 'lucide-react';

// Mock data for system overview
const initialSystemStats = {
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
const initialUsers = [
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
const initialCourses = [
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
const initialSupportTickets = [
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
const initialPlatformSettings = {
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
  const [users, setUsers] = useState(initialUsers);
  const [courses, setCourses] = useState(initialCourses);
  const [supportTickets, setSupportTickets] = useState(initialSupportTickets);
  const [platformSettings, setPlatformSettings] = useState(initialPlatformSettings);
  const [systemStats, setSystemStats] = useState(initialSystemStats);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'student',
    status: 'active'
  });
  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    category: 'Web Development',
    status: 'draft',
    price: 0,
    studentsEnrolled: 0,
    description: ''
  });
  const [newTicket, setNewTicket] = useState({
    subject: '',
    user: '',
    email: '',
    category: 'Technical',
    priority: 'medium',
    status: 'open',
    description: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editCourseMode, setEditCourseMode] = useState(false); 
  const [editTicketMode, setEditTicketMode] = useState(false); 

  // Update system stats when users or courses change
  useEffect(() => {
    const totalUsers = users.length;
    const totalStudents = users.filter(u => u.role === 'student').length;
    const totalInstructors = users.filter(u => u.role === 'instructor').length;
    const totalParents = users.filter(u => u.role === 'parent').length;
    const totalCourses = courses.length;
    const activeCourses = courses.filter(c => c.status === 'active').length;
    const totalRevenue = courses.reduce((sum, c) => sum + c.revenue, 0);
    
    setSystemStats(prev => ({
      ...prev,
      totalUsers,
      totalStudents,
      totalInstructors,
      totalParents,
      totalCourses,
      activeCourses,
      totalRevenue
    }));
  }, [users, courses]);

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
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAddUser = () => {
    const newUserObj = {
      id: users.length + 1,
      ...newUser,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      coursesEnrolled: 0,
      coursesCompleted: 0,
      totalSpent: 0,
      avatar: '/images/default-avatar.jpg',
      country: 'United States'
    };
    
    setUsers([...users, newUserObj]);
    setShowUserModal(false);
    setNewUser({ name: '', email: '', role: 'student', status: 'active' });
  };

  const handleEditUser = () => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? { ...selectedUser } : user
    );
    
    setUsers(updatedUsers);
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleAddCourse = () => {
    const newCourseObj = {
      id: courses.length + 1,
      ...newCourse,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      completionRate: 0,
      averageRating: 0,
      revenue: 0,
      duration: '6 weeks',
      level: 'Beginner',
      lessons: 0,
      quizzes: 0,
      assignments: 0,
      image: '/images/default-course.jpg'
    };
    
    setCourses([...courses, newCourseObj]);
    setShowCourseModal(false);
    setNewCourse({ 
      title: '', 
      instructor: '', 
      category: 'Web Development', 
      status: 'draft', 
      price: 0,
      studentsEnrolled: 0,
      description: ''
    });
  };

  const handleEditCourse = () => {
    if (!selectedCourse) return;
    
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse.id ? { ...selectedCourse, lastUpdated: new Date().toISOString().split('T')[0] } : course
    );
    
    setCourses(updatedCourses);
    setShowCourseModal(false);
    setSelectedCourse(null);
  };

  const handleAddTicket = () => {
    const newTicketObj = {
      id: supportTickets.length + 1,
      ...newTicket,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      assignedTo: 'Support Team'
    };
    
    setSupportTickets([...supportTickets, newTicketObj]);
    setShowTicketModal(false);
    setNewTicket({
      subject: '',
      user: '',
      email: '',
      category: 'Technical',
      priority: 'medium',
      status: 'open',
      description: ''
    });
  };

  const handleEditTicket = () => {
    if (!selectedTicket) return;
    
    const updatedTickets = supportTickets.map(ticket => 
      ticket.id === selectedTicket.id ? { ...selectedTicket, lastUpdate: new Date().toISOString().split('T')[0] } : ticket
    );
    
    setSupportTickets(updatedTickets);
    setShowTicketModal(false);
    setSelectedTicket(null);
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  const handleUpdateTicket = () => {
    if (!selectedTicket) return;
    
    const updatedTickets = supportTickets.map(ticket => 
      ticket.id === selectedTicket.id ? { ...selectedTicket, lastUpdate: new Date().toISOString().split('T')[0] } : ticket
    );
    
    setSupportTickets(updatedTickets);
    setShowTicketModal(false);
    setSelectedTicket(null);
  };

  const handleDeleteTicket = (id: number) => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      setSupportTickets(supportTickets.filter(ticket => ticket.id !== id));
    }
  };

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to a backend
    alert('Settings saved successfully!');
    setShowSettingsModal(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

 const openUserModal = (user: any = null) => {
    if (user) {
      setSelectedUser(user);
      setEditMode(true);
    } else {
      setSelectedUser(null);
      setEditMode(false);
    }
    setShowUserModal(true);
  };

  const openCourseModal = (course: any = null) => {
    if (course) {
      setSelectedCourse(course);
      setEditCourseMode(true); 
    } else {
      setSelectedCourse(null);
      setEditCourseMode(false); 
    }
    setShowCourseModal(true);
  };

  const openTicketModal = (ticket: any = null) => {
    if (ticket) {
      setSelectedTicket(ticket);
      setEditTicketMode(true);
    } else {
      setSelectedTicket(null);
      setEditTicketMode(false);
    }
    setShowTicketModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                  onClick={() => openUserModal()}
                  className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <UserPlus className="mr-3 h-4 w-4" />
                  Add New User
                </button>
                <button
                  onClick={() => openCourseModal()}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    onClick={() => openUserModal()}
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
                        {filteredUsers.map((user) => (
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
                              <button 
                                onClick={() => openUserModal(user)}
                                className="text-primary hover:text-primary/90 mr-3"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
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
                  <button 
                    onClick={() => openCourseModal()}
                    className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90"
                  >
                    <BookPlus className="inline-block mr-2 h-4 w-4" />
                    Create Course
                  </button>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {courses.map((course) => (
                          <tr key={course.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                                  <BookOpen className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                  <div className="text-sm text-gray-500">{course.category}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.instructor}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}>
                                {course.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.studentsEnrolled.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(course.revenue)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="ml-1">{course.averageRating}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-primary hover:text-primary/90 mr-3">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => openCourseModal(course)}
                                className="text-primary hover:text-primary/90 mr-3"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCourse(course.id)}
                                className="text-red-600 hover:text-red-900"
                              >
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

            {/* Analytics & Reports Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                
                {/* Analytics Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <BarChart className="h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 ml-2">User Growth Chart</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Course Popularity</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <PieChart className="h-16 w-16 text-gray-300" />
                      <p className="text-gray-500 ml-2">Course Popularity Chart</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Engagement Metrics</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Completion Rate</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Average Time Spent</span>
                          <span className="text-sm font-medium">45 min/day</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">Returning Users</span>
                          <span className="text-sm font-medium">62%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">User Geographic Distribution</h3>
                  <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
                    <MapPin className="h-16 w-16 text-gray-300" />
                    <p className="text-gray-500 ml-2">World Map Visualization</p>
                  </div>
                </div>

                {/* Export Options */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Export Reports</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="h-5 w-5 mr-2 text-gray-600" />
                      <span>User Report</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="h-5 w-5 mr-2 text-gray-600" />
                      <span>Course Report</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="h-5 w-5 mr-2 text-gray-600" />
                      <span>Financial Report</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Overview Tab */}
            {activeTab === 'finance' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
                
                {/* Financial Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Revenue', value: formatCurrency(systemStats.totalRevenue), icon: DollarSign, color: 'text-green-600' },
                    { label: 'Monthly Revenue', value: formatCurrency(systemStats.monthlyRevenue), icon: TrendingUp, color: 'text-blue-600' },
                    { label: 'Avg. Transaction', value: formatCurrency(systemStats.totalRevenue / 1250), icon: CreditCard, color: 'text-purple-600' },
                    { label: 'Refund Rate', value: '2.4%', icon: XCircle, color: 'text-red-600' },
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

                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue Trends</h3>
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                    <LineChart className="h-16 w-16 text-gray-300" />
                    <p className="text-gray-500 ml-2">Revenue Chart Visualization</p>
                  </div>
                </div>

                {/* Revenue by Category */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue by Category</h3>
                  <div className="space-y-4">
                    {financialAnalytics.revenueByCategory.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-600">{item.category}</span>
                          <span className="text-sm font-medium">{formatCurrency(item.revenue)} ({item.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-primary" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Instructors by Revenue */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Top Instructors by Revenue</h3>
                  <div className="space-y-4">
                    {financialAnalytics.topInstructors.map((instructor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{instructor.name}</p>
                          <p className="text-sm text-gray-600">{instructor.courses} courses • {instructor.students} students</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatCurrency(instructor.revenue)}</p>
                          <p className="text-sm text-green-600">Top performer</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Support Tickets Tab */}
            {activeTab === 'support' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90">
                    <Plus className="inline-block mr-2 h-4 w-4" />
                    New Ticket
                  </button>
                </div>

                {/* Ticket Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Total Tickets', value: supportTickets.length, icon: AlertTriangle, color: 'text-gray-600' },
                    { label: 'Open Tickets', value: supportTickets.filter(t => t.status === 'open').length, icon: AlertTriangle, color: 'text-red-600' },
                    { label: 'In Progress', value: supportTickets.filter(t => t.status === 'in_progress').length, icon: Clock, color: 'text-yellow-600' },
                    { label: 'Resolved', value: supportTickets.filter(t => t.status === 'resolved').length, icon: CheckCircle, color: 'text-green-600' },
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

                {/* Tickets Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {supportTickets.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                              <div className="text-sm text-gray-500">#{ticket.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{ticket.user}</div>
                              <div className="text-sm text-gray-500">{ticket.email}</div>
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
                              {ticket.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(ticket.createdDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button 
                                onClick={() => openTicketModal(ticket)}
                                className="text-primary hover:text-primary/90 mr-3"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteTicket(ticket.id)}
                                className="text-red-600 hover:text-red-900"
                              >
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

            {/* Platform Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
                  <button 
                    onClick={() => setShowSettingsModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90"
                  >
                    <Settings className="inline-block mr-2 h-4 w-4" />
                    Edit Settings
                  </button>
                </div>

                {/* Settings Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">General Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Site Name</span>
                        <span className="font-medium">{platformSettings.general.siteName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Support Email</span>
                        <span className="font-medium">{platformSettings.general.supportEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timezone</span>
                        <span className="font-medium">{platformSettings.general.timezone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language</span>
                        <span className="font-medium">{platformSettings.general.language}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency</span>
                        <span className="font-medium">{platformSettings.payment.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commission Rate</span>
                        <span className="font-medium">{platformSettings.payment.commissionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minimum Payout</span>
                        <span className="font-medium">{formatCurrency(platformSettings.payment.minimumPayout)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payout Schedule</span>
                        <span className="font-medium capitalize">{platformSettings.payment.payoutSchedule}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Enabled Features</h3>
                    <div className="space-y-3">
                      {Object.entries(platformSettings.features).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className={`font-medium ${value ? 'text-green-600' : 'text-gray-600'}`}>
                            {value ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Email Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">SMTP Host</span>
                        <span className="font-medium">{platformSettings.email.smtpHost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">SMTP Port</span>
                        <span className="font-medium">{platformSettings.email.smtpPort}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">From Email</span>
                        <span className="font-medium">{platformSettings.email.fromEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">From Name</span>
                        <span className="font-medium">{platformSettings.email.fromName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Security Dashboard</h2>
                
                {/* Security Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Security Status</h3>
                    <div className="flex items-center mb-4">
                      <Shield className="h-8 w-8 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">All systems operational</p>
                        <p className="text-sm text-gray-600">Last security scan: Today, 10:30 AM</p>
                      </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">No security issues detected. All systems are up to date.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Login Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UserCheck className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-sm text-gray-600">Successful logins (24h)</span>
                        </div>
                        <span className="font-medium">1,245</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <UserX className="h-5 w-5 text-red-600 mr-2" />
                          <span className="text-sm text-gray-600">Failed attempts (24h)</span>
                        </div>
                        <span className="font-medium">23</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                          <span className="text-sm text-gray-600">Suspicious activities</span>
                        </div>
                        <span className="font-medium">2</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Security Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Shield className="h-4 w-4 mr-2" />
                        Run Security Scan
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Download className="h-4 w-4 mr-2" />
                        Export Security Logs
                      </button>
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <Settings className="h-4 w-4 mr-2" />
                        Security Settings
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Security Events */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Security Events</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Failed login attempt</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">admin@example.com</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">192.168.1.15</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Today, 09:23 AM</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Warning
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Password changed</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">user@example.com</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10.0.0.45</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Today, 08:15 AM</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Normal
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Multiple failed attempts</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">unknown</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">203.0.113.25</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Yesterday, 11:45 PM</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Blocked
                            </span>
                          </td>
                        </tr>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editMode ? 'Edit User' : 'Add New User'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editMode ? selectedUser?.name : newUser.name}
                    onChange={(e) => editMode 
                      ? setSelectedUser({...selectedUser, name: e.target.value})
                      : setNewUser({...newUser, name: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editMode ? selectedUser?.email : newUser.email}
                    onChange={(e) => editMode 
                      ? setSelectedUser({...selectedUser, email: e.target.value})
                      : setNewUser({...newUser, email: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    value={editMode ? selectedUser?.role : newUser.role}
                    onChange={(e) => editMode 
                      ? setSelectedUser({...selectedUser, role: e.target.value})
                      : setNewUser({...newUser, role: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="parent">Parent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editMode ? selectedUser?.status : newUser.status}
                    onChange={(e) => editMode 
                      ? setSelectedUser({...selectedUser, status: e.target.value})
                      : setNewUser({...newUser, status: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editMode ? handleEditUser : handleAddUser}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  {editMode ? 'Update User' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editCourseMode ? 'Edit Course' : 'Create New Course'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    value={editCourseMode ? selectedCourse?.title : newCourse.title}
                    onChange={(e) => editCourseMode 
                      ? setSelectedCourse({...selectedCourse, title: e.target.value})
                      : setNewCourse({...newCourse, title: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <input
                    type="text"
                    value={editCourseMode ? selectedCourse?.instructor : newCourse.instructor}
                    onChange={(e) => editCourseMode 
                      ? setSelectedCourse({...selectedCourse, instructor: e.target.value})
                      : setNewCourse({...newCourse, instructor: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editCourseMode ? selectedCourse?.category : newCourse.category}
                    onChange={(e) => editCourseMode 
                      ? setSelectedCourse({...selectedCourse, category: e.target.value})
                      : setNewCourse({...newCourse, category: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Programming">Programming</option>
                    <option value="Design">Design</option>
                    <option value="Business">Business</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={editCourseMode ? selectedCourse?.price : newCourse.price}
                    onChange={(e) => editCourseMode 
                      ? setSelectedCourse({...selectedCourse, price: parseFloat(e.target.value)})
                      : setNewCourse({...newCourse, price: parseFloat(e.target.value)})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editCourseMode ? selectedCourse?.status : newCourse.status}
                    onChange={(e) => editCourseMode 
                      ? setSelectedCourse({...selectedCourse, status: e.target.value})
                      : setNewCourse({...newCourse, status: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students Enrolled</label>
                  <input
                    type="number"
                    value={editCourseMode ? selectedCourse?.studentsEnrolled : newCourse.studentsEnrolled}
                    onChange={(e) => editCourseMode 
                      ? setSelectedCourse({...selectedCourse, studentsEnrolled: parseInt(e.target.value)})
                      : setNewCourse({...newCourse, studentsEnrolled: parseInt(e.target.value)})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editCourseMode ? selectedCourse?.description : newCourse.description}
                    onChange={(e) => editCourseMode 
                      ? setSelectedCourse({...selectedCourse, description: e.target.value})
                      : setNewCourse({...newCourse, description: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCourseModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editCourseMode ? handleEditCourse : handleAddCourse}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  {editCourseMode ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {editTicketMode ? 'Edit Support Ticket' : 'Create New Ticket'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={editTicketMode ? selectedTicket?.subject : newTicket.subject}
                    onChange={(e) => editTicketMode 
                      ? setSelectedTicket({...selectedTicket, subject: e.target.value})
                      : setNewTicket({...newTicket, subject: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                  <input
                    type="text"
                    value={editTicketMode ? selectedTicket?.user : newTicket.user}
                    onChange={(e) => editTicketMode 
                      ? setSelectedTicket({...selectedTicket, user: e.target.value})
                      : setNewTicket({...newTicket, user: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editTicketMode ? selectedTicket?.email : newTicket.email}
                    onChange={(e) => editTicketMode 
                      ? setSelectedTicket({...selectedTicket, email: e.target.value})
                      : setNewTicket({...newTicket, email: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editTicketMode ? selectedTicket?.category : newTicket.category}
                    onChange={(e) => editTicketMode 
                      ? setSelectedTicket({...selectedTicket, category: e.target.value})
                      : setNewTicket({...newTicket, category: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Billing">Billing</option>
                    <option value="Content">Content</option>
                    <option value="Account">Account</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={editTicketMode ? selectedTicket?.priority : newTicket.priority}
                    onChange={(e) => editTicketMode 
                      ? setSelectedTicket({...selectedTicket, priority: e.target.value})
                      : setNewTicket({...newTicket, priority: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editTicketMode ? selectedTicket?.status : newTicket.status}
                    onChange={(e) => editTicketMode 
                      ? setSelectedTicket({...selectedTicket, status: e.target.value})
                      : setNewTicket({...newTicket, status: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={editTicketMode ? selectedTicket?.description : newTicket.description}
                    onChange={(e) => editTicketMode 
                      ? setSelectedTicket({...selectedTicket, description: e.target.value})
                      : setNewTicket({...newTicket, description: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editTicketMode ? handleEditTicket : handleAddTicket}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  {editTicketMode ? 'Update Ticket' : 'Create Ticket'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Platform Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">General Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                      <input
                        type="text"
                        value={platformSettings.general.siteName}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          general: {...platformSettings.general, siteName: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                      <input
                        type="email"
                        value={platformSettings.general.supportEmail}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          general: {...platformSettings.general, supportEmail: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <select
                        value={platformSettings.general.timezone}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          general: {...platformSettings.general, timezone: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select
                        value={platformSettings.general.language}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          general: {...platformSettings.general, language: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Payment Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select
                        value={platformSettings.payment.currency}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          payment: {...platformSettings.payment, currency: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                      <input
                        type="number"
                        value={platformSettings.payment.commissionRate}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          payment: {...platformSettings.payment, commissionRate: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Payout ($)</label>
                      <input
                        type="number"
                        value={platformSettings.payment.minimumPayout}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          payment: {...platformSettings.payment, minimumPayout: parseInt(e.target.value)}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Payout Schedule</label>
                      <select
                        value={platformSettings.payment.payoutSchedule}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          payment: {...platformSettings.payment, payoutSchedule: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Feature Toggles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(platformSettings.features).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={key}
                          checked={value}
                          onChange={(e) => setPlatformSettings({
                            ...platformSettings,
                            features: {...platformSettings.features, [key]: e.target.checked}
                          })}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label htmlFor={key} className="ml-2 block text-sm text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
