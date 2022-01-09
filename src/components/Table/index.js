import usePaginator from 'react-use-paginator';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { Button, Image } from 'components';
import './Table.scss';

const Page = ({ items, index }) => {
  return (
    <>
      {items.map((item) => (
        <tr key={item.id}>
          <td>
            <Image type={'large'} src={item.image?.medium} alt={item.name} />
            {item.name}
          </td>
          <td>{item.rating?.average}</td>
          <td>
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
  const { Component, nextPage, prevPage, totalPages, currentPage } =
    usePaginator({
      PageComponent: Page,
      maxPerPage: 10,
      data,
    });

  return (
    <div className="table__container">
      <table className="rounded">
        <thead>
          <tr>
            <th>Shows </th>
            <th>Rating</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          <Component />
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
    </div>
  );
};

export default Table;
