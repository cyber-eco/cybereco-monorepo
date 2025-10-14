import React from 'react';
import { render } from '@testing-library/react';

describe('Simple Test', () => {
  it('should run', () => {
    const { container } = render(<div>Test</div>);
    expect(container).toBeTruthy();
  });
});