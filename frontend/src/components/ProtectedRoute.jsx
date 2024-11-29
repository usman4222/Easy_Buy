import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  // If the user is logged in, render the child routes (Outlet), otherwise redirect to login page.
  return currentUser ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
