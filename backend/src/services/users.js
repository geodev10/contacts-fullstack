import jsonwebtoken from "jsonwebtoken";
import { User } from "../schemas/users/mongoose.js";

import "dotenv/config";

const jwt = jsonwebtoken;
const SECRET_KEY = process.env.SECRET_KEY;

const getUsers = async () => {
  return await User.find({});
};

const signup = async (body) => {
  const { email, password } = body;

  const userExists = await User.exists({ email: email });

  if (userExists) return null;

  const newUser = new User({ ...body });
  await newUser.setPassword(password);
  await newUser.save();

  // ⚠️CUIDADO FALTA AVATAR
  return {
    email: newUser.email,
    subscription: newUser.subscription,
  };
};

const login = async (body) => {
  const { email, password } = body;
  const userExists = await User.findOne({ email: email });

  if (!userExists) return null;

  const passwordIsvalid = await userExists.validatePassword(password);

  if (!passwordIsvalid) return null;

  const payload = {
    id: userExists._id.toString(),
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  await User.findByIdAndUpdate(
    userExists._id,
    { token: token },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );

  return {
    token,
    user: {
      email: userExists.email,
      subscription: userExists.subscription,
    },
  };
};

const updateSubscription = async (userId, subscription) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { subscription: subscription },
    { returnDocument: "after", runValidators: true },
  );
};

const logout = async (userId) => {
  return await User.findByIdAndUpdate(
    { _id: userId },
    { token: null },
    { returnDocument: "after", runValidators: true },
  );
};
export default { getUsers, signup, login, updateSubscription, logout };
