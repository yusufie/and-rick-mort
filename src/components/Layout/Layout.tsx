import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: any) => {

  return (

    <section className={styles.layout}>
        <header className={styles.header}>
            <Link href="/favorite">
                Favorites
            </Link>
        </header>
       {children}
    </section>

  );
};

export default Layout;