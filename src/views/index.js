import { Routes, Route } from 'react-router-dom';

import Shows from './Shows';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Shows />}>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
