import React, { useContext, useState } from "react";
import styles from "./Cart.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { emptyCard } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import AuthContext from "./../../context/authContext";
import {retrieveSessionData} from '../../helper/index'

import CartProduct from "./CartProduct";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { token, isLoggedIn } = useContext(AuthContext);

  const products = useSelector((state) => state.cart.items);
  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (totalQuantity === 0)
    return (
      <div className={styles.empty}>
        <p>Empty Cart</p>
      </div>
    );

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      // User is not logged in, show the login form popup
      navigate("/auth?mode=login");
    } else {
      try {

      

        const response = await fetch(
          process.env.REACT_APP_API_ENDPOINT + "/create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              products: products.map((product) => {
                return {
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                  img: product.img,
                };
              }),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to create checkout session");
        }

        const resData = await response.json();
        const { sessionId } = resData;

        // Set the session data in local storage
        const sessionData = {
          sessionId: sessionId,
          paymentStatus: "pending",
        };
        localStorage.setItem("sessionData", JSON.stringify(sessionData));

        // Redirect to the checkout page
        window.location.href = resData.session.url;
        updateSessionData();
      } catch (error) {
        console.log(error);
        // Handle the error as needed
      }
    }
  };

  const updateSessionData = () => {
    const storedSessionData = retrieveSessionData();

    if (storedSessionData) {
      storedSessionData.paymentStatus = "success";

      // Update the session data in local storage
      localStorage.setItem("sessionData", JSON.stringify(storedSessionData));
    }
  };
 
  return (
    <div className={styles.cart}>
      <div
        className={styles.title}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Shopping Cart</h2>
        <div onClick={() => dispatch(emptyCard())}>
          <DeleteOutlinedIcon
            style={{ alignSelf: "flex-end", fontSize: "30px" }}
          />
        </div>
      </div>

      <div className={styles.flex}>
        {products?.map((product) => (
          <CartProduct
            key={product._id}
            id={product._id}
            title={product.name}
            description={product.desc}
            image={product.img}
            price={product.price}
            totalPrice={product.totalPrice}
            quantity={product.quantity}
          />
        ))}
      </div>
      <div className={styles.checkout}>
        <div className={styles.subtotal}>
          <div>
            <h2>Sub-Total: </h2>
          </div>
          <h2>{totalPrice}$</h2>
        </div>
        <div className={styles.btn}>
          {isLoggedIn? (
            // User is logged in, display regular checkout button
            <button onClick={handleCheckout}>Checkout</button>
          ) : (
            // User is not logged in, display login form popup
            <>
              <button onClick={handleCheckout}>Login to Checkout</button>
            
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
