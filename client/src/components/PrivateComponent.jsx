import React from 'react';
import useAuthStatus from '../hooks/useAuthStatus';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';

const PrivateComponent = () => {

  const { loggedIn, checkUser, } = useAuthStatus();

  if (checkUser) {
    return <Loading />;
  }

  // not logged in
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }


  // verified user
  return <Outlet />;
};

export default PrivateComponent;