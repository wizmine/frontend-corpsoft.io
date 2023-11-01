import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <nav className={styles.container}>
      <Link to="/" className={styles.logo}>
        Corpsoft.io
      </Link>
      {isAuth ? (
        <div className={styles.links}>
          <Link to="/add-post" className={styles.link}>
            Add Post
          </Link>
          <Link to={`/profile-info/${data._id}`} className={styles.link}>
            Profile
          </Link>

          <Link to="/">
            <button onClick={onClickLogout} className={styles.logout}>
              Logout
            </button>
          </Link>
        </div>
      ) : (
        <div className={styles.links}>
          <Link to="/login">
            <button className={styles.login}>Sign In</button>
          </Link>
        </div>
      )}
    </nav>
  );
};
