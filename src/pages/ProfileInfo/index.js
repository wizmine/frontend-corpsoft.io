import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "../../axios";

import styles from "./profileInfo.module.css";

export const ProfileInfo = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { _id } = useSelector((state) => state.auth.data) || {};
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/user/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, [id]);

  if (isLoading) {
    return <p className={styles.loading}>loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
        {data.avatarUrl !== "http://localhost:4444undefined" && (
          <img src={`http://localhost:4444${data.avatarUrl}`} alt="me" className={styles.photo} />
        )}
          <h4 className={styles.name}>{data.login}</h4>
        </div>
        <div className={styles.main}>
          <div className={styles.info}>
            <span className={styles.key}>DOB: </span>
            {data.dob}
          </div>
          <div className={styles.info}>
            <span className={styles.key}>Locate: </span>
            {data.locate}
          </div>
          <div className={styles.info}>
            <span className={styles.key}>Company: </span>
            {data.company}
          </div>
        </div>
        {_id === id && (
          <Link to="/profile-info/edit">
            <button className={styles.edit}>Edit</button>
          </Link>
        )}
      </div>
    </div>
  );
};
