import { useState, useEffect } from 'react';
import { isTextMatch } from 'infrastructure';

const useSearch = (list = [], searchTerm = '') => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const searchResults = list.filter((item) => isTextMatch(item, searchTerm));
    setResult(searchResults);
  }, [list, searchTerm]);
  return [result];
};

export default useSearch;
