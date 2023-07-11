import React from "react";
import styles from "./UserLayout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import UserNavbar from "../UserNavbar/UserNavbar";
import { useContext } from "react";
import AuthContext from "../../../context/authContext";
const UserLayout = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.user__container}>
        <div className={styles.user__bar}>
          <UserNavbar />
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
