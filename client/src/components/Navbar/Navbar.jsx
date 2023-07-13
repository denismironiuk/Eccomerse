import React, { useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/authContext";
import { emptyCard, emptyCardSuccess } from "../../redux/cartReducer";
import AsidePanel from "../AsidePanel/AsidePanel";
import UserLogo from "../UI/UserLogo/UserLogo";

const Navbar = ({ categories }) => {
  const { isLoggedIn, logout, userData } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

function handleLogout() {
   
    dispatch(emptyCardSuccess());
   
    logout();
   
    setOpenMenu(false);
   navigate("/")
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.menu} onClick={handleMenu}>
          <MenuIcon style={{ fontSize: "2.5rem" }} />
        </div>
        <AsidePanel
          openMenu={openMenu}
          handleMenu={handleMenu}
          categories={categories}
          handleLogout={handleLogout}
          isLoggedIn={isLoggedIn}
          userData={userData}
        />
        <div className={styles.center}>
          <Link className={styles.link} to="/">
            Shopping Store
          </Link>
        </div>
        <div className={styles.left}>
          {categories.map((category) => {
            return (
              <div className={styles.item} key={category._id}>
                <Link
                  className={styles.link}
                  to={`products/${category.categoryName}/${category._id}`}
                >
                  {category.categoryName}
                </Link>
              </div>
            );
          })}
        </div>

        <div className={styles.icons}>
          <div className={styles.cartIcon}>
            <Link to={"/cart"}>
              <ShoppingCartOutlinedIcon
                style={{ fontSize: "25px", color: "white" }}
              />
              <span>{totalQuantity}</span>
            </Link>
          </div>
          {!isLoggedIn && (
            <div className={styles.item__auth}>
              <Link to={"/auth?mode=login"} className={styles.link}>
                Log In
              </Link>
            </div>
          )}
          {isLoggedIn && (
            // <div className={styles.item__action}>

            //     <button onClick={handleLogout}>Logout</button>

            // </div>
            <div>
              <Link to={`user`}>
                <UserLogo content="header_logo" userData={userData} />
              </Link>
            </div>
          )}
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
