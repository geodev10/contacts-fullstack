import { createSlice } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from "./operations.js";

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
  filter: "",
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload?.message || "Something went wrong";
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setFilter: (state, actions) => {
      state.filter = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        // console.log(payload);
        const { data } = payload;
        state.isLoading = false;
        state.error = null;
        state.contacts = data.contacts;
      })
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.rejected, handleRejected)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        const { data } = payload;
        // console.log(data);
        state.isLoading = false;
        state.error = null;
        state.contacts.push({ ...data.contact });
      })
      .addCase(updateContact.pending, handlePending)
      .addCase(updateContact.rejected, handleRejected)
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        const updatedContact = payload.data.contact;

        state.isLoading = false;
        state.error = null;

        const index = state.contacts.findIndex(
          (contact) => contact._id === updatedContact._id,
        );

        if (index !== -1) {
          state.contacts[index] = updatedContact;
        }
      })
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        // ⚠️Cuidado aqui el payload contiene el _id
        // console.log(payload);
        state.isLoading = false;
        state.error = null;
        state.contacts = state.contacts.filter(
          (contact) => contact._id !== payload,
        );
      });
  },
});

// Action creators are generated for each case reducer function
export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
