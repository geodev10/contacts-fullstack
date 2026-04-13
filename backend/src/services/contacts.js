import { Contact } from "../schemas/contacts/mongoose.js";

const getContacts = async (filter, options) => {
  const { skip, limit } = options;

  const contacts = await Contact.find(filter).skip(skip).limit(limit);

  const total = await Contact.countDocuments(filter);

  return {
    total,
    contacts,
  };
};

const getContactById = async (contactId, ownerId) => {
  return await Contact.findOne({ _id: contactId, owner: ownerId });
};

const addContact = async (body, ownerId) => {
  const contactExists = await Contact.exists({
    email: body.email,
    owner: ownerId,
  });

  if (contactExists) return null;

  return await Contact.create({ ...body, owner: ownerId });
};

const deleteContact = async (contactId, ownerId) => {
  return await Contact.findOneAndDelete({ _id: contactId, owner: ownerId });
};

const updateContact = async (body, contactId, ownerId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    { ...body },
    { runValidators: true, returnDocument: "after" },
  );
};

const updateFavorite = async (isFavorite, contactId, ownerId) => {
  return await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    { favorite: isFavorite },
    { runValidators: true, returnDocument: "after" },
  );
};

export default {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateFavorite,
};
