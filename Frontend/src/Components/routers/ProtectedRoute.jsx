// ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { index } from '../context/Indexxontext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ element: Component, userType, ...rest }) => {
  const { studentloggedin, employeloggedin } = useContext(index);
  const location = useLocation();
  const isLoggedIn = userType === 'student' ? studentloggedin : employeloggedin;


  

  if (!isLoggedIn) {
    toast.error('Please login first');
    const redirectPath = userType === 'student' ? '/student/login' : '/employe/login';
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }
  return <Component {...rest} />;
};

export default ProtectedRoute;
