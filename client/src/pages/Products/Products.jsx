import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import List from "../../components/List/List";
import styles from "./Products.module.css";
import CategoriesList from "../../components/CategoriesList/CategoriesList";

const Products = () => {
  const { subCat, products } = useLoaderData();
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleChange = (e) => {
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
      // console.log(filteredProducts);

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
        <Suspense>
          <Await resolve={subCat}>
            {(loadedSubCat) => (
              <CategoriesList
                subCategory={loadedSubCat}
                handleChange={handleChange}
              />
            )}
          </Await>
        </Suspense>
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
        <List products={filteredProducts} />
      </div>
    </div>
  );
};

export default Products;

export async function loadSubCat(catId) {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/subcategories/${catId}`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.subcategories;
  }
}

export async function loadProducts(catId) {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/products/${catId}`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.products;
  }
}

export async function loader({ request, params }) {
  const catId = params.id;
  return defer({
    subCat: loadSubCat(catId),
    products: await loadProducts(catId),
  });
}
