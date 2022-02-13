import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Home from './index';
import mocks from 'mocks';

const server = setupServer(
  //  "GET /shows" request
  rest.get('https://api.tvmaze.com/shows', (req, res, ctx) => {
    return res(ctx.json(mocks.mockShowsData));
  })
);

describe('Web TV App', () => {
  // establish API mocking before all tests
  beforeAll(() => server.listen());

  beforeEach(() => {
    // this is only here to make the error output not appear in the project's output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close()); // clean up once the tests are done

  test('renders app without crashing', () => {
    render(<Home />);
    const titleElement = screen.getByText(/TV Maze Shows/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('render with all shows', async () => {
    const { getAllByTestId } = render(<App />);

    await waitFor(() => {
      const nameElements = getAllByTestId('name');
      const ratingElements = getAllByTestId('rating');
      const genresElements = getAllByTestId('genres');
      expect(nameElements).toHaveLength(3);
      expect(ratingElements).toHaveLength(3);
      expect(genresElements).toHaveLength(3); // check if there are 3 shows in the table
    });
  });

  test('view details of a shows upon clicked', async () => {
    const { getAllByTestId, getByTestId } = render(<Home />);
    const firstShow = mocks.mockShowsData[0];

    let nameElements;
    await waitFor(() => {
      nameElements = getAllByTestId('name');
    });
    expect(nameElements).toHaveLength(3);

    // Get the first in the row
    const firstRow = nameElements[0];
    // simulate a click event on the row
    userEvent.click(firstRow);

    // check if flyout is opened
    let flyoutTitle;
    await waitFor(() => {
      flyoutTitle = getByTestId('flyout-title');
      expect(flyoutTitle).toBeInTheDocument();
      expect(flyoutTitle.textContent).toBe(firstShow.name);
    });
  });

  test('search for a show in the table', async () => {
    const { findByPlaceholderText, getAllByTestId } = render(<Home />);

    const searchInput = await findByPlaceholderText(/Search for shows/i);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Under the Dome');

    await waitFor(() => {
      const nameElements = getAllByTestId('name');
      const ratingElements = getAllByTestId('rating');
      const genresElements = getAllByTestId('genres');

      // only that role is shown after searching
      expect(nameElements).toHaveLength(1);
      expect(ratingElements).toHaveLength(1);
      expect(genresElements).toHaveLength(1);
    });
  });
});
