import { useId } from "react";
import { Button, TextField } from "@mui/material";

import styles from "./ContactForm.module.css";

export const ContactForm = ({
  onSubmitForm,
  actionMessage,
  initialValue = {},
}) => {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();

  return (
    <section className={styles.formSection}>
      <form className={styles.contactForm} onSubmit={onSubmitForm}>
        <TextField
          type="text"
          name="name"
          id={nameId}
          defaultValue={initialValue?.name || ""}
          variant="outlined"
          label="Name"
          color="primary"
          fullWidth
          required
        />
        <TextField
          type="email"
          name="email"
          id={emailId}
          defaultValue={initialValue?.email || ""}
          variant="outlined"
          label="Email"
          color="primary"
          required
        />
        <TextField
          type="text"
          name="phone"
          id={phoneId}
          defaultValue={initialValue?.phone || ""}
          variant="outlined"
          label="Phone"
          color="primary"
          required
        />
        <Button type="submit" variant="contained" size="medium" color="info">
          {actionMessage}
        </Button>
      </form>
    </section>
  );
};
