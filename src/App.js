import React from 'react';
import './config';
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import Router from './components/router';

import Footer from './components/footer';
import Header from './components/header';
import { AuthDataProvider } from './auth/AuthDataContext';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <AuthDataProvider>
          <Header />
          <Router />
          <Footer />
        </AuthDataProvider>
      </BrowserRouter>
    </div>
  );
}
