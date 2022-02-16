import { useEffect, useState, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import debounce from 'just-debounce-it';
import { api, isTextMatch } from 'infrastructure';

import HomeUI from './Home';
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
      const data = await getShows();
      setIsLoading(false);
      setApiData(data);
      setSearchResults(data);
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
    <>
      <HomeUI
        searchTerm={searchTerm}
        apiData={apiData}
        isLoading={isLoading}
        searchResults={searchResults}
        handleChange={handleChange}
      />
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
    </>
  );
}

export default Home;
