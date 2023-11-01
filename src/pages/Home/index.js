import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { Post } from "../../components";

import { fetchPosts } from "../../redux/slices/posts";

export const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <Link to="/add-post" className={styles.create}>
        Create Post
      </Link>
      {posts.items.map((obj, index) => (
        <Post
          key={index}
          id={obj._id}
          userId={obj.user._id}
          text={obj.text}
          login={obj.user.login}
          comments={obj.comments}
          imageUrl={`http://localhost:4444${obj.imageUrl}`}
          avatar={`http://localhost:4444${obj.user.avatarUrl}`}
          isEditable={data?._id === obj.user._id}
        />
      ))}
    </main>
  );
};
