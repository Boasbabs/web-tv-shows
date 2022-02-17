import { useState } from 'react';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
            <Link className="navbar__item_link" to={`/`}>
              Shows
            </Link>
          </li>
          <li className="navbar__item" role="menuitem">
            <Link className="navbar__item_link" to={`/`}>
              Episodes
            </Link>
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
