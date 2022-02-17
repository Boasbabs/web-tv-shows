import { Routes, Route } from 'react-router-dom';

import Home from './Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
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
