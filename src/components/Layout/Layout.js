import { Outlet } from 'react-router-dom';
import { Navbar } from 'components';

import './index.scss';

const Layout = () => {
  return (
    <div className="page">
      <Navbar />

      <main className="page__container">
        {/* Header section */}
        <section className="page__header">
          <div className="page__header_wrapper">
            <div>
              <h2 className="page__header_title">TV Maze Shows - surge</h2>
              <p className="page__header_subtitle"></p>
            </div>
          </div>

          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Layout;
