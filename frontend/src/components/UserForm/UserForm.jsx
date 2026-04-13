import { useId } from "react";
import { Button, TextField } from "@mui/material";

import styles from "./UserForm.module.css";

//⚠️Ojo pelao bebe. Pasar datos a traves de un prop hacia el componente que llama el form y a su vez usar la operacion adecuada del Async Thunk
export const UserForm = ({ submitText, onSubmitForm }) => {
  const emailId = useId();
  const passwordId = useId();

  return (
    <section className={styles.formSection}>
      <form onSubmit={onSubmitForm} className={styles.userForm}>
        <TextField
          type="email"
          name="email"
          id={emailId}
          variant="outlined"
          label="Email"
          color="primary"
          required
        />
        <TextField
          type="password"
          name="password"
          id={passwordId}
          label="Password"
          color="primary"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" size="large" color="info">
          {submitText}
        </Button>
      </form>
    </section>
  );
};
