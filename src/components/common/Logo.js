import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoSvg = styled.svg`
  height: ${props => props.height || '50px'};
  width: auto;
`;

const LogoText = styled.span`
  font-size: ${props => props.height ? `${props.height * 0.5}px` : '25px'};
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-left: 10px;
  letter-spacing: -0.5px;
`;

const Logo = ({ height }) => {
  return (
    <LogoContainer>
      <LogoSvg 
        height={height} 
        viewBox="0 0 512 512" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M256 40C136.2 40 40 136.2 40 256S136.2 472 256 472s216-96.2 216-216S375.8 40 256 40z" 
          fill="none" 
          stroke="#006241" 
          strokeWidth="32" 
        />
        <path 
          d="M256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160S344.4 96 256 96z" 
          fill="none" 
          stroke="#006241" 
          strokeWidth="32" 
        />
        <path 
          d="M256 150a106 106 0 00-106 106c0 35.9 17.8 67.5 45.1 86.5a169.3 169.3 0 00121.8 0A106 106 0 00256 150z" 
          fill="#6BBF59" 
        />
        <path 
          d="M256 246v-40" 
          stroke="#006241" 
          strokeWidth="32" 
          strokeLinecap="round" 
        />
        <path 
          d="M256 246l40 30" 
          stroke="#006241" 
          strokeWidth="24" 
          strokeLinecap="round" 
        />
        <path 
          d="M256 246l-40 30" 
          stroke="#006241" 
          strokeWidth="24" 
          strokeLinecap="round" 
        />
        <path 
          d="M256 246v60" 
          stroke="#006241" 
          strokeWidth="32" 
          strokeLinecap="round" 
        />
      </LogoSvg>
      <LogoText height={height}>CyberEco</LogoText>
    </LogoContainer>
  );
};

export default Logo;
