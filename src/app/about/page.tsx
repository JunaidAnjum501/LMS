import Image from 'next/image';
import { ArrowRight, Award, Users, BookOpen, Clock } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              About Our Learning Platform
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              We're on a mission to transform education through technology, making quality learning accessible to everyone, everywhere.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/courses" className="btn btn-primary flex items-center gap-2">
                Explore Courses <ArrowRight size={18} />
              </a>
              <a href="/contact" className="btn btn-secondary flex items-center gap-2">
                Contact Us
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative h-[400px] w-full rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="/images/about-hero.jpg" 
              alt="Students learning online"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-20 bg-light-gray rounded-xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              To democratize education by providing accessible, affordable, and high-quality learning experiences that empower individuals to achieve their full potential.
            </p>
            <p className="text-lg text-gray-700">
              We believe that education is a fundamental right, not a privilege. Our platform breaks down barriers to learning, allowing anyone with an internet connection to access world-class educational content.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-4">
              To create a global learning ecosystem where knowledge flows freely, connecting learners with expert educators and fostering communities of practice across disciplines.
            </p>
            <p className="text-lg text-gray-700">
              We envision a world where continuous learning is integrated into everyday life, where curiosity is celebrated, and where education adapts to the needs of each individual learner.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold text-center text-primary mb-12">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-4 text-secondary">
              <Users size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">10K+</h3>
            <p className="text-gray-700">Active Students</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-4 text-secondary">
              <BookOpen size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">200+</h3>
            <p className="text-gray-700">Courses</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-4 text-secondary">
              <Award size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">50+</h3>
            <p className="text-gray-700">Expert Instructors</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center mb-4 text-secondary">
              <Clock size={40} />
            </div>
            <h3 className="text-4xl font-bold text-primary mb-2">15K+</h3>
            <p className="text-gray-700">Hours of Content</p>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="mb-20">
        <h2 className="text-3xl font-heading font-bold text-center text-primary mb-4">Meet Our Team</h2>
        <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
          Our diverse team of educators, technologists, and learning designers are passionate about creating exceptional educational experiences.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-1.jpg" 
                alt="Sarah Johnson" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">Sarah Johnson</h3>
              <p className="text-secondary mb-3">CEO & Founder</p>
              <p className="text-gray-700 text-sm">
                Former education policy advisor with a passion for making learning accessible to all.
              </p>
            </div>
          </div>
          
          {/* Team Member 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-2.jpg" 
                alt="David Chen" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">David Chen</h3>
              <p className="text-secondary mb-3">CTO</p>
              <p className="text-gray-700 text-sm">
                Tech innovator with 15+ years experience building educational platforms at scale.
              </p>
            </div>
          </div>
          
          {/* Team Member 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-3.jpg" 
                alt="Maria Rodriguez" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">Maria Rodriguez</h3>
              <p className="text-secondary mb-3">Head of Content</p>
              <p className="text-gray-700 text-sm">
                Curriculum expert with a background in instructional design and educational psychology.
              </p>
            </div>
          </div>
          
          {/* Team Member 4 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105">
            <div className="relative h-64 w-full">
              <Image 
                src="/images/team-4.jpg" 
                alt="James Wilson" 
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-primary mb-1">James Wilson</h3>
              <p className="text-secondary mb-3">Head of Student Success</p>
              <p className="text-gray-700 text-sm">
                Former university professor dedicated to creating supportive learning environments.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="bg-primary text-white rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-heading font-bold mb-6">Join Our Learning Community</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Whether you're looking to learn new skills, advance your career, or explore your passions, our platform provides the resources and support you need to succeed.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/courses" className="btn btn-white flex items-center gap-2">
            Browse Courses <ArrowRight size={18} />
          </a>
          <a href="/signup" className="btn btn-outline-white flex items-center gap-2">
            Sign Up Today
          </a>
        </div>
      </section>
    </div>
  );
}