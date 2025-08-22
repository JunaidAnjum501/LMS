import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">EduLearn</h3>
            <p className="text-gray-400 mb-4">
              Providing high-quality online education to help you advance your career and achieve your goals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Course Categories */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Course Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses/web-development" className="text-gray-400 hover:text-white">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses/data-science" className="text-gray-400 hover:text-white">
                  Data Science
                </Link>
              </li>
              <li>
                <Link href="/courses/digital-marketing" className="text-gray-400 hover:text-white">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/courses/mobile-development" className="text-gray-400 hover:text-white">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link href="/courses/ui-ux-design" className="text-gray-400 hover:text-white">
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Education St, Learning City, ED 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">info@edulearn.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} EduLearn. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;