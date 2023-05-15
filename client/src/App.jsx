import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from './CustomThemeProvider';
import Layout from './components/layout/Layout';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import ListOfEventsAndHomePage from './components/pages/ListOfEventsAndHomePage';
import UserContextProvider from './components/context/UserContext';
import CreateEventPage from './components/pages/CreateEventPage';
import RequestPage from './components/pages/RequestPage';
import ResponsiveAppBar from './components/layout/Header';

function App() {
  const router = createHashRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ListOfEventsAndHomePage />
        },
        {
          path: '/signup',
          element: <SignUpPage />
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/create-event',
          element: <CreateEventPage />
        },
        {
          path: '/request',
          element: <RequestPage />
        },
      ]
    },
  ])
  return (
    <CustomThemeProvider themeLight={themeLight}>
      <UserContextProvider>
        <Router>
          <ResponsiveAppBar themeLight={themeLight} handleThemeChange={handleThemeChange} />
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="*" element={<ListOfEventsAndHomePage />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </CustomThemeProvider>
  );
}

export default App;
