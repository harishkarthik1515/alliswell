import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { db } from '../../Firebase'; // Adjust the path to your Firebase setup
import { collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore'; // Firestore functions
import { toast, ToastContainer } from 'react-toastify'; // Importing react-toastify for notifications

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // For signup
  const [mode, setMode] = useState<'login' | 'signup'>('login'); // Track login/signup mode
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const adminsRef = collection(db, 'admins'); // Reference to the admins collection

    if (mode === 'login') {
      // Login: Check if the admin exists in Firestore
      const adminQuery = query(adminsRef, where('email', '==', email));
      const querySnapshot = await getDocs(adminQuery);

      if (!querySnapshot.empty) {
        const adminData = querySnapshot.docs[0].data();
        if (adminData.password === password) {
          // Password matches, proceed to admin dashboard
          navigate('/admin');
          toast.success('Login successful!');
        } else {
          toast.error('Incorrect password.');
        }
      } else {
        toast.error('Admin not found.');
      }
    } else {
      // Signup: Check if email already exists
      const adminQuery = query(adminsRef, where('email', '==', email));
      const querySnapshot = await getDocs(adminQuery);

      if (!querySnapshot.empty) {
        toast.error('Email already exists. Please log in.');
        return;
      }

      // Proceed with signup
      const newAdminRef = doc(adminsRef, username); // Use username as the document ID
      await setDoc(newAdminRef, {
        email,
        password,
        username,
      });

      toast.success('Signup successful! Please log in.');
      setMode('login'); // Switch to login mode after signup
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {mode === 'login' ? 'Admin Login' : 'Admin Signup'}
        </h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === 'signup' && (
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
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            )}
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
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
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <Button type="submit" className="w-full">
              {mode === 'login' ? 'Sign in' : 'Sign up'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-pink-500 hover:text-pink-600"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
