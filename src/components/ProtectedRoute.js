import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requireAuth, sequentialAccessRequired, redirectTo }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const canAccessSequentially = useSelector((state) => state.navigation.canAccessSequentially);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

//   if (sequentialAccessRequired && !canAccessSequentially) {
//     return <Navigate to={redirectTo} replace />;
//   }

  return children;
};

export default ProtectedRoute;