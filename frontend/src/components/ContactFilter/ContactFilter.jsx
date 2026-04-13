import { useId } from "react";
import styles from "./ContactFilter.module.css";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/contacts/contactSlice.js";

export const ContactFilter = () => {
  const filterId = useId();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.currentTarget.value);
    dispatch(setFilter(e.currentTarget.value));
  };

  return (
    <div className={styles.filterBox}>
      <TextField
        type="text"
        name="filter"
        id={filterId}
        variant="outlined"
        color="primary"
        size="small"
        label="Find contacts by name"
        className={styles.filterInput}
        onChange={handleChange}
      />
    </div>
  );
};
