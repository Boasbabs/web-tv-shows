import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Navbar, Table, Button, Image } from 'components';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { FETCH_SHOWS_URL } from './constants';

import './styles/index.scss';
import './App.scss';

function App() {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchShows = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(FETCH_SHOWS_URL);
      const data = await response.json();
      setLists(data);

      setIsLoading(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong!'
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <div className="page">
      <Navbar />
      <main className="page__container">
        {/* Header section */}
        <section className="page__header">
          <div className="page__header_wrapper">
            <div>
              <h2 className="page__header_title">Category</h2>
              <p className="page__header_subtitle">Counter 56</p>
            </div>

            <Button icon={<FiPlusCircle />}>Select Category</Button>
          </div>

          <div className="page__header_form">
            <div className="input-container fluid ">
              <FiSearch />
              <input
                type="text"
                className="input-field"
                placeholder="Search for shows, episodes"
              />
            </div>
          </div>
        </section>

        {/* Table section */}

        {isLoading ? (
          <p className="info-text">Loading ...</p>
        ) : (
          <section className="table">
            <Table data={lists} />
          </section>
        )}
      </main>
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
          success: {
            style: {
              backgroundColor: '#eaf5f2',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
