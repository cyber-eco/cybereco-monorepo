import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import { LanguageContext } from '../../context/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from '../common/LanguageSelector';
import Logo from '../common/Logo';

const HeaderWrapper = styled.header`
  height: var(--header-height);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color var(--transition-speed);
`;

const HeaderContainer = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: var(--header-height);
    right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    width: 70%;
    height: calc(100vh - var(--header-height));
    background-color: ${({ theme }) => theme.surface};
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-md);
    transition: right 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  margin: 0 var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  color: ${({ theme, active }) => (active ? theme.primary : theme.textPrimary)};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
    transform: scaleX(${({ active }) => (active ? 1 : 0)});
    transform-origin: bottom right;
    transition: transform 0.3s ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }

  @media (max-width: 768px) {
    margin: var(--spacing-sm) 0;
    width: 100%;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.5rem;
  cursor: pointer;
  margin-left: var(--spacing-sm);

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { translations } = useContext(LanguageContext);

  const t = translations?.navigation || {};

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">
            <Logo height={40} />
          </Link>
        </LogoContainer>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" active={isActive('/') ? 'true' : undefined}>
            {t.home || 'Home'}
          </NavLink>
          <NavLink to="/portfolio" active={isActive('/portfolio') ? 'true' : undefined}>
            {t.portfolio || 'Solutions'}
          </NavLink>
          <NavLink to="/about" active={isActive('/about') ? 'true' : undefined}>
            {t.about || 'About Us'}
          </NavLink>
          <NavLink to="/help" active={isActive('/help') ? 'true' : undefined}>
            {t.help || 'Help'}
          </NavLink>
        </NavLinks>

        <ToggleContainer>
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          <LanguageSelector />
          <MenuToggle onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </MenuToggle>
        </ToggleContainer>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
