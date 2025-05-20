import React from 'react';
import styled from 'styled-components';

interface LogoImageProps {
  height: number;
}

interface LogoProps {
  height?: number;
}

const LogoImage = styled.img<LogoImageProps>`
  height: ${props => props.height}px;
  width: auto;
  display: block;
`;

const Logo: React.FC<LogoProps> = ({ height = 40 }) => {
  return <LogoImage src={`${process.env.PUBLIC_URL}/logo-rectangle.svg`} alt="CyberEco" height={height} />;
};

export default Logo;
