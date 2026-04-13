export const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
        errors: { wrap: { label: false } },
      });

      req.body = validatedBody;

      next();
    } catch (error) {
      error.status = 400;
      next(error);
    }
  };
};
