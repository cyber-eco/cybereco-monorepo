import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';
import { BrowserRouter } from 'react-router-dom';

test('renders logo with correct props', () => {
  const { container } = render(
    <BrowserRouter>
      <Logo height={50} />
    </BrowserRouter>
  );
  
  // Check if logo is rendered with specified height
  const img = container.querySelector('img');
  expect(img).toBeInTheDocument();
  expect(img?.style.height).toBe('50px');
});
