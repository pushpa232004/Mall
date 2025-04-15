
import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardPage from './DashboardPage';

const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
