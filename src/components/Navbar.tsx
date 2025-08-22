'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/logo.svg" 
                alt="LMS Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-heading font-bold text-xl text-primary">EduLearn</span>
            </Link>
          </div>
          
          {/* Navigation links positioned on the right */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-primary hover:text-primary">
                Home
              </Link>
              
              <Link href="/courses" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-primary hover:text-primary">
                Courses
              </Link>
              
              <Link href="/blog" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-primary hover:text-primary">
                Blog
              </Link>
              
              <Link href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-primary hover:text-primary">
                About
              </Link>
              
              <Link href="/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900 hover:border-primary hover:text-primary">
                Contact
              </Link>
              
              <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Log in
              </Link>
              
              <Link href="/signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Sign up
              </Link>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">
              Home
            </Link>
            <Link href="/courses" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">
              Courses
            </Link>
            <Link href="/blog" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">
              Blog
            </Link>
            <Link href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-primary hover:text-primary">
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Log in
                </Link>
              </div>
              <div className="ml-3">
                <Link href="/signup" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;