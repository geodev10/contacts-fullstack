import Joi from "joi";
import { nameRegex, phoneRegex } from "../../constants/constants.js";

export const contactJoiSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegex)
    .min(3)
    .max(50)
    .trim()
    .required()
    .messages({
      "any.required": "Missing required name field",
    }),
  email: Joi.string().email().trim().required().messages({
    "any.required": "Missing required email field",
  }),
  phone: Joi.string()
    .pattern(phoneRegex)
    .min(7)
    .max(20)
    .trim()
    .required()
    .messages({
      "any.required": "Missing required phone field",
    }),
});

export const updateContactSchema = contactJoiSchema
  .fork(["name", "email", "phone"], (schema) => schema.optional())
  .min(1)
  .messages({
    "object.min": "missing fields",
  });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing required favorite field",
  }),
});
