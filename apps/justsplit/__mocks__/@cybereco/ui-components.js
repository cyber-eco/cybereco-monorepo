const React = require('react');

// Mock components
const Button = ({ children, ...props }) => React.createElement('button', props, children);
const Navigation = ({ children, ...props }) => React.createElement('nav', props, children);
const UserMenu = ({ children, ...props }) => React.createElement('div', props, children);
const Footer = ({ children, ...props }) => React.createElement('footer', props, children);
const GlobalProvider = ({ children }) => children;

// Mock hooks
const useLanguage = () => ({
  t: (key) => key,
  language: 'en',
  setLanguage: jest.fn()
});

const useTheme = () => ({
  theme: 'light',
  setTheme: jest.fn()
});

module.exports = {
  Button,
  Navigation,
  UserMenu,
  Footer,
  GlobalProvider,
  useLanguage,
  useTheme,
  // Export other components as needed
  ConfigDropdown: ({ children, ...props }) => React.createElement('div', props, children),
  LinkedInIcon: () => React.createElement('svg'),
  GitHubIcon: () => React.createElement('svg'),
  EmailIcon: () => React.createElement('svg'),
};