import { useEffect, useState, useCallback } from 'react';
import debounce from 'just-debounce-it';
import { isTextMatch } from 'infrastructure';

import useFetchApi from 'infrastructure/hooks/useFetchApi';
import { FETCH_SHOWS_URL } from '../../constants';

import ShowsUI from './Shows';

function Shows() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, data] = useFetchApi(FETCH_SHOWS_URL);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchFunction = () => {
    const searchResults = shows.filter((item) => isTextMatch(item, searchTerm));
    setSearchResults(searchResults);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(() => searchFunction(searchTerm), 500),
    [shows, searchTerm]
  );

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    setShows(data);
    setSearchResults(data);
  }, [data]);

  return (
    <>
      <ShowsUI
        searchTerm={searchTerm}
        apiData={shows}
        isLoading={isLoading}
        searchResults={searchResults}
        handleChange={handleChange}
      />
    </>
  );
}

export default Shows;
