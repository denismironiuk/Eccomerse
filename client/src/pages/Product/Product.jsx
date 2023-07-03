import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./Product.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;

  const [product, setProduct] = useState({});
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleProduct = async (id) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/product/${id}`
        );
        const resData = await response.json();
        console.log(resData);
        setProduct(resData.product);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleProduct(id);
  }, [id]);

  return (
    <div className={styles.product}>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className={styles.left}>
            <div className={styles.mainImg}>
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className={styles.right}>
            <h1>{product.name}</h1>
            <span className={styles.price}>${product.price}</span>
            <p>{product.description}</p>

            <button
              className={styles.add}
              onClick={() =>
                dispatch(
                  addItemToCart({
                    _id: product._id,
                    name: product.name,
                    desc: product.description,
                    price: +product.price,
                    img: product.image,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
