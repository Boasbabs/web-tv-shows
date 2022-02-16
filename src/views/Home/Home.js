import { FiSearch } from 'react-icons/fi';

import { Navbar, Table } from 'components';
import './index.scss';

function HomeUI(props) {
  return (
    <div className="page">
      <Navbar />

      <main className="page__container">
        {/* Header section */}
        <section className="page__header">
          <div className="page__header_wrapper">
            <div>
              <h2 className="page__header_title">TV Maze Shows - surge</h2>
              <p className="page__header_subtitle">
                Total: {props.apiData.length}
              </p>
            </div>
          </div>

          <div className="page__header_form">
            <div className="input-container fluid ">
              <FiSearch />
              <input
                onChange={props.handleChange}
                value={props.searchTerm}
                type="text"
                className="input-field"
                placeholder="Search for shows"
              />
            </div>
          </div>
        </section>

        {/* Table section */}
        {props.isLoading ? (
          <p className="info-text">Loading ...</p>
        ) : (
          <section className="table">
            <Table data={props.searchResults} />
          </section>
        )}
      </main>
      {/* Notification Toaster and its configurations */}
    </div>
  );
}

export default HomeUI;
