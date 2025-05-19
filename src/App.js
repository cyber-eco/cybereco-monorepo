import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/themes';

// Layout Components
import Layout from './components/layout/Layout';

// Page Components
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import StatusPage from './pages/StatusPage';

const AppContent = () => {
  const { darkMode } = useContext(ThemeContext);
  const theme = darkMode ? darkTheme : lightTheme;
  
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
