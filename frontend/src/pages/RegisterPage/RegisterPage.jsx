import { useDispatch } from "react-redux";
import { UserForm } from "../../components/UserForm/UserForm.jsx";

import { signup } from "../../redux/auth/operations.js";
import { Typography } from "@mui/material";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await dispatch(signup(userData)).unwrap();

      toast.success("Welcome");
    } catch (payload) {
      toast.error(payload?.message || "Invalid Credentials");
    }
  };

  return (
    <main className="main-form">
      <Typography variant="h2" align="center" gutterBottom>
        Register
      </Typography>

      <UserForm submitText="Signup" onSubmitForm={handleSubmit} />
    </main>
  );
};

export default RegisterPage;
