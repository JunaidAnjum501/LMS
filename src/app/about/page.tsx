"use client"
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, Award, Users, BookOpen, Clock, ChevronDown, ChevronUp, Play, Star, Globe, Shield, Heart } from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleTestimonial = (index:any) => {
    setExpandedTestimonial(expandedTestimonial === index ? null : index);
  };

  const toggleAccordion = (index:any) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Engineer",
      content: "This platform completely transformed my career. I went from knowing basic programming to landing my dream job at a tech company within 6 months. The project-based learning approach made all the difference.",
      expandedContent: "The instructors were always available to answer questions, and the community of learners provided incredible support. The career services team helped me polish my resume and prepare for interviews. I couldn't have done it without this platform!",
      rating: 5,
      avatar: "/images/testimonial-1.jpg"
    },
    {
      name: "Maria Rodriguez",
      role: "Graphic Designer",
      content: "As a working professional, I needed flexible learning options. The self-paced courses allowed me to upskill without putting my career on hold. The design courses are taught by industry leaders.",
      expandedContent: "What impressed me most was the quality of feedback from instructors. They didn't just grade assignments—they provided detailed critiques that helped me grow as a designer. The portfolio review session was particularly valuable for my career development.",
      rating: 5,
      avatar: "/images/testimonial-2.jpg"
    },
    {
      name: "James Wilson",
      role: "Data Analyst",
      content: "The data science program provided hands-on experience with real-world datasets. The capstone project became a talking point in all my interviews and helped me stand out from other candidates.",
      expandedContent: "The platform's learning resources were comprehensive, but what really set it apart was the community. Study groups formed organically, and the forum discussions were incredibly insightful. I'm still in touch with several classmates who are now colleagues in the industry.",
      rating: 4,
      avatar: "/images/testimonial-3.jpg"
    }
  ];

  const values = [
    {
      icon: <Heart size={32} />,
      title: "Student Success",
      description: "We measure our success by your achievements. Your goals become our priorities."
    },
    {
      icon: <Globe size={32} />,
      title: "Global Accessibility",
      description: "We're committed to breaking down barriers to education regardless of location or background."
    },
    {
      icon: <Shield size={32} />,
      title: "Quality First",
      description: "We never compromise on the quality of our content, instruction, or learning experience."
    }
  ];

  const faqs = [
    {
      question: "How do I choose the right course for me?",
      answer: "We offer career guidance quizzes and one-on-one consultations with learning advisors to help you select the perfect course based on your goals, background, and interests."
    },
    {
      question: "What kind of support can I expect during my learning journey?",
      answer: "You'll have access to instructors, teaching assistants, a dedicated student success team, and a community of peers. We provide technical support, career counseling, and learning resources throughout your journey."
    },
    {
      question: "Are the certificates recognized by employers?",
      answer: "Yes, our certificates are recognized by thousands of employers worldwide. We also partner with industry leaders to ensure our curriculum meets current market needs."
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely! While we have scheduled cohorts for some programs, most courses are self-paced with flexible deadlines to accommodate your schedule."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4">
              <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
              Transforming education since 2015
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Empowering Learners Through <span className="text-secondary">Innovative Education</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We're on a mission to transform education through technology, making quality learning accessible to everyone, everywhere. Our platform combines cutting-edge technology with pedagogical excellence to create transformative learning experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/courses" className="btn btn-primary flex items-center gap-2 group">
                Explore Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/contact" className="btn btn-outline-primary flex items-center gap-2">
                Contact Us
              </a>
            </div>
            <div className="flex items-center mt-8 gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative h-10 w-10 rounded-full border-2 border-white overflow-hidden">
                    <Image 
                      src={`/images/avatar-${item}.jpg`} 
                      alt={`User ${item}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Join 10,000+ learners</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span>4.9/5 from 2,200 reviews</span>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/images/about-hero.jpg" 
                alt="Students learning online"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 w-64 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-primary">Award Winning</h3>
                  <p className="text-sm text-gray-600">Best Online Platform 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Tabs */}
      <section className="mb-20">
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-4 px-6 font-medium text-lg ${activeTab === 'mission' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('mission')}
          >
            Our Mission
          </button>
          <button
            className={`py-4 px-6 font-medium text-lg ${activeTab === 'vision' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('vision')}
          >
            Our Vision
          </button>
          <button
            className={`py-4 px-6 font-medium text-lg ${activeTab === 'approach' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab('approach')}
          >
            Our Approach
          </button>
        </div>
        
        <div className="bg-light-gray rounded-xl p-8 md:p-12">
          {activeTab === 'mission' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                To democratize education by providing accessible, affordable, and high-quality learning experiences that empower individuals to achieve their full potential.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe that education is a fundamental right, not a privilege. Our platform breaks down barriers to learning, allowing anyone with an internet connection to access world-class educational content.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                  <span>Make quality education accessible to all regardless of geographic or socioeconomic barriers</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                  <span>Provide learning paths that adapt to individual needs and goals</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary rounded-full p-1 mt-1 mr-3">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                  <span>Bridge the gap between academia and industry requirements</span>
                </li>
              </ul>
            </div>
          )}
          
          {activeTab === 'vision' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-4">
                To create a global learning ecosystem where knowledge flows freely, connecting learners with expert educators and fostering communities of practice across disciplines.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We envision a world where continuous learning is integrated into everyday life, where curiosity is celebrated, and where education adapts to the needs of each individual learner.
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r">
                <p className="italic text-primary font-medium">
                  "We're building a future where anyone, anywhere can transform their life through education"
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'approach' && (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Learning Approach</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our pedagogy is built on three core principles that differentiate the learning experience we provide:
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Project-Based Learning</h3>
                  <p className="text-gray-600">Learn by doing with real-world projects that build portfolio-ready work</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Community-Driven</h3>
                  <p className="text-gray-600">Join a supportive network of peers and mentors for collaborative learning</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary mb-4">
                    <Clock size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Flexible & Self-Paced</h3>
                  <p className="text-gray-600">Learn on your schedule with resources available 24/7</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Our Impact in Numbers</h2>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          These numbers tell a story of growth, community, and transformative learning experiences
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-secondary">
              <Users size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">10K+</h3>
            <p className="text-gray-700">Active Students</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-secondary">
              <BookOpen size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">200+</h3>
            <p className="text-gray-700">Courses</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-secondary">
              <Award size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
            <p className="text-gray-700">Expert Instructors</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4 text-secondary">
              <Clock size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">15K+</h3>
            <p className="text-gray-700">Hours of Content</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Our Core Values</h2>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          These principles guide everything we do, from course design to student support
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-primary mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Members */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our diverse team of educators, technologists, and learning designers are passionate about creating exceptional educational experiences.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 group">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-1.jpg" 
                alt="Sarah Johnson" 
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">Sarah Johnson</h3>
              <p className="text-secondary mb-3">CEO & Founder</p>
              <p className="text-gray-700 text-sm">
                Former education policy advisor with a passion for making learning accessible to all.
              </p>
              <div className="flex mt-4 space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Team Member 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 group">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-2.jpg" 
                alt="David Chen" 
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">David Chen</h3>
              <p className="text-secondary mb-3">CTO</p>
              <p className="text-gray-700 text-sm">
                Tech innovator with 15+ years experience building educational platforms at scale.
              </p>
              <div className="flex mt-4 space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Team Member 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 group">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-3.jpg" 
                alt="Maria Rodriguez" 
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">Maria Rodriguez</h3>
              <p className="text-secondary mb-3">Head of Content</p>
              <p className="text-gray-700 text-sm">
                Curriculum expert with a background in instructional design and educational psychology.
              </p>
              <div className="flex mt-4 space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Team Member 4 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105 group">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-4.jpg" 
                alt="James Wilson" 
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">James Wilson</h3>
              <p className="text-secondary mb-3">Head of Student Success</p>
              <p className="text-gray-700 text-sm">
                Former university professor dedicated to creating supportive learning environments.
              </p>
              <div className="flex mt-4 space-x-3">
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="/careers" className="btn btn-outline-primary inline-flex items-center">
            View Open Positions <ArrowRight size={18} className="ml-2" />
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">What Our Students Say</h2>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Don't just take our word for it - hear from our community of learners
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-primary">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-4">
                {expandedTestimonial === index 
                  ? testimonial.content + " " + testimonial.expandedContent
                  : testimonial.content
                }
              </p>
              
              <button 
                onClick={() => toggleTestimonial(index)}
                className="text-primary font-medium flex items-center text-sm"
              >
                {expandedTestimonial === index ? (
                  <>
                    Read less <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Frequently Asked Questions</h2>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Find answers to common questions about our platform and learning experience
        </p>
        
        <div className="max-w-7xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 py-5">
              <button
                className="flex justify-between items-center w-full text-left font-medium text-lg text-primary"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                {activeAccordion === index ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {activeAccordion === index && (
                <div className="mt-3 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl p-8 md:p-12 text-center mb-20">
        <h2 className="text-3xl font-heading font-bold mb-6">Start Your Learning Journey Today</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Whether you're looking to learn new skills, advance your career, or explore your passions, our platform provides the resources and support you need to succeed.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/courses" className="btn btn-white flex items-center gap-2 group">
            Browse Courses <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/signup" className="btn btn-outline-white flex items-center gap-2">
            Sign Up Today
          </a>
        </div>
      </section>
    </div>
  );
}