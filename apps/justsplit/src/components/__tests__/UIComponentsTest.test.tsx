import React from 'react';
import { render } from '@testing-library/react';
import { Button } from '@cybereco/ui-components';

describe('UI Components Import Test', () => {
  it('should import Button from ui-components', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeTruthy();
  });
});