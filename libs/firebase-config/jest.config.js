const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('jest').Config} */
module.exports = {
  displayName: 'firebase-config',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/firebase-config',
};