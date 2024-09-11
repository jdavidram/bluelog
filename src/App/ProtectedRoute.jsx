import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Context/UserContext'; 

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to="/" />; 
};

export { ProtectedRoute };