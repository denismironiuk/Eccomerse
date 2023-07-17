import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <Link className={styles.link} to={`/product/${item.category.categoryName}/${item.subcategory?.subcategoryName}/${item._id}`}>
      <div className={styles.card}>
        <div className={styles.image}>
          <img
            src={item?.image?.secure_url}
            alt=""
            className={styles.mainImg}
          />
        </div>
        <h2>{item?.name}</h2>
        <div className={styles.prices}>
          <h3>${item.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
