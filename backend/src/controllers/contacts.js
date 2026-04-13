import contactService from "../services/contacts.js";

const getContacts = async (req, res, next) => {
  const { id, email } = req.user;
  const { page = 1, limit = 50, favorite } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const options = {
    skip,
    limit: limitNumber,
  };

  const filter = {
    owner: id,
  };

  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  try {
    const result = await contactService.getContacts(filter, options);

    const totalPages = Math.ceil(result.total / limitNumber);

    res.status(200).json({
      status: "success",
      code: 200,
      message: `${email} Contacts`,
      data: {
        page: pageNumber,
        limit: limitNumber,
        total: result.total,
        totalPages,
        contacts: result.contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.user;
  const { contactId } = req.params;
  try {
    const contact = await contactService.getContactById(contactId, id);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact found",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { id } = req.user;
  try {
    const newContact = await contactService.addContact(req.body, id);
    if (!newContact) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: `This contact ${req.body.name} is already exists`,
      });
    }

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact is created",
      data: {
        contact: newContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.user;
  const { contactId } = req.params;
  try {
    const contactDeleted = await contactService.deleteContact(contactId, id);

    if (!contactDeleted) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "This contact not exists",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact Deleted",
      data: {
        contact: contactDeleted,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { id } = req.user;
  const { contactId } = req.params;
  try {
    const updatedContact = await contactService.updateContact(
      req.body,
      contactId,
      id,
    );

    if (!updatedContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact data is updated",
      data: {
        contact: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;
  try {
    const updatedContact = await contactService.updateFavorite(
      favorite,
      contactId,
      id,
    );

    if (!updatedContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact data is updated",
      data: {
        contact: updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
  updateFavorite,
};
