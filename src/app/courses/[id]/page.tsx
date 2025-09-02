'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, CheckCircle, ArrowLeft, ArrowRight, Share2, BookOpen, Award, Users } from 'lucide-react';

// Define types for our data structures
interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  image: string;
  tags: string[];
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  isPreview: boolean;
}

interface CurriculumSection {
  id: number;
  title: string;
  lessons: Lesson[];
}

// Import the mock data from the courses page
const coursesData: Course[] = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Sarah Johnson',
    category: 'Development',
    level: 'Beginner',
    rating: 4.8,
    students: 1245,
    duration: '10 weeks',
    price: 49.99,
    image: '/images/course-1.jpg',
    tags: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 2,
    title: 'Advanced React & Redux',
    instructor: 'David Chen',
    category: 'Development',
    level: 'Advanced',
    rating: 4.9,
    students: 892,
    duration: '8 weeks',
    price: 79.99,
    image: '/images/course-2.jpg',
    tags: ['React', 'Redux', 'JavaScript']
  },
  {
    id: 3,
    title: 'Digital Marketing Fundamentals',
    instructor: 'Maria Rodriguez',
    category: 'Marketing',
    level: 'Beginner',
    rating: 4.7,
    students: 1532,
    duration: '6 weeks',
    price: 59.99,
    image: '/images/course-3.jpg',
    tags: ['SEO', 'Social Media', 'Content Marketing']
  },
  {
    id: 4,
    title: 'Data Science with Python',
    instructor: 'James Wilson',
    category: 'Data Science',
    level: 'Intermediate',
    rating: 4.9,
    students: 1105,
    duration: '12 weeks',
    price: 89.99,
    image: '/images/course-4.jpg',
    tags: ['Python', 'Machine Learning', 'Data Analysis']
  },
  {
    id: 5,
    title: 'UX/UI Design Principles',
    instructor: 'Emily Zhang',
    category: 'Design',
    level: 'Intermediate',
    rating: 4.8,
    students: 978,
    duration: '8 weeks',
    price: 69.99,
    image: '/images/course-5.jpg',
    tags: ['Figma', 'User Research', 'Prototyping']
  },
  {
    id: 6,
    title: 'Mobile App Development with Flutter',
    instructor: 'Michael Brown',
    category: 'Development',
    level: 'Intermediate',
    rating: 4.7,
    students: 845,
    duration: '10 weeks',
    price: 79.99,
    image: '/images/course-6.jpg',
    tags: ['Flutter', 'Dart', 'Mobile']
  },
  {
    id: 7,
    title: 'Business Analytics Essentials',
    instructor: 'Lisa Thompson',
    category: 'Business',
    level: 'Beginner',
    rating: 4.6,
    students: 1320,
    duration: '6 weeks',
    price: 49.99,
    image: '/images/course-7.jpg',
    tags: ['Excel', 'Data Visualization', 'Reporting']
  },
  {
    id: 8,
    title: 'Cybersecurity Fundamentals',
    instructor: 'Robert Garcia',
    category: 'IT & Security',
    level: 'Beginner',
    rating: 4.9,
    students: 1150,
    duration: '8 weeks',
    price: 69.99,
    image: '/images/course-8.jpg',
    tags: ['Network Security', 'Ethical Hacking', 'Cryptography']
  },
];

// Course curriculum mock data
const curriculumData: CurriculumSection[] = [
  {
    id: 1,
    title: 'Getting Started',
    lessons: [
      { id: 1, title: 'Introduction to the Course', duration: '10:15', isPreview: true },
      { id: 2, title: 'Setting Up Your Environment', duration: '15:30', isPreview: false },
      { id: 3, title: 'Understanding the Basics', duration: '20:45', isPreview: false },
    ]
  },
  {
    id: 2,
    title: 'Core Concepts',
    lessons: [
      { id: 4, title: 'Fundamental Principles', duration: '25:10', isPreview: true },
      { id: 5, title: 'Building Your First Project', duration: '30:00', isPreview: false },
      { id: 6, title: 'Advanced Techniques', duration: '22:15', isPreview: false },
    ]
  },
  {
    id: 3,
    title: 'Real-World Applications',
    lessons: [
      { id: 7, title: 'Case Study: Industry Examples', duration: '18:30', isPreview: false },
      { id: 8, title: 'Building a Portfolio Project', duration: '45:00', isPreview: false },
      { id: 9, title: 'Final Assessment and Next Steps', duration: '15:45', isPreview: false },
    ]
  },
];

