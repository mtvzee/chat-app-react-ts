import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: ReactNode }) => {
  return <Navigate to="/" />;
  return <>{children}</>;
};

export default PublicRoute;
