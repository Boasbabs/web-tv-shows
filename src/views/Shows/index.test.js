import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Shows from './index';
import mocks from 'mocks';

const server = setupServer(
  rest.get('https://api.tvmaze.com/shows', (req, res, ctx) => {
    return res(ctx.json(mocks.mockShowsData));
  })
);

describe('Web TV App', () => {
  beforeAll(() => server.listen());

  beforeEach(() => {
    // this is only here to make the error output not appear in the project's output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close()); // clean up once the tests are done

  test('renders app without crashing', async () => {
    render(<Shows />, { wrapper: MemoryRouter });
    const titleElement = await screen.findByPlaceholderText(
      /Search for shows/i
    );
    expect(titleElement).toBeInTheDocument();
  });

  test('render with all shows', async () => {
    render(<Shows />, { wrapper: MemoryRouter });
    await waitFor(() => {
      expect(screen.getAllByTestId('name')).toHaveLength(3);
    });
    expect(screen.getAllByTestId('rating')).toHaveLength(3);
    expect(screen.getAllByTestId('genres')).toHaveLength(3);
  });

  test('view details of a shows upon clicked', async () => {
    render(<Shows />, { wrapper: MemoryRouter });
    const firstShow = mocks.mockShowsData[0];

    let nameElements;
    await waitFor(() => {
      nameElements = screen.getAllByText(/View Details/i);
      // await screen.findByText(/TV Maze Shows/i);
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
    render(<Shows />, { wrapper: MemoryRouter });

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
