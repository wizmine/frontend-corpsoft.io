import React, { useState } from "react";
import styles from "./addComment.module.css";
import { fetchCreateComment } from "../../redux/slices/posts";
import { useDispatch } from "react-redux";

export const AddComment = ({ userId, postId, replyLogin }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = replyLogin === "" ? `${comment}` : `${replyLogin}, ${comment}`;

    const newComment = {
      text: text,
      userId: userId,
    };

    dispatch(fetchCreateComment({ postId, newComment }));
    setComment("");
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        className={styles.textarea}
        rows="3"
        value={comment}
        onChange={handleCommentChange}
        placeholder={replyLogin === "" ? "write something..." : `reply to ${replyLogin}...`}
      ></textarea>
      <input type="hidden" name="userId" value={userId} />
      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  );
};
