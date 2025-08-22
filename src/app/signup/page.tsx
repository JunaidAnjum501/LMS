'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to login page with signup mode
    router.push('/login');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold text-primary mb-4">Redirecting to Sign Up...</h1>
        <p className="text-gray-700">Please wait while we redirect you to our sign up page.</p>
      </div>
    </div>
  );
}