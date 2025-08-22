import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, Star, CheckCircle, Calendar, Clock, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Unlock Your Potential with Online Learning
            </h1>
            <p className="text-xl mb-8">
              Access high-quality courses taught by industry experts and advance your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses" className="btn btn-accent">
                Explore Courses
              </Link>
              <Link href="/login" className="btn bg-white text-primary hover:bg-gray-100">
                Sign Up Free
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/hero-image.svg"
              alt="Online Learning"
              width={500}
              height={400}
              className="rounded-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular courses and start learning today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <div className="bg-white rounded-lg shadow-custom overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/course1.jpg"
                  alt="Web Development"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded">
                  $49.99
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2">Complete Web Development Bootcamp</h3>
                <p className="text-gray-600 mb-4">Learn HTML, CSS, JavaScript, React and Node.js from scratch</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#FBBF24" />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">(128 reviews)</span>
                </div>
                <Link href="/courses/web-development" className="btn btn-primary w-full">
                  Enroll Now
                </Link>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-white rounded-lg shadow-custom overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/course2.jpg"
                  alt="Data Science"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded">
                  $59.99
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2">Data Science Fundamentals</h3>
                <p className="text-gray-600 mb-4">Master Python, statistics, machine learning and data visualization</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#FBBF24" />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">(95 reviews)</span>
                </div>
                <Link href="/courses/data-science" className="btn btn-primary w-full">
                  Enroll Now
                </Link>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-white rounded-lg shadow-custom overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-48">
                <Image
                  src="/course3.jpg"
                  alt="Digital Marketing"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-2 py-1 rounded">
                  Free
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold mb-2">Digital Marketing Essentials</h3>
                <p className="text-gray-600 mb-4">Learn SEO, social media marketing, email campaigns and analytics</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} size={16} fill="#FBBF24" />
                    ))}
                    <Star size={16} />
                  </div>
                  <span className="text-gray-600 ml-2">(76 reviews)</span>
                </div>
                <Link href="/courses/digital-marketing" className="btn btn-primary w-full">
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/courses" className="btn btn-primary inline-flex items-center">
              View All Courses
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best online learning experience with a range of features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-lg shadow-custom text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals with years of experience in their fields.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-lg shadow-custom text-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Community Support</h3>
              <p className="text-gray-600">
                Join a community of learners and get help whenever you need it.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-lg shadow-custom text-center">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={32} className="text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">Certificates</h3>
              <p className="text-gray-600">
                Earn recognized certificates upon completion of our courses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our students about their learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-custom">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FBBF24" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The web development course was comprehensive and well-structured. I went from knowing nothing to building my own websites in just a few weeks!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/testimonial1.jpg"
                    alt="Sarah Johnson"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Web Developer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-custom">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FBBF24" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The data science course helped me transition into a new career. The instructors were knowledgeable and the projects were practical and relevant."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/testimonial2.jpg"
                    alt="Michael Chen"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">Data Analyst</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-custom">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={16} fill="#FBBF24" />
                ))}
                <Star size={16} />
              </div>
              <p className="text-gray-600 mb-6">
                "The digital marketing course was exactly what I needed to grow my small business. I've implemented the strategies and seen real results!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/testimonial3.jpg"
                    alt="Emily Rodriguez"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold">Emily Rodriguez</h4>
                  <p className="text-gray-600 text-sm">Small Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Our Impact in Numbers</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their careers with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15,000+</div>
              <div className="text-xl font-heading">Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-xl font-heading">Courses</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl font-heading">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-xl font-heading">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our live webinars, workshops and Q&A sessions with industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Event 1 */}
            <div className="bg-white rounded-lg shadow-custom overflow-hidden">
              <div className="p-6">
                <div className="flex items-center text-primary mb-4">
                  <Calendar size={20} className="mr-2" />
                  <span>June 15, 2023 • 2:00 PM EST</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Web Development Trends in 2023</h3>
                <p className="text-gray-600 mb-4">
                  Learn about the latest trends and technologies in web development from industry experts.
                </p>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/instructor1.jpg"
                      alt="John Smith"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm text-gray-500">Senior Web Developer</p>
                  </div>
                </div>
                <button className="btn btn-primary w-full">Register Now</button>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white rounded-lg shadow-custom overflow-hidden">
              <div className="p-6">
                <div className="flex items-center text-primary mb-4">
                  <Calendar size={20} className="mr-2" />
                  <span>June 22, 2023 • 1:00 PM EST</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Data Science Career Paths</h3>
                <p className="text-gray-600 mb-4">
                  Discover various career paths in data science and how to prepare for them effectively.
                </p>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/instructor2.jpg"
                      alt="Emily Johnson"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Emily Johnson</p>
                    <p className="text-sm text-gray-500">Data Scientist</p>
                  </div>
                </div>
                <button className="btn btn-primary w-full">Register Now</button>
              </div>
            </div>

            {/* Event 3 */}
            <div className="bg-white rounded-lg shadow-custom overflow-hidden">
              <div className="p-6">
                <div className="flex items-center text-primary mb-4">
                  <Calendar size={20} className="mr-2" />
                  <span>June 30, 2023 • 3:00 PM EST</span>
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Digital Marketing Masterclass</h3>
                <p className="text-gray-600 mb-4">
                  A comprehensive overview of digital marketing strategies that drive results.
                </p>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/instructor3.jpg"
                      alt="Michael Brown"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Michael Brown</p>
                    <p className="text-sm text-gray-500">Marketing Director</p>
                  </div>
                </div>
                <button className="btn btn-primary w-full">Register Now</button>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/events" className="btn btn-outline-primary inline-flex items-center">
              View All Events
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-secondary to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of students who have already transformed their careers with our courses.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/courses" className="btn btn-accent">
              Explore Courses
            </Link>
            <Link href="/signup" className="btn bg-white text-primary hover:bg-gray-100">
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
