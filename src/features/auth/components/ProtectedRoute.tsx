import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { UserRole } from '../models/User';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, loading } = useAuth();
  
  // Show loading or splash screen while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-600 border-r-blue-600 border-b-slate-200 border-l-slate-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user role doesn't match required role, redirect to appropriate dashboard
  if (user.role !== requiredRole) {
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'organizer') {
      return <Navigate to="/organizer/dashboard" replace />;
    } else {
      return <Navigate to="/archer/dashboard" replace />;
    }
  }
  
  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;