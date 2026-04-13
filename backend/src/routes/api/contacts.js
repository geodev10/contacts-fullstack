import express from "express";
import contactCtrl from "../../controllers/contacts.js";
import { auth } from "../../middlewares/auth.js";
import { validateId } from "../../middlewares/validateId.js";
import { validateBody } from "../../middlewares/validateJoiSchema.js";
import {
  contactJoiSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../../schemas/contacts/joi.js";

const contactsRouter = express.Router();

contactsRouter.use(auth);

contactsRouter.get("/", contactCtrl.getContacts);
contactsRouter.get(
  "/:contactId",
  validateId("contactId"),
  contactCtrl.getContactById,
);
contactsRouter.post(
  "/",
  validateBody(contactJoiSchema),
  contactCtrl.addContact,
);
contactsRouter.delete(
  "/:contactId",
  validateId("contactId"),
  contactCtrl.deleteContact,
);

contactsRouter.put(
  "/:contactId",
  validateId("contactId"),
  validateBody(updateContactSchema),
  contactCtrl.updateContact,
);

contactsRouter.patch(
  "/:contactId/favorite",
  validateId("contactId"),
  validateBody(updateFavoriteSchema),
  contactCtrl.updateFavorite,
);

export default contactsRouter;
