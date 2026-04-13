import { isValidObjectId } from "mongoose";

export const validateId = (paramName) => (req, res, next) => {
  const id = req.params[paramName];

  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: `${id} is not a valid ID format`,
    });
  }

  next();
};
