import Joi from "joi";
import { subscriptionOptions } from "../../constants/constants.js";

export const userJoiSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "any.required": "Missing required email field",
  }),
  password: Joi.string().trim().required().messages({
    "any.required": "Missing required password field",
  }),
});

export const userUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionOptions)
    .required()
    .messages({
      "any.only": `Subscription must be one of: ${subscriptionOptions.join(", ")}`,
      "any.required": "Missing required subscription field",
    }),
});
