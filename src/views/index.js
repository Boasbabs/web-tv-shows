import { Routes, Route } from 'react-router-dom';
import { Layout } from 'components';
import Shows from './Shows';
import Episodes from './Episodes';

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="/" element={<Shows />} />
        <Route path="/:showId" element={<Episodes />} />
      </Route>

      <Route
        path="*"
        element={
          <main style={{ padding: '1rem' }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default App;
