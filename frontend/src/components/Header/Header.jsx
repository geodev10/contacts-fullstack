import { Link } from "react-router";
import { Navbar } from "../Navbar/Navbar.jsx";
import styles from "./Header.module.css";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

export const Header = () => {
  return (
    <header className={styles.headerPage}>
      <div className={`container ${styles.headerContainer}`}>
        <Link className={styles.headerLogo} to="/">
          <PhoneAndroidIcon />
          <h1 className={styles.headerTitle}>Phonebook API</h1>
        </Link>
        <Navbar />
      </div>
    </header>
  );
};
