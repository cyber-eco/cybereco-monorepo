import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import { ThemeType } from '../../types';

interface LayoutProps {
  children: ReactNode;
}

interface MainProps {
  theme: ThemeType;
}

const Main = styled.main<MainProps>`
  min-height: calc(100vh - var(--header-height) - var(--footer-height));
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
