import { Typography } from "@mui/material";
import { ContactFilter } from "../../components/ContactFilter/ContactFilter.jsx";
import { ContactForm } from "../../components/ContactForm/ContactForm.jsx";
import { ContactList } from "../../components/ContactList/ContactList.jsx";

import styles from "./ContactsPage.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations.js";
import toast from "react-hot-toast";

const ContactsPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const contact = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      await dispatch(addContact(contact)).unwrap();
      e.target.reset();
      toast.success("Contact is created");
    } catch (payload) {
      toast.error(payload?.message || "Error");
    }
  };

  return (
    <main>
      <section className={styles.section}>
        <Typography variant="h4" gutterBottom>
          Add Contact
        </Typography>

        <div className={styles.formBox}>
          <ContactForm
            onSubmitForm={handleSubmit}
            actionMessage={"Add Contact"}
          />
        </div>
      </section>
      <section className={styles.section}>
        <Typography variant="h4" gutterBottom>
          Contacts
        </Typography>
        <div className={styles.contactSearch}>
          <ContactFilter />
          <ContactList />
        </div>
      </section>
    </main>
  );
};

export default ContactsPage;
