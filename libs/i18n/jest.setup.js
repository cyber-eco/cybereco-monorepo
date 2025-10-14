// Mock browser APIs for testing
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.navigator = {
  language: 'en-US',
  languages: ['en-US', 'en'],
};

// Mock Intl APIs with basic implementations
global.Intl = {
  ...global.Intl,
  DateTimeFormat: jest.fn(() => ({
    format: jest.fn((date) => date.toLocaleDateString()),
    resolvedOptions: jest.fn(() => ({ timeZone: 'America/New_York' })),
  })),
  NumberFormat: jest.fn(() => ({
    format: jest.fn((num) => num.toLocaleString()),
  })),
  RelativeTimeFormat: jest.fn(() => ({
    format: jest.fn((value, unit) => `${value} ${unit}s ago`),
  })),
  ListFormat: jest.fn(() => ({
    format: jest.fn((list) => list.join(', ')),
  })),
};