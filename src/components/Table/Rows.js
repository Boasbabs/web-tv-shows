import { Link } from 'react-router-dom';
import { Button, Image } from 'components';

const Rows = ({ items, handleDetails }) => {
  const handleClick = (e, item) => {
    handleDetails(item);
  };

  if (items.length === 0) {
    return (
      <>
        <tr key={'notfound'}>
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
        <tr key={item.name}>
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

          <td>
            <Link
              style={{ display: 'block', margin: '1rem 0' }}
              to={`/${item.id}`}
              key={item.name}>
              <Button type="outline">Check Episodes</Button>
            </Link>
          </td>
          <td>
            <Button type="default" onClick={(e) => handleClick(e, item)}>
              View Details
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};
export default Rows;
