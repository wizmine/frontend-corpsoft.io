import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

import styles from "./registration.module.css";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    login: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(fetchRegister(formData));

    if (!data.payload) {
      return alert("Failed to registration!");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <p className={styles.text}>Registration</p>
        <input
          type="text"
          name="email"
          placeholder="enter your e-mail..."
          className={styles.input}
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="login"
          placeholder="enter your login..."
          className={styles.input}
          value={formData.login}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="enter your password..."
          className={styles.input}
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
      <Link to="/login" className={styles.login}>
        Sign In
      </Link>
    </div>
  );
};
