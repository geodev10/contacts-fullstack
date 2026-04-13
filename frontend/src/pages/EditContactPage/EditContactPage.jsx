import { useDispatch } from "react-redux";
import { ContactForm } from "../../components/ContactForm/ContactForm.jsx";
import { updateContact } from "../../redux/contacts/operations.js";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contacts/selectors.js";

import styles from "./EditContactPage.module.css";
import { ArrowBack } from "@mui/icons-material";

const EditContactPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactId } = useParams();
  const backLinkHref = location.state?.from ?? "/contacts";

  const contacts = useSelector(selectContacts);

  const [contactInfo] = contacts.filter((contact) => contact._id === contactId);

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const contact = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    try {
      await dispatch(updateContact({ contactId, contact })).unwrap();
      toast.success("Contact is updated");

      navigate("/contacts");
    } catch (payload) {
      toast.error(payload?.message || "Error");
    }
  };

  return (
    <main className={styles.mainPage}>
      <Link className={styles.backLink} to={backLinkHref}>
        <ArrowBack fontSize="inherit" />
        Back
      </Link>
      <div className={styles.formBox}>
        {contactInfo ? (
          <ContactForm
            onSubmitForm={handleEdit}
            actionMessage={"Edit Contact"}
            initialValue={contactInfo}
          />
        ) : (
          <p>Contact not found</p>
        )}
      </div>
    </main>
  );
};

export default EditContactPage;
