import React from "react";
import styles from "./UserLogo.module.css";

const UserLogo = ({ content, userData }) => {
  
  const logoClass = content && content !== "header_logo" ? styles.logo : styles.header_logo;
  const profileImage=userData?.image?.secure_url
  const userName =userData?.name  ?(userData?.name):('user')

  console.log(userData);
  return (
    <div className={logoClass}>
      {profileImage ?(  <span><img src={userData?.image?.secure_url} width={'70px'} height={'70px'} alt="" /></span>):(<p>{userName}</p>)}
    
    </div>
  );
};

export default UserLogo;
