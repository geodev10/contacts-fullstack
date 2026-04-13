import { IconButton, TableCell, TableRow } from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import DeleteIcon from "@mui/icons-material/Delete";

import styles from "./ContactItem.module.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations.js";
import { useLocation, useNavigate } from "react-router";

export const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, name, email, phone } = contact;

  const handleDelete = () => {
    dispatch(deleteContact(_id));
  };

  const handleEdit = () => {
    navigate(`/contacts/edit/${_id}`, { state: { from: location } });
  };

  return (
    <TableRow hover>
      <TableCell>{name}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell align="center">
        <IconButton className={styles.editIcon} onClick={handleEdit}>
          <EditSquareIcon />
        </IconButton>
        <IconButton className={styles.deleteIcon} onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
