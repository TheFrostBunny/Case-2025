import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAppSelector(s => s.auth);
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>; 
}
