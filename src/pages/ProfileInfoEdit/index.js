import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUpdateMe } from "../../redux/slices/auth";

import styles from "./profileInfoEdit.module.css";
import axios from "../../axios";

export const ProfileInfoEdit = ({ isEditable }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useSelector((state) => state.auth.data);
  const [dob, setDob] = useState("");
  const [locate, setLocate] = useState("");
  const [company, setCompany] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const inputFileRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);
      setAvatarUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error loading file!");
    }
  };

  const onClickRemoveAvatar = () => {
    setAvatarUrl("");
  };

  const handleSave = () => {
    const updatedInfo = {
      dob,
      locate,
      company,
      avatarUrl,
    };

    dispatch(fetchUpdateMe(updatedInfo));
    navigate("/");
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          {avatarUrl && (
            <>
              <button className={styles.delete} onClick={onClickRemoveAvatar}>
                delete
              </button>
              <img
                className={styles.photo}
                src={`http://localhost:4444${avatarUrl}`}
                alt="uploaded"
              />
            </>
          )}
          <h4 className={styles.name}>{login}</h4>
          <div>
            <button
              className={styles.download}
              onClick={(event) => {
                event.preventDefault();
                inputFileRef.current.click();
              }}
            >
              download picture
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.info}>
            <span className={styles.key}>DOB: </span>
            <input
              type="text"
              className={styles.input}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className={styles.info}>
            <span className={styles.key}>Locate: </span>
            <input
              type="text"
              className={styles.input}
              value={locate}
              onChange={(e) => setLocate(e.target.value)}
            />
          </div>
          <div className={styles.info}>
            <span className={styles.key}>Company: </span>
            <input
              type="text"
              className={styles.input}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.save} onClick={() => handleSave()}>
          Save
        </button>
      </div>
    </div>
  );
};
