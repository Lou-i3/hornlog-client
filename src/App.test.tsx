import React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import Error404 from './components/pages/error404';


test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <Error404 />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/404/i);
  expect(linkElement).toBeInTheDocument();
});
