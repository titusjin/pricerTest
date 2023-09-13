import MainContent from '../MainContent';

import styles from  './layout.module.scss';

const Layout = () =>  {
  return (
    <div className={styles.container}>
      <MainContent />
    </div>
  );
}

export default Layout;