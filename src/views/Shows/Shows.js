import { FiSearch } from 'react-icons/fi';

import { Table } from 'components';
import './index.scss';

function ShowsUI(props) {
  return (
    <>
      <section className="page__header">
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
    </>
  );
}

export default ShowsUI;
