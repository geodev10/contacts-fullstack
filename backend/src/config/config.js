import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../schemas/users/mongoose.js";

import "dotenv/config";
const SECRET_KEY = process.env.SECRET_KEY;

const options = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await User.findById({ _id: payload.id });

      if (!user) {
        return done(null, false);
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
