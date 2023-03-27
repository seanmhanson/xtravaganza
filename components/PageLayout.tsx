import styles from '@/styles/PageLayout.module.css';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.navContainer}></div>
        <main className={styles.contentContainer}>{children}</main>
      </div>
    </div>
  )
}

export default PageLayout;
