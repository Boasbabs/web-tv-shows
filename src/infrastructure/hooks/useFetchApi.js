import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const useFetchApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(url);
        setData(response.data);
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

    fetchData();
  }, [url]);

  return [isLoading, data];
};

export default useFetchApi;
