import { ReactNode, useContext } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <AiOutlineLoading3Quarters className="w-28 h-28 animate-spin" />
      </div>
    );
  } else if (!loading && currentUser) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
