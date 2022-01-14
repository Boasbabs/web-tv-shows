import { useState } from 'react';
import usePaginator from 'react-use-paginator';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { Button, Image, Flyout } from 'components';
import './Table.scss';

const Page = ({ items, handleDetails }) => {
  const handleClick = (e, item) => {
    handleDetails(item);
  };

  if (items.length === 0) {
    return (
      <>
        <tr>
          <td className="empty-state" colSpan={3}>
            No data found...
          </td>
        </tr>
      </>
    );
  }
  return (
    <>
      {items.map((item) => (
        <tr key={item.id} onClick={(e) => handleClick(e, item)}>
          <td data-testid="name">
            <Image type={'large'} src={item.image?.medium} alt={item.name} />
            {item.name}
          </td>
          <td data-testid="rating">{item.rating?.average}</td>
          <td data-testid="genres">
            {item.genres.map((gen) => (
              <Button key={gen} type="outline">
                {gen}
              </Button>
            ))}
          </td>
        </tr>
      ))}
    </>
  );
};

const Table = ({ data }) => {
  const [details, setDetails] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleDetails = (item) => {
    setToggle(!toggle);
    setDetails(item);
  };

  const { Component, nextPage, prevPage, totalPages, currentPage } =
    usePaginator({
      PageComponent: Page,
      maxPerPage: 10,
      data,
    });

  return (
    <div className="table__container">
      <table width="100%">
        <thead>
          <tr>
            <th>Shows </th>
            <th>Rating</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          <Component handleDetails={handleDetails} />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <span> Total Pages:{` ${currentPage} / ${totalPages}`} </span>
              <Button
                icon={<FiArrowLeft />}
                type="outline"
                onClick={prevPage}
              ></Button>
              <Button
                icon={<FiArrowRight />}
                type="outline"
                onClick={nextPage}
              ></Button>
            </td>
          </tr>
        </tfoot>
      </table>
      <Flyout slideShow={toggle} setSlideShow={setToggle} details={details} />
    </div>
  );
};

export default Table;
