import React from 'react';
import LeftPanel from './LeftPanel';
import { Link, useLocation } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="h-full w-full flex">
      {/* Left Panel */}
      <div className="w-2/5 h-full bg-black flex items-center justify-center">
        <LeftPanel />
      </div>

      {/* Right Panel */}
      <div className="w-3/5 h-full bg-gray-50 flex flex-col justify-center items-center p-8">
        <h2 className="text-3xl font-semibold mb-3">{title}</h2>
        <hr className="w-full max-w-lg mb-3" />
        <div className="w-full max-w-lg">
          {children}
        </div>
        <hr className="w-full max-w-lg mt-3" />
        <div className="text-center mt-3">
          {isLoginPage ? (
            <p>
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800">
                Create an account
              </Link>
            </p>
          ) : (
            <p>
              Already Have an Account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Log In
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
