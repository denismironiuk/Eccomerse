import React, { useState, useContext } from "react";
import AuthContext from "../../context/authContext";
import styles from "./ModalLoginForm.module.css";
import CloseIcon from "@mui/icons-material/Close";

const ModalLoginForm = ({ close ,userData}) => {
  const {token,updateUser} = useContext(AuthContext);
  const [email, setEmail] = useState(userData?.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform login logic, e.g., calling an API endpoint
    try {
      // Replace the following code with your actual login logic
      const response = await fetch(process.env.REACT_APP_API_ENDPOINT+"/update/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer " +token
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
       updateUser(data.user)
        setError(null);
        close(prev=>!prev); // Close the login form popup
      } else {
        throw new Error("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalContent__title}>
          <h2>Change your email</h2>
          <i onClick={()=>close(prev=>!prev)}><CloseIcon /></i>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className={styles.button}>
          <button type="submit">Save</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default ModalLoginForm;
