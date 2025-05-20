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
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import FaqPage from './pages/FaqPage';
import DocumentationPage from './pages/DocumentationPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { darkMode } = useContext(ThemeContext);
  const theme = darkMode ? darkTheme : lightTheme;
  
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles theme={theme} />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </StyledThemeProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
