import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";


const Navbar = ({categories}) => {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);


  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.wrapper}>
        <div className={styles.menu} onClick={handleMenu}>
          <MenuIcon style={{ fontSize: "2.5rem" }} />
        </div>
        <div className={openMenu ? styles.mobile : styles.close}onClick={handleMenu} >
          <div
            style={{
              textAlign: "end",
              padding: "1rem",
              color: "white",
              fontSize: "2rem",
            }}
            onClick={handleMenu}
          >
            X
          </div>
          <ul>
            {categories.map((category) => {
              return (
                <li key={category._id}>
                  <Link
                    className={styles.link}
                    to={`products/${category.categoryName}/${category._id}`}
                  >
                    {category.categoryName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
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

        <div className={styles.right} style={{ display: "none" }}>
          <div className={styles.icons}>
            <SearchIcon style={{ fontSize: "25px" }} />
            <PersonOutlineOutlinedIcon style={{ fontSize: "25px" }} />
            <FavoriteBorderOutlinedIcon style={{ fontSize: "25px" }} />
            <div
              className={styles.cartIcon}
              onClick={() => setOpen(!open)}
            >
              <ShoppingCartOutlinedIcon style={{ fontSize: "25px" }} />
            </div>
          </div>
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
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
