import { useState } from 'react';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import { Image } from 'components';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <header>
      <nav className="navbar" role="menubar" aria-label="Main Navigation">
        <div className="navbar__brand">
          <h5>My TVShows</h5>
        </div>
        <ul className={`navbar__menu ${isOpen ? ' open' : ''}`}>
          <li className="navbar__item" role="menuitem">
            <button className="navbar__item_link" href="#">
              Shows
            </button>
          </li>
          <li className="navbar__item" role="menuitem">
            <button className="navbar__item_link" href="#">
              Episodes
            </button>
          </li>
          <li className="navbar__item" role="menuitem">
            <button className="navbar__item_link" href="#">
              People
            </button>
          </li>
          <li className="navbar__item" role="menuitem">
            <button className="navbar__item_link" href="#">
              Settings
            </button>
          </li>
        </ul>
        <div className="navbar__profile">
          <Image />
          <p className="">Adeyemi Babalola</p>
        </div>
        {isOpen ? (
          <FiX className="navbar__bar" onClick={handleClick} />
        ) : (
          <FiAlignJustify className="navbar__bar" onClick={handleClick} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
