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
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close()); // clean up once the tests are done

  test('renders app without crashing', () => {
    render(<Home />);
    const titleElement = screen.getByText(/TV Maze Shows/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('render with all shows', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(screen.getAllByTestId('name')).toHaveLength(3);
    });
    expect(screen.getAllByTestId('rating')).toHaveLength(3);
    expect(screen.getAllByTestId('genres')).toHaveLength(3);
  });

  test('view details of a shows upon clicked', async () => {
    render(<Home />);
    const firstShow = mocks.mockShowsData[0];

    let nameElements;
    await waitFor(() => {
      nameElements = screen.getAllByTestId('name');
    });
    expect(nameElements).toHaveLength(3);

    // Get the first in the row
    const firstRow = nameElements[0];
    userEvent.click(firstRow);

    // check if flyout is opened
    let flyoutTitle;
    await waitFor(() => {
      flyoutTitle = screen.getByTestId('flyout-title');
      expect(flyoutTitle).toBeInTheDocument();
    });
    expect(flyoutTitle.textContent).toBe(firstShow.name);
  });

  test('search for a show in the table', async () => {
    render(<Home />);

    const searchInput = await screen.findByPlaceholderText(/Search for shows/i);
    expect(searchInput).toBeInTheDocument();

    userEvent.type(searchInput, 'Under the Dome');

    await waitFor(() => {
      // only that role is shown after searching
      expect(screen.getAllByTestId('name')).toHaveLength(1);
    });
    expect(screen.getAllByTestId('rating')).toHaveLength(1);
    expect(screen.getAllByTestId('genres')).toHaveLength(1);
  });
});
