import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import List from "../../components/List/List";
import styles from "./Products.module.css";

const Products = () => {
  const data = useLoaderData();
  const products = data.products;

  //  console.log(data);
  const catId = useParams().id;
  console.log(catId);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [subCategory, setSubcategories] = useState([]);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/subcategories/${catId}`)
      .then((response) => response.json())
      .then((resData) => {
        setSubcategories(resData.subcategories);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [catId]);

  const handleChange = (e) => {
    console.log("value: " + e.target.value, "checked: " + e.target.checked);
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    // Filter the products based on the selected subcategories, price range, and sorting
    const filterProducts = () => {
      let filteredProducts = products;

      // Filter by selected subcategories
      if (selectedSubCats.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          console.log(product);
          return selectedSubCats.includes(product.subcategory._id);
        });
      }
      console.log(filteredProducts);

      // Filter by price range
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );

      // Sort the products
      if (sort === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filteredProducts);
    };

    filterProducts();
  }, [selectedSubCats, products, maxPrice, sort]);

  return (
    <div className={styles.products}>
      <div className={styles["products__left"]}>
        <div className={styles.filterItem}>
          <h2>Product Categories</h2>
          {subCategory?.map((item) => (
            <div className={styles.inputItem} key={item._id}>
              <input
                type="checkbox"
                id={item._id}
                value={item._id}
                onChange={handleChange}
              />
              <label htmlFor={item._id}>{item.subcategoryName}</label>
            </div>
          ))}
        </div>
        <div className={styles.filterItem}>
          <h2>Filter by price</h2>
          <div className={styles.inputItem}>
            <span>1</span>
            <input
              type="range"
              min={1}
              value={maxPrice}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className={styles.filterItem}>
          <h2>Sort by</h2>
          <div className={styles.inputItem}>
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className={styles.inputItem}>
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>

      <div className={styles["products-right"]}>
        {/* <img
          className={styles.catImg}
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        /> */}
        <List products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;

export async function productsLoader({ request, params }) {
  const catId = params.id;

  console.log(catId);

  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/products/${catId}`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData;
  }
}
