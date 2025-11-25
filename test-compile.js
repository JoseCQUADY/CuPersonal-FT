// Simple compilation test
console.log('Testing compilation...');

// Test imports
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './src/App.jsx';

console.log('All imports successful');
console.log('React version:', React.version);
console.log('App component:', typeof App);

export default true;