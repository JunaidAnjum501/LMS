'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, User, Clock, Tag, ArrowRight } from 'lucide-react';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Online Learning: Trends to Watch in 2023',
    excerpt: 'Explore the emerging trends in e-learning that are shaping the future of education and how they might impact your learning journey.',
    author: 'Sarah Johnson',
    date: 'June 15, 2023',
    readTime: '8 min read',
    category: 'Education',
    tags: ['E-Learning', 'EdTech', 'Future Trends'],
    image: '/images/blog-1.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'How to Stay Motivated During Your Online Course',
    excerpt: 'Maintaining motivation during self-paced online learning can be challenging. Discover practical strategies to stay engaged and complete your courses.',
    author: 'David Chen',
    date: 'May 28, 2023',
    readTime: '6 min read',
    category: 'Learning Tips',
    tags: ['Motivation', 'Study Tips', 'Online Learning'],
    image: '/images/blog-2.jpg',
    featured: false
  },
  {
    id: 3,
    title: 'The Benefits of Project-Based Learning in Technical Courses',
    excerpt: 'Learn how project-based learning approaches can enhance your technical skills and prepare you for real-world challenges in the workplace.',
    author: 'Michael Brown',
    date: 'May 12, 2023',
    readTime: '10 min read',
    category: 'Teaching Methods',
    tags: ['Project-Based Learning', 'Technical Skills', 'Practical Learning'],
    image: '/images/blog-3.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'From Beginner to Pro: A Web Developer\'s Journey',
    excerpt: 'Follow the inspiring journey of a self-taught web developer who transitioned from a non-technical background to a successful career in tech.',
    author: 'Emily Zhang',
    date: 'April 30, 2023',
    readTime: '12 min read',
    category: 'Success Stories',
    tags: ['Career Change', 'Web Development', 'Learning Path'],
    image: '/images/blog-4.jpg',
    featured: true
  },
  {
    id: 5,
    title: 'The Role of AI in Personalized Learning Experiences',
    excerpt: 'Discover how artificial intelligence is revolutionizing education by creating customized learning experiences tailored to individual needs.',
    author: 'James Wilson',
    date: 'April 15, 2023',
    readTime: '9 min read',
    category: 'Technology',
    tags: ['AI', 'Personalized Learning', 'EdTech'],
    image: '/images/blog-5.jpg',
    featured: false
  },
  {
    id: 6,
    title: 'Essential Soft Skills Every Technical Professional Should Develop',
    excerpt: 'Technical skills alone aren\'t enough in today\'s workplace. Learn about the crucial soft skills that can accelerate your career growth.',
    author: 'Lisa Thompson',
    date: 'March 28, 2023',
    readTime: '7 min read',
    category: 'Career Development',
    tags: ['Soft Skills', 'Professional Development', 'Career Growth'],
    image: '/images/blog-6.jpg',
    featured: false
  },
];

// Available categories and tags for filtering
const categories = ['All Categories', 'Education', 'Learning Tips', 'Teaching Methods', 'Success Stories', 'Technology', 'Career Development'];
const tags = ['All Tags', 'E-Learning', 'EdTech', 'Future Trends', 'Motivation', 'Study Tips', 'Online Learning', 'Project-Based Learning', 'Technical Skills', 'Practical Learning', 'Career Change', 'Web Development', 'Learning Path', 'AI', 'Personalized Learning', 'Soft Skills', 'Professional Development', 'Career Growth'];

export default function BlogPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedTag, setSelectedTag] = useState('All Tags');

  // Filter blog posts based on search query and filters
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    const matchesTag = selectedTag === 'All Tags' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Get featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Our Blog
          </h1>
          <p className="text-lg text-gray-700">
            Insights, tips, and stories about online education, learning strategies, and career development.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-primary mb-8">Featured Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map(post => (
            <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-custom group hover:shadow-lg transition-shadow">
              <div className="relative h-64 w-full">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <div className="flex items-center mr-4">
                    <User size={16} className="mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center mr-4">
                    <Calendar size={16} className="mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <Link href={`/blog/${post.id}`} className="btn btn-primary inline-flex items-center">
                  Read More <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mb-10">
        <div className="bg-light-gray p-6 rounded-xl">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-primary focus:border-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Tag Filter */}
            <div>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-primary focus:border-primary"
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
              >
                {tags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="text-gray-700">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </div>
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="mb-16">
        <h2 className="text-2xl font-heading font-bold text-primary mb-8">All Articles</h2>
        
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-custom group hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image 
                    src={post.image} 
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.id}`} className="text-primary font-medium flex items-center hover:underline">
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-light-gray rounded-xl">
            <h3 className="text-xl font-bold text-primary mb-2">No articles found</h3>
            <p className="text-gray-700 mb-6">Try adjusting your search or filter criteria</p>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Categories');
                setSelectedTag('All Tags');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="mb-16">
        <div className="bg-primary text-white rounded-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg mb-0 max-w-2xl">
                Stay updated with our latest articles, learning resources, and course announcements.
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 border border-white/20"
                  required
                />
                <button type="submit" className="btn bg-white text-primary hover:bg-gray-100 whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}