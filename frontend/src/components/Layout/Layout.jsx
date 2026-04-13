import { Suspense } from "react";
import { Outlet } from "react-router";
import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";

import styles from "./Layout.module.css";
import { Toaster } from "react-hot-toast";

export const Layout = () => {
  return (
    <div className={styles.pageLayout}>
      <Header className={styles.header} />

      <div className={`container ${styles.content}`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </div>

      <Footer className={styles.footer} />
    </div>
  );
};