// Related courses mock data (simplified version of coursesData)
const getRelatedCourses = (currentCourseId: number, category: string): Course[] => {
  return coursesData
    .filter(course => course.id !== currentCourseId && course.category === category)
    .slice(0, 3);
};

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<number[]>([1]); // First section expanded by default
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  
  useEffect(() => {
    // Unwrap the params promise
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setUnwrappedParams(resolvedParams);
      
      // Find the course by ID from the URL params
      const courseId = parseInt(resolvedParams.id);
      const foundCourse = coursesData.find(c => c.id === courseId);
      
      if (foundCourse) {
        setCourse(foundCourse);
        setRelatedCourses(getRelatedCourses(courseId, foundCourse.category));
      }
    };
    
    unwrapParams();
  }, [params]);
  
  // Toggle curriculum section expansion
  const toggleSection = (sectionId: number) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };
  
  if (!unwrappedParams || !course) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Loading course...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-light-gray">
      {/* Course Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Link href="/courses" className="flex items-center text-primary hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              Back to Courses
            </Link>
            
            <nav className="flex">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-gray-500 hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <Link href="/courses" className="text-gray-500 hover:text-primary">
                      Courses
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-700">{course.title}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Course Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Course Info - Left Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 text-secondary mb-4">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{course.level}</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">{course.title}</h1>
              
              <p className="text-lg text-gray-700 mb-6">
                This comprehensive {course.title} course is designed to take you from beginner to professional. 
                You'll learn all the essential skills and techniques needed to excel in this field, guided by {course.instructor}, 
                an industry expert with years of practical experience.
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                    <Image 
                      src="/instructor-placeholder.jpg" 
                      alt={course.instructor}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Instructor</p>
                    <p className="font-medium">{course.instructor}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-accent fill-accent" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-gray-500">({course.students} students)</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5 text-gray-700" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p>June 2023</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="btn btn-outline-secondary flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
            
            {/* Course Card - Right Column */}
            <div>
              <div className="bg-white rounded-xl overflow-hidden shadow-custom sticky top-24">
                <div className="relative h-52 w-full overflow-hidden">
                  <Image 
                    src={course.image} 
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white/90 p-4 rounded-full cursor-pointer hover:bg-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-3xl font-bold text-primary">${course.price}</p>
                  </div>
                  
                  <button className="btn btn-primary w-full mb-4">Enroll Now</button>
                  
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900">This course includes:</h3>
                    
                    <div className="flex items-start gap-3">
                      <BookOpen className="h-5 w-5 text-gray-700 mt-0.5" />
                      <div>
                        <p className="font-medium">24 lessons</p>
                        <p className="text-sm text-gray-600">Comprehensive video content</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gray-700 mt-0.5" />
                      <div>
                        <p className="font-medium">Lifetime access</p>
                        <p className="text-sm text-gray-600">Learn at your own pace</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-gray-700 mt-0.5" />
                      <div>
                        <p className="font-medium">Certificate</p>
                        <p className="text-sm text-gray-600">Upon completion</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-gray-700 mt-0.5" />
                      <div>
                        <p className="font-medium">Community access</p>
                        <p className="text-sm text-gray-600">Learn with others</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button 
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'curriculum' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveTab('curriculum')}
              >
                Curriculum
              </button>
              <button 
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'instructor' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveTab('instructor')}
              >
                Instructor
              </button>
              <button 
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">About This Course</h3>
                  <p className="text-gray-700 mb-4">
                    This comprehensive {course.title} course is designed to take you from beginner to professional. 
                    You'll learn all the essential skills and techniques needed to excel in this field, guided by {course.instructor}, 
                    an industry expert with years of practical experience.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Whether you're just starting out or looking to enhance your existing skills, this course provides a structured 
                    learning path with hands-on projects and real-world applications. By the end of the course, you'll have 
                    the confidence and expertise to tackle complex challenges in {course.category}.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.tags.map(tag => (
                      <div key={tag} className="flex items-start gap-2">
                        <div className="text-primary mt-1">
                          <CheckCircle size={18} />
                        </div>
                        <p>Master {tag} and related technologies</p>
                      </div>
                    ))}
                    <div className="flex items-start gap-2">
                      <div className="text-primary mt-1">
                        <CheckCircle size={18} />
                      </div>
                      <p>Build real-world projects for your portfolio</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-primary mt-1">
                        <CheckCircle size={18} />
                      </div>
                      <p>Understand industry best practices and workflows</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-primary mt-1">
                        <CheckCircle size={18} />
                      </div>
                      <p>Solve complex problems with efficient solutions</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="text-primary mt-1">
                        <CheckCircle size={18} />
                      </div>
                      <p>Receive a certificate upon completion</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Basic computer skills and familiarity with standard software</li>
                    <li>No prior experience in {course.category} is required for beginner courses</li>
                    <li>Intermediate and advanced courses may require prerequisite knowledge</li>
                    <li>A computer with internet access (Windows, Mac, or Linux)</li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Who This Course Is For</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Beginners looking to start a career in {course.category}</li>
                    <li>Professionals wanting to upgrade their skills with the latest techniques</li>
                    <li>Anyone interested in learning {course.tags.join(', ')} in a structured environment</li>
                    <li>Students preparing for industry certification or employment</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Course Content</h3>
                  <div className="text-sm text-gray-600">
                    <span>{curriculumData.reduce((total, section) => total + section.lessons.length, 0)} lessons</span>
                    <span className="mx-2">•</span>
                    <span>5 hours total</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {curriculumData.map(section => (
                    <div key={section.id} className="border rounded-lg overflow-hidden">
                      {/* Section Header */}
                      <div 
                        className="bg-gray-50 p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div>
                          <h4 className="font-bold">{section.title}</h4>
                          <p className="text-sm text-gray-600">{section.lessons.length} lessons</p>
                        </div>
                        <button className="text-gray-600">
                          {expandedSections.includes(section.id) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          )}
                        </button>
                      </div>
                      
                      {/* Section Content */}
                      {expandedSections.includes(section.id) && (
                        <div className="divide-y">
                          {section.lessons.map(lesson => (
                            <div key={lesson.id} className="p-4 flex justify-between items-center">
                              <div className="flex items-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mt-0.5">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                                </svg>
                                <div>
                                  <h5 className="font-medium">{lesson.title}</h5>
                                  {lesson.isPreview && (
                                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">Preview</span>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm text-gray-600">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Instructor Tab */}
            {activeTab === 'instructor' && (
              <div>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                    <Image 
                      src="/instructor-placeholder.jpg" 
                      alt={course.instructor}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{course.instructor}</h3>
                    <p className="text-gray-600 mb-2">Expert in {course.category}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="text-sm">4.9 Instructor Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">12,345 Students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span className="text-sm">15 Courses</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-bold mb-3">About the Instructor</h4>
                  <p className="text-gray-700 mb-4">
                    {course.instructor} is a seasoned professional with over 10 years of experience in {course.category}. 
                    They have worked with leading companies in the industry and have a passion for teaching and sharing their knowledge.
                  </p>
                  <p className="text-gray-700">
                    Their teaching approach focuses on practical, hands-on learning with real-world examples and projects. 
                    Students consistently praise their clear explanations, engaging teaching style, and responsive support.
                  </p>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3 bg-gray-50 p-6 rounded-lg text-center">
                    <div className="text-5xl font-bold text-primary mb-2">{course.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'text-accent fill-accent' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600">{course.students} students</p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-4">Student Feedback</h3>
                    <div className="space-y-4">
                      {/* Rating Bars */}
                      {[5, 4, 3, 2, 1].map(rating => {
                        // Mock percentages
                        const percentages: Record<number, number> = {
                          5: 75,
                          4: 18,
                          3: 5,
                          2: 1,
                          1: 1
                        };
                        
                        return (
                          <div key={rating} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-16">
                              <span>{rating}</span>
                              <Star className="h-4 w-4 text-accent fill-accent" />
                            </div>
                            <div className="flex-grow bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-accent h-2.5 rounded-full" 
                                style={{ width: `${percentages[rating]}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-12">{percentages[rating]}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold mb-4">Reviews</h3>
                  
                  {/* Review 1 */}
                  <div className="border-b pb-6">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center bg-primary text-white font-bold">
                          JD
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold">John Doe</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">1 month ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand, 
                      and the projects helped me apply what I learned. Highly recommended for anyone interested in {course.category}.
                    </p>
                  </div>
                  
                  {/* Review 2 */}
                  <div className="border-b pb-6">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center bg-secondary text-white font-bold">
                          JS
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold">Jane Smith</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <span className="text-sm text-gray-600">2 months ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      Great course with lots of valuable information. The only reason I'm giving 4 stars instead of 5 is that some sections 
                      could use more examples. Otherwise, it's been very helpful for my professional development.
                    </p>
                  </div>
                  
                  {/* Review 3 */}
                  <div>
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center bg-accent text-white font-bold">
                          RJ
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold">Robert Johnson</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">3 months ago</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">
                      As someone who was completely new to {course.category}, I found this course incredibly helpful. 
                      The instructor breaks down complex topics into manageable chunks, and the community support is fantastic. 
                      I've already started applying what I've learned in my current job.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-heading font-bold mb-8">Related Courses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedCourses.map(relatedCourse => (
            <div 
              key={relatedCourse.id} 
              className="bg-white rounded-xl overflow-hidden shadow-custom hover:shadow-lg transition-all duration-300 group"
            >
              {/* Course Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image 
                  src={relatedCourse.image} 
                  alt={relatedCourse.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-3 rounded-lg text-sm font-medium">
                  ${relatedCourse.price}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="font-medium">{relatedCourse.rating}</span>
                      <span className="text-white/80 text-sm">({relatedCourse.students})</span>
                    </div>
                    <span className="mx-1">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{relatedCourse.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-secondary mb-3">
                  <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">{relatedCourse.category}</span>
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{relatedCourse.level}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors">{relatedCourse.title}</h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                    <Image 
                      src="/instructor-placeholder.jpg" 
                      alt={relatedCourse.instructor}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <p className="text-gray-700 text-sm">{relatedCourse.instructor}</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <Link 
                    href={`/courses/${relatedCourse.id}`}
                    className="text-primary font-medium flex items-center gap-1 hover:underline"
                  >
                    View Details
                  </Link>
                  <Link 
                    href={`/courses/${relatedCourse.id}`}
                    className="btn btn-primary flex items-center justify-center gap-1 px-4 py-2"
                  >
                    Enroll <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-primary text-white rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-lg mb-0 max-w-2xl">
                Join thousands of students who have already taken this course and started their journey in {course.category}.
              </p>
            </div>
            <button className="btn btn-white whitespace-nowrap flex-shrink-0">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}