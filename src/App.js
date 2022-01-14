import { useEffect, useState, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import debounce from 'just-debounce-it';

import { Navbar, Table } from 'components';
import { FETCH_SHOWS_URL } from './constants';

import './styles/index.scss';
import './App.scss';

/**
 * 
 ## TODO
- Edit README.md
- Add detail drawer on the table rows showing the details
- Add validation to search, throttle the search feature
- write test for tables
- filter table by genre of shows
 */

function App() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(FETCH_SHOWS_URL);
      const data = await response.json();
      setApiData(data);
      setSearchResults(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong!'
      );
      setIsLoading(false);
    }
  };

  const searchFunction = (val) => {
    const regex = new RegExp(val, 'ig');
    const searchResults = apiData.filter((item) => {
      if (item.name.match(regex)) return item;
    });
    setSearchResults(searchResults);
  };

  const debouncedSearch = useCallback(
    debounce(() => {
      searchFunction(searchTerm);
    }, 500), // perform search for 500 ms
    [apiData, searchTerm]
  );

  useEffect(() => {
    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <Navbar />

      <main className="page__container">
        {/* Header section */}
        <section className="page__header">
          <div className="page__header_wrapper">
            <div>
              <h2 className="page__header_title">Shows</h2>
              <p className="page__header_subtitle">Total: {apiData.length}</p>
            </div>

            {/* <Button icon={<FiPlusCircle />}>Select Category</Button> */}
          </div>

          <div className="page__header_form">
            <div className="input-container fluid ">
              <FiSearch />
              <input
                onChange={handleChange}
                value={searchTerm}
                type="text"
                className="input-field"
                placeholder="Search for shows..."
              />
            </div>
          </div>
        </section>

        {/* Table section */}

        {isLoading ? (
          <p className="info-text">Loading ...</p>
        ) : (
          <section className="table">
            <Table data={searchResults} />
          </section>
        )}
      </main>
      {/* Notification Toaster and its configurations */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '8px',
            padding: '16px',
            fontSize: '12px',
            color: '#171717',
            fontFamily: 'Be Vietnam Pro',
          },
          success: {
            style: {
              backgroundColor: '#eaf5f2',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
