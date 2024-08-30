import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import AuthLayout from '../components/layout/AuthLayout';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('User logged in');
    navigate('/dashboard'); // Redirect to the dashboard or another page after successful login
  };

  return (
    <AuthLayout title="Log in to your Account">
      <div className="space-y-4">
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-blue-600">Forgot Password?</a>
        </div>
        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Log in
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
