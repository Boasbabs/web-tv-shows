import './Table.scss';

const Table = () => {
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
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
          <tr>
            <td>Adam</td>
            <td>Johnson</td>
            <td>67</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
