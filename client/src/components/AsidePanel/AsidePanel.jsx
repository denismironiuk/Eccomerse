import { Link } from "react-router-dom";
import styles from "./AsidePanel.module.css";
import UserLogo from "../UI/UserLogo/UserLogo";

const AsidePanel = ({
  openMenu,
  categories,
  handleMenu,
  handleLogout,
  isLoggedIn,
  userData
}) => {
  return (
    <>
      <div className={openMenu ? styles.mobile : styles.close}>
        <div className={styles.closeIcon} onClick={handleMenu}>
          <span>X</span>
        </div>

        <ul>
          <div>
            {isLoggedIn ? (
              <div className={styles.user__header}>
                <UserLogo content="header__logo" userData={userData} />
                <div>
                  <h2>Hi {userData?.name ?(userData.name.split(" ").slice(0,1)):("") }</h2>
                  <p>Welcome back</p>
                </div>
              </div>
            ) : (
              <div className={styles.user__auth}>
                <Link to={"auth?mode=login"} onClick={handleMenu}>
                  Log in
                </Link>
                <Link to={"auth?mode=signup"} onClick={handleMenu}>
                  Sign up
                </Link>
              </div>
            )}

            <div className={styles.categories}>
              <h2>Categories : </h2>
              {categories?.map((category) => {
                return (
                  <li key={category._id}>
                    <Link onClick={handleMenu}
                      className={styles.link}
                      to={`products/${category.categoryName}/${category._id}`}
                    >
                      {category.categoryName}
                    </Link>
                  </li>
                );
              })}
            </div>
          </div>
          {isLoggedIn && <div className={styles.logout}>
            <Link onClick={handleLogout}>Logout</Link>
          </div>}
          
        </ul>
      </div>
    </>
  );
};

export default AsidePanel;
