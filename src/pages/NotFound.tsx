import React from 'react';
import NotFoundBlock from '../components/NotFoundBlock';
import styles from '../components/NotFoundBlock/NotFoundBlock.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <NotFoundBlock />
    </div>
  );
};

export default NotFound;
