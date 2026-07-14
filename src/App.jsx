import React from 'react';
import LandingPage from './views/LandingPage';
import { ToastContainer } from './components/Toast';

export default function App() {
  return (
    <>
      <LandingPage />
      <ToastContainer />
    </>
  );
}
