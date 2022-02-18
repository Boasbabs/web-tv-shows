import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useFetchApi from 'infrastructure/hooks/useFetchApi';
import { FETCH_SHOWS_URL } from '../../constants';

const Episodes = () => {
  let params = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, data] = useFetchApi(
    `${FETCH_SHOWS_URL}/${params.showId}/episodes`
  );

  useEffect(() => {
    setEpisodes(data);
  }, [data]);

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
