import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import { Flyout } from 'components';
import Rows from './Rows';

import './Table.scss';

const ITEMS_PER_PAGE = 10;

const Table = ({ data }) => {
  const [details, setDetails] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const handleDetails = (item) => {
    setToggle(!toggle);
    setDetails(item);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % data.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const endOffset = itemOffset + ITEMS_PER_PAGE;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / ITEMS_PER_PAGE));
  }, [itemOffset, data]);

  return (
    <div className="table__container">
      <table width="100%">
        <thead>
          <tr>
            <th>Shows </th>
            <th>Rating</th>
            <th>Genre</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          <Rows items={currentItems} handleDetails={handleDetails} />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={'100%'}>
              <ReactPaginate
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
              />
            </td>
          </tr>
        </tfoot>
      </table>
      <Flyout slideShow={toggle} setSlideShow={setToggle} details={details} />
    </div>
  );
};

export default Table;
