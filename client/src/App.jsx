import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from './CustomThemeProvider';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import ListOfEventsAndHomePage from './components/pages/ListOfEventsAndHomePage';
import UserContextProvider from './components/context/UserContext';
import CreateEventPage from './components/pages/CreateEventPage';
import RequestPage from './components/pages/RequestPage';
import ResponsiveAppBar from './components/layout/Header';
import ConfirmationPage from './components/pages/ConfirmationPage';

function App() {
  const [themeLight, setThemeLight] = useState(() => {
    const savedThemeLight = localStorage.getItem('themeLight');
    return savedThemeLight !== null ? JSON.parse(savedThemeLight) : true;
  });

  useEffect(() => {
    localStorage.setItem('themeLight', JSON.stringify(themeLight));
  }, [themeLight]);

  const handleThemeChange = () => {
    setThemeLight((prevTheme) => !prevTheme);
  };

  return (
    <CustomThemeProvider themeLight={themeLight}>
      <UserContextProvider>
        <Router>
          <ResponsiveAppBar themeLight={themeLight} handleThemeChange={handleThemeChange} />
          <Routes>
            <Route path="/" element={<ListOfEventsAndHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/create-event" element={<CreateEventPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/confirmation/:response" element={<ConfirmationPage />} />
            <Route path="*" element={<ListOfEventsAndHomePage />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </CustomThemeProvider>
  );
}

export default App;
