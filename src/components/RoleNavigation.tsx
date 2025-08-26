'use client';

import { useRouter } from 'next/navigation';
import { Users, BookOpen, User, Shield, Home } from 'lucide-react';

interface RoleNavigationProps {
  currentRole: string;
  onRoleChange: (role: string) => void;
}

export default function RoleNavigation({ currentRole, onRoleChange }: RoleNavigationProps) {
  const router = useRouter();

  const roles = [
    {
      id: 'student',
      label: 'Student Dashboard',
      icon: User,
      path: '/dashboard/student',
      description: 'View courses, assignments, and progress'
    },
    {
      id: 'instructor',
      label: 'Instructor Dashboard',
      icon: BookOpen,
      path: '/dashboard/instructor',
      description: 'Manage courses, students, and grading'
    },
    {
      id: 'parent',
      label: 'Parent Dashboard',
      icon: Users,
      path: '/dashboard/parent',
      description: 'Monitor child progress and communicate'
    },
    {
      id: 'admin',
      label: 'Admin Dashboard',
      icon: Shield,
      path: '/dashboard/admin',
      description: 'System management and analytics'
    }
  ];

  const handleRoleChange = (roleId: string) => {
    onRoleChange(roleId);
    const role = roles.find(r => r.id === roleId);
    if (role) {
      router.push(role.path);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Role-Based Navigation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              onClick={() => handleRoleChange(role.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                currentRole === role.id
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Icon className="h-8 w-8 mb-2 text-primary" />
                <h4 className="font-medium text-gray-900 mb-1">{role.label}</h4>
                <p className="text-xs text-gray-600">{role.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}