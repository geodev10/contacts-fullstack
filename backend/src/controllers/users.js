import userService from "../services/users.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = (req, res, next) => {
  const { email, subscription } = req.user;

  try {
    res.status(200).json({
      status: "sucess",
      code: 200,
      message: `Current User is: ${email}`,
      data: {
        user: {
          email,
          subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const newUser = await userService.signup(req.body);

    if (!newUser) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: `This email ${req.body.email} already exists`,
      });
    }

    res.status(201).json({
      status: "created",
      code: 201,
      message: "User registered successfully",
      data: {
        user: { ...newUser },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const userData = await userService.login(req.body);

    // ⚠️REVISAR QUE CODIGO ES EL ERROR REALMENTE
    if (!userData) {
      // 401 es el estándar para fallos de autenticación
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "The user logged in successfully",
      data: {
        ...userData,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const { id } = req.user;
  const { subscription } = req.body;

  try {
    const updatedUser = await userService.updateSubscription(id, subscription);

    if (!updatedUser) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Subscription user is updated",
      data: {
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await userService.logout(id);
    if (!user) {
      return res.status(404).json({
        message: "Not Found",
      });
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Logout successful",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUsers,
  signup,
  login,
  getCurrentUser,
  updateSubscription,
  logout,
};
