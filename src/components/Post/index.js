import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddComment } from "../AddComment";

import { fetchRemovePost } from "../../redux/slices/posts";

import styles from "./post.module.css";

export const Post = ({ id, userId, text, login, comments, imageUrl, avatar, isEditable }) => {
  const dispatch = useDispatch();
  const [replyLogin, setReplyLogin] = useState("");

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to delete article?")) {
      dispatch(fetchRemovePost(id));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_user}>
          {imageUrl !== "http://localhost:4444undefined" && (
            <img src={avatar} alt="user" className={styles.user} />
          )}
          <Link to={`/profile-info/${userId}`}>
            <h4>{login}</h4>
          </Link>
        </div>
        {isEditable && (
          <button className={styles.delete} onClick={onClickRemove}>
            Delete
          </button>
        )}
      </div>
      {imageUrl !== "http://localhost:4444undefined" && (
        <img src={imageUrl} alt="post" className={styles.image} />
      )}
      <div className={styles.description}>{text}</div>
      <div className={styles.comments}>
        {comments.map((obj) => (
          <div className={styles.comment} key={obj.id}>
            <img
              src={`http://localhost:4444${obj.user.avatarUrl}`}
              alt="me"
              className={styles.user}
            />
            <div>
              <Link to={`/profile-info/${obj.user._id}`}>
                <h4>{obj.user.login}</h4>
              </Link>
              <p>{obj.text}</p>
              <button className={styles.reply} onClick={() => setReplyLogin(obj.user.login)}>Reply</button>
            </div>
          </div>
        ))}
      </div>
      <AddComment userId={userId} postId={id} replyLogin={replyLogin} />
    </div>
  );
};
