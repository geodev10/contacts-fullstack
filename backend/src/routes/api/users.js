import express from "express";
import userCtrl from "../../controllers/users.js";
import { validateBody } from "../../middlewares/validateJoiSchema.js";
import {
  userJoiSchema,
  userUpdateSubscription,
} from "../../schemas/users/joi.js";
import { auth } from "../../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.get("/", userCtrl.getUsers);
usersRouter.post("/signup", validateBody(userJoiSchema), userCtrl.signup);
usersRouter.post("/login", validateBody(userJoiSchema), userCtrl.login);

usersRouter.use(auth);
usersRouter.get("/current", userCtrl.getCurrentUser);
usersRouter.patch(
  "/",
  validateBody(userUpdateSubscription),
  userCtrl.updateSubscription,
);
usersRouter.post("/logout", userCtrl.logout);

export default usersRouter;
