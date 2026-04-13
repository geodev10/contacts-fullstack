import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import styles from "./ContactList.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";
import { ContactItem } from "../ContactItem/ContactItem.jsx";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations.js";

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        maxWidth: 800,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.06)",
        borderRadius: "10px",
      }}
    >
      <Table aria-label="simple table">
        <TableHead className={styles.tableHeader}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "17px", color: "white" }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "17px", color: "white" }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "17px", color: "white" }}
            >
              Phone
            </TableCell>
            <TableCell
              sx={{ fontWeight: 600, fontSize: "17px", color: "white" }}
              align="center"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactItem key={contact._id} contact={contact} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                No contacts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
