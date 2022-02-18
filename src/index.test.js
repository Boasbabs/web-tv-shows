import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './views';

test('renders without crashing', () => {
  render(<App />, { wrapper: MemoryRouter });
  const navElement = screen.getByText(/My TVShows/i);
  expect(navElement).toBeInTheDocument();
});
