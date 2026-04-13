import { NavLink } from "react-router";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";

import styles from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations.js";
// ⚠️Ojo Aqui la idea es que depeniendo del estado loggedIn aparezcan unos enlaces o no.
export const Navbar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  return (
    <nav>
      <ul className={styles.navList}>
        {!isLoggedIn && (
          <>
            <li>
              <NavLink className={styles.navLink} to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.navLink} to="/signup">
                Signup
              </NavLink>
            </li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <button
              className={styles.logoutBtn}
              type="button"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
