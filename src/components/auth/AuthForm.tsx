import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

type AuthMode = 'login' | 'signup';

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication
    console.log('Form submitted:', { email, password, mode });
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
          />
        </div>
        <Button type="submit" className="w-full">
          {mode === 'login' ? 'Sign in' : 'Sign up'}
        </Button>
      </form>
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="text-sm text-pink-500 hover:text-pink-600"
        >
          {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </button>
      </div>
      <div className="mt-4 text-center">
        <Link to="/admin-login" className="text-sm text-gray-500 hover:text-pink-500">
          Admin Login
        </Link>
      </div>
    </div>
  );
};