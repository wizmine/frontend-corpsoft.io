import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddPost, Home, Login, ProfileInfo, ProfileInfoEdit, Registration } from "../pages";
import { Footer, Header } from "../components";
import { fetchAuthMe } from "../redux/slices/auth";

import styles from "./app.module.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile-info/:id" element={<ProfileInfo />} />
          <Route path="/profile-info/edit" element={<ProfileInfoEdit />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
