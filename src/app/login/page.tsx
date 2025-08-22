'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();

  // Login/Signup toggle
  const [isLogin, setIsLogin] = useState(true);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student'
  });

  // Show/hide password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form status
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (isLogin) {
      // Login validation
      if (!formData.email || !formData.password) {
        setFormStatus({
          submitted: true,
          success: false,
          message: 'Please enter both email and password.'
        });
        return;
      }
    } else {
      // Signup validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setFormStatus({
          submitted: true,
          success: false,
          message: 'Please fill in all required fields.'
        });
        return;
      }

      // Password match validation
      if (formData.password !== formData.confirmPassword) {
        setFormStatus({
          submitted: true,
          success: false,
          message: 'Passwords do not match.'
        });
        return;
      }

      // Password strength validation
      if (formData.password.length < 8) {
        setFormStatus({
          submitted: true,
          success: false,
          message: 'Password must be at least 8 characters long.'
        });
        return;
      }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    // Simulate form submission success
    setFormStatus({
      submitted: true,
      success: true,
      message: isLogin ? 'Login successful! Redirecting...' : 'Account created successfully! Please check your email to verify your account.'
    });

    // Redirect to dashboard after successful login
    if (isLogin) {
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="text-gray-700">
              {isLogin ? 'Sign in to access your account' : 'Join our learning community today'}
            </p>
          </div>
          
          {/* Form Status Message */}
          {formStatus.submitted && (
            <div className={`p-4 mb-6 rounded-lg ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {formStatus.message}
            </div>
          )}
          
          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field (Signup only) */}
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
                  placeholder="John Doe"
                  required={!isLogin}
                />
              </div>
            )}
            
            {/* Email Field */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 border border-gray-300 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirm Password Field (Signup only) */}
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 border border-gray-300 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary"
                    placeholder="••••••••"
                    required={!isLogin}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {/* User Role Selection (Signup only) */}
            {!isLogin && (
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:ring-primary focus:border-primary appearance-none"
                    required
                  >
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
            )}

            {/* Forgot Password Link (Login only) */}
            {isLogin && (
              <div className="flex justify-end mb-6">
                <a href="/forgot-password" className="text-sm text-secondary hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary w-full flex items-center justify-center gap-2 mb-6"
            >
              {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
            </button>
            
            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            
            {/* Google Login Button */}
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Image 
                src="/images/google-logo.svg" 
                alt="Google logo" 
                width={20} 
                height={20} 
              />
              Continue with Google
            </button>
          </form>
          
          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center">
            <p className="text-gray-700">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button 
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormStatus({
                    submitted: false,
                    success: false,
                    message: ''
                  });
                }}
                className="ml-2 text-secondary hover:underline font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
