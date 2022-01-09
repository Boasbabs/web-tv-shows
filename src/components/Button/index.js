import './Button.scss';

const Button = ({ icon, type, children, ...rest }) => {
  const buttonType = type === 'outline' ? 'outline' : 'default';
  return (
    <button type="button" {...rest} className={`button ${buttonType}`}>
      {icon && icon}
      {children && children}
    </button>
  );
};

export default Button;
