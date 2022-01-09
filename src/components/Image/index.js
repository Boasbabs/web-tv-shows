import './Image.scss';

const Image = ({ alt, src, type, ...rest }) => {
  const imageType = type === 'large' ? 'large' : '';
  return (
    <>
      <img
        {...rest}
        src={src || 'https://www.w3schools.com/css/paris.jpg'}
        alt={alt || 'data photo'}
        className={`image ${imageType}`}
      />
    </>
  );
};

export default Image;
