'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Eye, EyeOff, Mail, Lock, Users, GraduationCap, Briefcase,
} from 'lucide-react';

type UserRole = 'student' | 'teacher' | 'parent';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  studentId?: string;
  phone?: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    studentId: '',
    phone: ''
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must include uppercase, lowercase, and a number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'parent' && !formData.studentId?.trim()) {
      newErrors.studentId = 'Student ID is required for parent registration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: formData.role === 'admin' ? 'student' : formData.role
        })
      });

      if (response.ok) {
        router.push('/login?registered=true');
      } else {
        const data = await response.json();
        setErrors({ general: data.message || 'Registration failed' });
      }
    } catch {
      setErrors({ general: 'An error occurred during registration' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const roleConfig = {
    student: {
      icon: GraduationCap,
      label: 'Student',
      description: 'Access courses and track progress',
    },
    teacher: {
      icon: Briefcase,
      label: 'Teacher',
      description: 'Create and manage courses',
    },
    parent: {
      icon: Users,
      label: 'Parent',
      description: 'Monitor your child’s learning',
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="text-gray-600 mt-1">Join our learning platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Role</label>
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(roleConfig) as UserRole[]).map(role => {
                const { icon: Icon, label, description } = roleConfig[role];
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role }))}
                    className={`p-4 rounded-lg border-2 text-center transition ${
                      formData.role === role
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="mx-auto mb-2 text-blue-600" />
                    <h3 className="font-medium">{label}</h3>
                    <p className="text-xs text-gray-500">{description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            {['firstName', 'lastName'].map((field, i) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {i === 0 ? 'First Name' : 'Last Name'}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field as 'firstName' | 'lastName']}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors[field] ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={i === 0 ? 'John' : 'Doe'}
                />
                {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-2 border rounded-md ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-2 gap-4">
            {['password', 'confirmPassword'].map((field, i) => {
              const isVisible = i === 0 ? showPassword : showConfirmPassword;
              const setVisible = i === 0 ? setShowPassword : setShowConfirmPassword;

              return (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {i === 0 ? 'Password' : 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type={isVisible ? 'text' : 'password'}
                      name={field}
                      value={formData[field as 'password' | 'confirmPassword']}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 border rounded-md ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setVisible(!isVisible)}
                      className="absolute right-3 top-3"
                    >
                      {isVisible ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              );
            })}
          </div>

          {/* Student ID for parents */}
          {formData.role === 'parent' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student ID (Child's ID)
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.studentId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="STU-12345"
              />
              {errors.studentId && (
                <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Required to link to your child’s profile
              </p>
            </div>
          )}

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* General error */}
          {errors.general && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded p-3 text-sm">
              {errors.general}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
