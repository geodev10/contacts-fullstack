import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectRefresh } from "../redux/auth/selectors.js";
import { Navigate } from "react-router";

export const PrivateRoute = ({ redirectTo = "/", component: Component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectRefresh);

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
