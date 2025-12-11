import { Navigate, Outlet } from 'react-router-dom';
import { Rol } from '../types/auth';
import { useAuth } from '../../hooks/useAuth';

interface RoleGuardProps {
  roles: Rol[];
}

const RoleGuard = ({ roles }: RoleGuardProps) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.rol)) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default RoleGuard;
