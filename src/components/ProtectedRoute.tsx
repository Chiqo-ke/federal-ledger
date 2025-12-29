import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'super_admin' | 'ministry_admin' | 'ministry_officer' | 'citizen';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Check role hierarchy: super_admin can access everything
    if (user?.role !== 'super_admin') {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
