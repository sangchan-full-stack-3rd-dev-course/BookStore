import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders book store', () => {
  render(<App />);
  const linkElement = screen.getByText(/book store/i);
  expect(linkElement).tonpBeInTheDocument();
});
