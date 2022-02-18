import { Routes, Route } from 'react-router-dom';
import { Layout } from 'components';
import Shows from './Shows';
import Episodes from './Episodes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
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
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '8px',
            padding: '16px',
            fontSize: '12px',
            color: '#171717',
            fontFamily: 'Be Vietnam Pro',
          },
        }}
      />
    </div>
  );
};

export default App;
