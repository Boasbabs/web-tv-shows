import { useParams } from 'react-router-dom';

const Episodes = () => {
  let params = useParams();
  return (
    <main>
      <h2>Show ID: {params.showId}</h2>
    </main>
  );
};

export default Episodes;
