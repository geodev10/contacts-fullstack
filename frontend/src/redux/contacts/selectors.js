import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.contacts;
export const selectFilter = (state) => state.contacts.filter;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    // Si no hay filtro, devolvemos todo
    if (!filter) return contacts;

    const normalizedFilter = filter.toLowerCase();

    // Filtramos por nombre o por lo que necesites
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  },
);
