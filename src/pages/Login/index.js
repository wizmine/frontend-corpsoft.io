import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

import styles from "./login.module.css";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
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
    const data = await dispatch(fetchAuth(formData));
    console.log(data);

    if (!data.payload) {
      return alert("Failed to login!");
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
        <p className={styles.text}>Sign In</p>
        <input
          type="text"
          name="email"
          placeholder="enter your email..."
          className={styles.input}
          value={formData.email}
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
          Login
        </button>
      </form>
      <Link to="/register" className={styles.register}>
        Register
      </Link>
    </div>
  );
};
