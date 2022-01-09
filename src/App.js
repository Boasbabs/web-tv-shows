import { Navbar, Table } from 'components';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';

import './styles/index.scss';
import './App.scss';

function App() {
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

            <button className="page__header_button default">
              <FiPlusCircle />
              Select Category
            </button>
          </div>

          <div className="page__header_form">
            <div class="input-container fluid ">
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
        <section className="table">
          <Table />
        </section>
      </main>
    </div>
  );
}

export default App;
