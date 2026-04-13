import passport from "passport";

export const auth = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error || !user || !user.token) {
      return res.status(401).json({
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};
