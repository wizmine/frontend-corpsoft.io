import React, { useRef, useState } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "../../axios";

import { selectIsAuth } from "../../redux/slices/auth";

import styles from "./addPost.module.css";

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputFileRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Error loading file!");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onSubmit = async () => {
    try {
      const fields = {
        imageUrl,
        text,
      };

      await axios.post("/posts", fields);
    } catch (error) {
      console.warn(error);
      alert("Error while creating article!");
    }
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label className={styles.text}>Create a post</label>
        <textarea className={styles.textarea} onChange={(e) => setText(e.target.value)}></textarea>
        {imageUrl && (
          <>
            <button className={styles.delete} onClick={onClickRemoveImage}>
              delete
            </button>
            <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="uploaded" />
          </>
        )}
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
        <button onClick={onSubmit} type="submit" className={styles.create}>
          Create
        </button>
      </form>
    </div>
  );
};
