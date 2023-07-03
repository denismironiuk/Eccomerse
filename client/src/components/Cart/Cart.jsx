import React from "react";
import styles from "./Cart.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { emptyCard } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";

import CartProduct from "./CartProduct";

const Cart = () => {
  const products = useSelector((state) => state.cart.items);
  const { totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(products);
  if (totalQuantity === 0)
    return (
      <div className={styles.empty}>
        <p>Empty Cart</p>
      </div>
    );

  const handleCheckout = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/create-checkout-session", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        products: products.map(product =>{
          return {
            id: product._id,
            name: product.name,
            price:product.price,
            quantity:product.quantity,
            img: product.img
          }
        }),
        id:localStorage.getItem("sessionId")
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
      
        window.location.href = resData.session.url;
        console.log(resData);
      });
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
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
