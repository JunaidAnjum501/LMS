'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700">
            Have questions about our courses or need assistance? We're here to help.
            Fill out the form below or use our contact information to reach out to us.
          </p>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="mb-20">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <div className="lg:w-1/3">
            <div className="bg-light-gray p-8 rounded-xl h-full">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Our Location</h3>
                    <p className="text-gray-600">123 Education St, Learning City, ED 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Email Us</h3>
                    <p className="text-gray-600">info@edulearn.com</p>
                    <p className="text-gray-600">support@edulearn.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary text-white p-3 rounded-full mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Call Us</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-bold text-gray-800 mb-3">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 rounded-xl shadow-custom">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Send Us a Message</h2>
              
              {formStatus.submitted && (
                <div className={`p-4 rounded-lg mb-6 ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {formStatus.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-full md:w-auto flex items-center justify-center gap-2"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-20">
        <div className="bg-white rounded-xl overflow-hidden shadow-custom">
          <div className="relative h-[400px] w-full">
            <Image 
              src="/images/map.jpg" 
              alt="Office Location Map"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-heading font-bold text-primary mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-700">
            Find answers to common questions about our courses, platform, and services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-light-gray p-6 rounded-xl">
            <h3 className="text-xl font-bold text-primary mb-3">How do I enroll in a course?</h3>
            <p className="text-gray-700">
              To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the "Enroll Now" button. You'll be guided through the registration and payment process.
            </p>
          </div>
          
          <div className="bg-light-gray p-6 rounded-xl">
            <h3 className="text-xl font-bold text-primary mb-3">What payment methods do you accept?</h3>
            <p className="text-gray-700">
              We accept all major credit cards, PayPal, and bank transfers. For corporate training, we also offer invoice-based payments.
            </p>
          </div>
          
          <div className="bg-light-gray p-6 rounded-xl">
            <h3 className="text-xl font-bold text-primary mb-3">Can I get a refund if I'm not satisfied?</h3>
            <p className="text-gray-700">
              Yes, we offer a 30-day money-back guarantee for most of our courses. If you're not satisfied with your purchase, please contact our support team within 30 days of enrollment.
            </p>
          </div>
          
          <div className="bg-light-gray p-6 rounded-xl">
            <h3 className="text-xl font-bold text-primary mb-3">How long do I have access to a course?</h3>
            <p className="text-gray-700">
              Once enrolled, you have lifetime access to the course materials, including any future updates. You can learn at your own pace and revisit the content whenever you need.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}