import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <>{children}</>;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
