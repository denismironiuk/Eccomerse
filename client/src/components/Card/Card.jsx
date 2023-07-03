import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {

  return (
    <Link className="link" to={`/product/${item.category.categoryName}/${item.subcategory.subcategoryName}/${item._id}`}>
      <div className="card">
        <div className="image">
         
          <img
            src={
              item?.image
            }
            alt=""
            className="mainImg"
          />
          
        </div>
        <h2>{item?.name}</h2>
        <div className="prices">
          <h3>${item.price}</h3>
       
        </div>
      </div>
    </Link>
  );
};

export default Card;
