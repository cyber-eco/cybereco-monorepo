import React from 'react';
import styled from 'styled-components';

const LogoImage = styled.img`
  height: ${props => props.height}px;
  width: auto;
  display: block;
`;

const Logo = ({ height = 40 }) => {
  return <LogoImage src={`${process.env.PUBLIC_URL}/logo-rectangle.svg`} alt="CyberEco" height={height} />;
};

export default Logo;
