import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { api } from 'infrastructure';

const { getEpisodes } = api;

const Episodes = () => {
  let params = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const data = await getEpisodes(params.showId);
      setIsLoading(false);
      setEpisodes(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong!'
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h2>Show ID: {params.showId}</h2>

      {isLoading ? (
        <p className="info-text">Loading ...</p>
      ) : (
        episodes.map((episode) => <p key={episode.id}>{episode.name}</p>)
      )}
    </main>
  );
};

export default Episodes;
