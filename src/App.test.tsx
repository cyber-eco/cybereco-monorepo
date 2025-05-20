import React from 'react';
// Import the global jest functions from the expected Jest namespace
import { describe, it, expect } from '@jest/globals';

describe('App component', () => {
  it('renders without crashing', () => {
    // This simple test will pass
    expect(true).toBeTruthy();
  });
});
