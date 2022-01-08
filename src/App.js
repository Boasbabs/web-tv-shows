import { Navbar } from 'components';

import './styles/index.scss';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <Navbar />
      <button>Button</button>
    </div>
  );
}

export default App;
