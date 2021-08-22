import React from 'react';
import App from './App';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dashboard/i);
  expect(linkElement).toBeInTheDocument();
});
