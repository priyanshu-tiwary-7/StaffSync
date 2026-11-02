import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // 1. Get the token and user from local storage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // 2. If no token, kick them back to the login page
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If they are logged in but don't have the right role, kick them out
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <h1 style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Access Denied: You do not have permission to view this page.</h1>;
  }

  // 4. If everything is okay, show the page
  return children;
};

export default ProtectedRoute;