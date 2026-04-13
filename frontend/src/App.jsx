import { lazy } from "react";
import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout/Layout.jsx";
import { RestrictedRoute } from "./components/RestrictedRoute.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshUser } from "./redux/auth/operations.js";
import { selectRefresh } from "./redux/auth/selectors.js";
import EditContactPage from "./pages/EditContactPage/EditContactPage.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const RegisterPage = lazy(
  () => import("./pages/RegisterPage/RegisterPage.jsx"),
);

const ContactsPage = lazy(
  () => import("./pages/ContactsPage/ContactsPage.jsx"),
);

/*Causa un lag al intentar editar el contacto cuando se entra en la app por primera vez
const EditContactPage = lazy(
  () => import("./pages/EditContactPage/EditContactPage.jsx"),
);
*/
function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectRefresh);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="signup"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
        <Route
          path="contacts/edit/:contactId"
          element={
            <PrivateRoute redirectTo="/login" component={<EditContactPage />} />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
