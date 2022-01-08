import { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { FiAlignJustify, FiX } from 'react-icons/fi';
import './Navbar.scss';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar__brand">
          <h5>My TVShows</h5>
        </div>
        <ul className={`navbar__menu ${isOpen ? ' open' : ''}`}>
          <li className="navbar__item">
            <a className="navbar__item_link" href="#">
              Shows
            </a>
          </li>
          <li className="navbar__item">
            <a className="navbar__item_link" href="#">
              Episodes
            </a>
          </li>
          <li className="navbar__item">
            <a className="navbar__item_link" href="#">
              People
            </a>
          </li>
          <li className="navbar__item">
            <a className="navbar__item_link" href="#">
              Settings
            </a>
          </li>
        </ul>
        <div className="navbar__profile">
          <img
            src="https://www.w3schools.com/css/paris.jpg"
            alt="Avatar"
            class="navbar__profile__avatar"
          />
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
