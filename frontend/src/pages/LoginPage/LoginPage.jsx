import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations.js";

import { UserForm } from "../../components/UserForm/UserForm.jsx";
import { Typography } from "@mui/material";

import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      // Usamos unwrap() para "desenvolver" la promesa
      await dispatch(login(userData)).unwrap();

      toast.success("Login Succesfull");
    } catch (payload) {
      // ⚠️Aquí cae el error que se configuro en el thunk
      toast.error(payload?.message || "Invalid Credentials");
    }
  };

  return (
    <main className="main-form">
      <Typography variant="h2" align="center" gutterBottom>
        Login
      </Typography>

      <UserForm submitText="Login" onSubmitForm={handleSubmit} />
    </main>
  );
};

export default LoginPage;
