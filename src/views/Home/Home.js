import { useEffect, useState, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';
import debounce from 'just-debounce-it';

import { Navbar, Table } from 'components';
import { FETCH_SHOWS_URL } from '../../constants';
import { api, isTextMatch } from 'infrastructure';

import './index.scss';

const { getShows } = api;

function Home() {
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
      getShows().then((data) => {
        setIsLoading(false);
        setApiData(data);
        setSearchResults(data);
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong!'
      );
      setIsLoading(false);
    }
  };

  const searchFunction = () => {
    const searchResults = apiData.filter((item) =>
      isTextMatch(item, searchTerm)
    );
    setSearchResults(searchResults);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(() => searchFunction(searchTerm), 500),
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
          <div className="page__header_wrHomeer">
            <div>
              <h2 className="page__header_title">TV Maze Shows - surge</h2>
              <p className="page__header_subtitle">Total: {apiData.length}</p>
            </div>
          </div>

          <div className="page__header_form">
            <div className="input-container fluid ">
              <FiSearch />
              <input
                onChange={handleChange}
                value={searchTerm}
                type="text"
                className="input-field"
                placeholder="Search for shows"
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
        }}
      />
    </div>
  );
}

export default Home;