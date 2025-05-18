import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 30px;
  width: 60px;
  overflow: hidden;
`;

const Icons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
  position: relative;
  z-index: 1;
`;

const SunIcon = styled(FaSun)`
  color: #f9d71c;
`;

const MoonIcon = styled(FaMoon)`
  color: #a9def9;
`;

const ToggleThumb = styled(motion.div)`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
`;

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
      <Icons>
        <SunIcon size={14} />
        <MoonIcon size={14} />
      </Icons>
      <ToggleThumb
        initial={{ x: darkMode ? 28 : 0 }}
        animate={{ x: darkMode ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </ToggleButton>
  );
};

export default ThemeToggle;
