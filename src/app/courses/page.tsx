'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Star, Clock, BookOpen, ArrowRight, X, CheckCircle } from 'lucide-react';

// Mock data for courses
const coursesData = [
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

// Available categories, levels, and price ranges for filtering
const categories = ['All Categories', 'Development', 'Marketing', 'Data Science', 'Design', 'Business', 'IT & Security'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const priceRanges = ['All Prices', 'Under $50', '$50 - $70', '$70 - $100', 'Over $100'];

export default function CoursesPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedPrice, setSelectedPrice] = useState('All Prices');
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search query and selected filters
  const filteredCourses = coursesData.filter(course => {
    // Search filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategory === 'All Categories' || course.category === selectedCategory;
    
    // Level filter
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    
    // Price filter
    let matchesPrice = true;
    if (selectedPrice === 'Under $50') {
      matchesPrice = course.price < 50;
    } else if (selectedPrice === '$50 - $70') {
      matchesPrice = course.price >= 50 && course.price <= 70;
    } else if (selectedPrice === '$70 - $100') {
      matchesPrice = course.price > 70 && course.price <= 100;
    } else if (selectedPrice === 'Over $100') {
      matchesPrice = course.price > 100;
    }
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  // No longer need modal state since we're using individual course pages
  // Navigation will be handled by direct links to course detail pages
  
  // No longer need modal functions
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
          Explore Our Courses
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Discover a wide range of high-quality courses taught by industry experts. 
          Find the perfect course to help you achieve your learning goals.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              placeholder="Search courses, instructors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Toggle Button (Mobile) */}
          <button 
            className="md:hidden flex items-center justify-center gap-2 bg-secondary text-white py-3 px-4 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filters
          </button>
          
          {/* Desktop Filters */}
          <div className="hidden md:flex gap-4">
            {/* Category Filter */}
            <select
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-primary focus:border-primary"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            {/* Level Filter */}
            <select
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-primary focus:border-primary"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            
            {/* Price Filter */}
            <select
              className="border border-gray-300 rounded-lg px-3 py-3 focus:ring-primary focus:border-primary"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
            >
              {priceRanges.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Mobile Filters */}
        {showFilters && (
          <div className="md:hidden flex flex-col gap-4 p-4 bg-light-gray rounded-lg mb-6">
            <h3 className="font-bold text-primary mb-2">Filters</h3>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceRanges.map(price => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {/* Results Count */}
        <div className="text-gray-700">
          Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
        </div>
      </section>

      {/* Courses Grid */}
      <section className="mb-16">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-xl overflow-hidden shadow-custom hover:shadow-lg transition-all duration-300 group"
              >
                {/* Course Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <Image 
                    src={course.image} 
                    alt={course.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-3 rounded-lg text-sm font-medium">
                    ${course.price}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center gap-2 text-white">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-white/80 text-sm">({course.students})</span>
                      </div>
                      <span className="mx-1">•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Course Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-secondary mb-3">
                    <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium">{course.category}</span>
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{course.level}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                      <Image 
                        src="/instructor-placeholder.jpg" 
                        alt={course.instructor}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <p className="text-gray-700 text-sm">{course.instructor}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {course.tags.map(tag => (
                      <span key={tag} className="bg-light-gray text-gray-700 px-3 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link 
                      href={`/courses/${course.id}`}
                      className="text-primary font-medium flex items-center gap-1 hover:underline"
                    >
                      View Details
                    </Link>
                    <Link 
                      href={`/courses/${course.id}`}
                      className="btn btn-primary flex items-center justify-center gap-1 px-4 py-2"
                    >
                      Enroll <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-light-gray rounded-xl">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-primary mb-2">No courses found</h3>
            <p className="text-gray-700 mb-6">Try adjusting your search or filter criteria</p>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedLevel('All Levels');
                setSelectedPrice('All Prices');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
      
      {/* Course details are now displayed on individual course pages */}

      {/* Call to Action */}
      <section className="bg-primary text-white rounded-xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-4">Become an Instructor</h2>
            <p className="text-lg mb-0 max-w-2xl">
              Share your knowledge and expertise with our global community of learners. 
              Create engaging courses and help others achieve their goals.
            </p>
          </div>
          <a href="/contact" className="btn btn-accent whitespace-nowrap flex-shrink-0">
            Apply Today
          </a>
        </div>
      </section>
    </div>
  );
}