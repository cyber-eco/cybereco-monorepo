import { createGlobalStyle } from 'styled-components';
import { ThemeType } from '../types';

interface GlobalStyleProps {
  theme: ThemeType;
}

const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  :root {
    /* Light theme colors */
    --primary-light: #006241;
    --secondary-light: #6BBF59;
    --text-primary-light: #333333;
    --text-secondary-light: #666666;
    --background-light: #FFFFFF;
    --surface-light: #F7F7F7;
    --border-light: #DDDDDD;

    /* Dark theme colors */
    --primary-dark: #00A36C;
    --secondary-dark: #8CD867;
    --text-primary-dark: #E0E0E0;
    --text-secondary-dark: #B0B0B0;
    --background-dark: #121212;
    --surface-dark: #1E1E1E;
    --border-dark: #333333;

    /* Common variables */
    --border-radius: 8px;
    --transition-speed: 0.3s;
    --max-width: 1200px;
    --header-height: 70px;
    --footer-height: 200px;
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 3rem;
    --spacing-xl: 5rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
                 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textPrimary};
    transition: background-color var(--transition-speed), color var(--transition-speed);
    line-height: 1.6;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: color var(--transition-speed);
    
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: var(--spacing-sm);
    color: ${({ theme }) => theme.textPrimary};
  }

  h1 {
    font-size: 2.5rem;
    @media (min-width: 768px) {
      font-size: 3.5rem;
    }
  }

  h2 {
    font-size: 2rem;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    margin-bottom: var(--spacing-sm);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  section {
    padding: var(--spacing-lg) var(--spacing-sm);
    
    @media (min-width: 768px) {
      padding: var(--spacing-xl) var(--spacing-md);
    }
  }

  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
  }
`;

export default GlobalStyles;