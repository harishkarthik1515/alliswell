import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm />
      </div>
    </div>
  );
};