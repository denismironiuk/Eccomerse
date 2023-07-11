import React, { useRef, useState } from "react";
import styles from "./AccountSecurity.module.css";
import CreateIcon from "@mui/icons-material/Create";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalLoginForm from "../../ModalLoginForm/ModalLoginForm";
import HeaderUserInfo from "../UI/HeaderUserInfo";
const AccountSecurity = ({ userData, token, updateUser }) => {
  const [openModal, setOpenModal] = useState(false);
  const currentPassword = useRef();
  const newPassword = useRef();
  const retypePassword = useRef();
  const [error, setError] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const togglePasswordVisibility = (field) => {
    if (field === "current") {
      setShowCurrentPassword((prevState) => !prevState);
    } else if (field === "new") {
      setShowNewPassword((prevState) => !prevState);
    } else if (field === "retype") {
      setShowRetypePassword((prevState) => !prevState);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentPasswordValue = currentPassword.current.value;
    const newPasswordValue = newPassword.current.value;
    const retypePasswordValue = retypePassword.current.value;

    if (newPasswordValue !== retypePasswordValue) {
      setError("New password and re-typed password do not match");
      return;
    }

    if (newPasswordValue === currentPasswordValue) {
      setError("New password and re-typed password must be not equal");
      return;
    }
    try {
      // Send a request to the server to change the password
      const response = await fetch(
        process.env.REACT_APP_API_ENDPOINT + "/update/password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            currentPassword: currentPasswordValue,
            newPassword: newPasswordValue,
          }),
        }
      );

      if (response.ok) {
        const resData = await response.json();

        updateUser(resData.updatedUser);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <>
      {openModal && <ModalLoginForm userData={userData} close={setOpenModal} />}

      <div className={styles.container}>
        <HeaderUserInfo
          name="Account"
          description="Edit your account settings and change your password here."
        />

        <div className={styles.wrapper}>
          <div className={styles.edit__container}>
            <h2>Email:</h2>
            <div className={styles.edit__email}>
              <p>
                Your email address is <span>{userData?.email}</span>
              </p>
              <div className={styles.edit__icon}>
                <i onClick={() => setOpenModal((prev) => !prev)}>
                  <CreateIcon fontSize="large" />
                </i>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.edit__container}>
            {error && <p className={styles.error}>{error}</p>}
            <h2>Password:</h2>
            <div className={styles.edit__password}>
              <form onSubmit={handleSubmit}>
                <div className={styles.input}>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    ref={currentPassword}
                    placeholder="Enter current password"
                  />
                  <i onClick={() => togglePasswordVisibility("current")}>
                    <VisibilityIcon />
                  </i>
                </div>
                <div className={styles.input}>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    ref={newPassword}
                    placeholder="Enter new password"
                  />
                  <i onClick={() => togglePasswordVisibility("new")}>
                    <VisibilityIcon />
                  </i>
                </div>
                <div className={styles.input}>
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    ref={retypePassword}
                    placeholder="Re-type new password"
                  />
                  <i onClick={() => togglePasswordVisibility("retype")}>
                    <VisibilityIcon />
                  </i>
                </div>

                <div className={styles.button}>
                  <button>Change password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSecurity;
