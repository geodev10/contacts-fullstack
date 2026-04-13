import { Typography } from "@mui/material";
import styles from "./HomePage.module.css";
const HomePage = () => {
  return (
    <main className={styles.main}>
      <img className={styles.image} src="/contact-book.gif" alt="Phonebook" />
      <Typography className={styles.title} variant="h1" gutterBottom>
        Your Contacts, Simplified.
      </Typography>
    </main>
  );
};

export default HomePage;
