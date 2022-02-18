import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import debounce from 'just-debounce-it';
import { api, isTextMatch } from 'infrastructure';

import ShowsUI from './Shows';
const { getShows } = api;

function Shows() {
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
      <ShowsUI
        searchTerm={searchTerm}
        apiData={apiData}
        isLoading={isLoading}
        searchResults={searchResults}
        handleChange={handleChange}
      />
    </>
  );
}

export default Shows;
