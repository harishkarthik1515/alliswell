import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { Button } from '../ui/Button';
import { db } from '../../Firebase'; // Adjust the path to your Firebase setup file
import { collection, doc, getDoc, query, where, getDocs, setDoc } from 'firebase/firestore'; // Added setDoc for signup
import { toast, ToastContainer } from 'react-toastify'; // Importing react-toastify

type AuthMode = 'login' | 'signup';

export const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
  const [username, setUsername] = useState(''); // New state for username
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reference to the Firestore users collection
    const usersRef = collection(db, 'users');

    if (mode === 'login') {
      // Login: Check if the user exists in the users collection
      const userDocRef = doc(usersRef, username);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const storedPassword = userDoc.data().password;

        // Check if the entered password matches the stored password
        if (storedPassword === password) {
          console.log('User logged in:', { email, username });

          // Show success notification and navigate after a delay
          toast.promise(
            new Promise((resolve) => {
              resolve('Login successful!');
            }),
            {
              pending: 'Logging you in...',
              success: 'Login successful!',
              error: 'Login failed!',
            }
          ).then(() => {
            // Navigate to the homepage after successful login
            navigate('/'); // This will navigate to the home page
          });
        } else {
          console.log('Incorrect password');
          toast.error('Incorrect password. Please try again.'); // Show error notification
        }
      } else {
        console.log('User not found');
        toast.error('User not found. Please sign up!'); // Show error notification
      }
    } else {
      // Signup: Check if the username or email already exists
      const usernameQuery = query(usersRef, where('username', '==', username));
      const emailQuery = query(usersRef, where('email', '==', email));

      // Check if username already exists
      const usernameSnapshot = await getDocs(usernameQuery);
      if (!usernameSnapshot.empty) {
        toast.error('Username already exists. Please choose a different one.'); // Show username conflict notification
        return;
      }

      // Check if email already exists
      const emailSnapshot = await getDocs(emailQuery);
      if (!emailSnapshot.empty) {
        toast.error('Email already exists. Please use a different email address.'); // Show email conflict notification
        return;
      }

      // Validate password
      if (password !== confirmPassword) {
        toast.error('Passwords do not match. Please confirm your password.');
        return;
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return;
      }

      // Create a new user document in the users collection
      const newUserDocRef = doc(usersRef, username);
      await setDoc(newUserDocRef, {
        email,
        password, // You might want to hash the password before storing it
        username,
        createdAt: new Date(),
      });

      console.log('User signed up:', { email, username });
      toast.success('Signup successful! Please log in.'); // Show success notification
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Username field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
          />
        </div>
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
        {mode === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-pink-500"
            />
          </div>
        )}
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

      {/* Toast Container for showing notifications */}
      <ToastContainer />
    </div>
  );
};
