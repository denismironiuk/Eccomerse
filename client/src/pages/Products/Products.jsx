import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {defer, useLoaderData } from "react-router-dom";
import List from "../../components/List/List";
import styles from "./Products.module.css";
import CategoriesList from "../../components/CategoriesList/CategoriesList";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import FilterListIcon from '@mui/icons-material/FilterList';
const Products = () => {
  const { subCat, products } = useLoaderData();
 
  const [sort, setSort] = useState('asc');
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showCategories, setShowCategories] = useState()

 

  const handleChange = 
    (id) => {
      setSelectedSubCats(id);
    }
    const handleChangeOrder = 
    (key) => {
      setSort(key);
    }
 
  useEffect(() => {
    const filterProducts = () => {
      let filteredProducts = [...products];

      // Filter by selected subcategories
      if (selectedSubCats.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedSubCats.includes(product.subcategory._id)
        );
      }

      // Sort the products
      if (sort === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filteredProducts);
    };

    filterProducts();
   
  }, [products, sort,selectedSubCats ]);
 
  return (
   
   
    
<div className={styles.container}>

  <div className={styles.filter}>
    <div className={styles.filter__option} onClick={()=>setShowCategories(prev=>!prev)}>
      <FilterListIcon/>
      <h2>Filter</h2>
     {showCategories && <CategoriesList
              subCategory={subCat}
             handleChange={handleChange}
            />} 
    </div>
    <div className={styles.filter__sort}>
      <div>
      <h2>Sort by</h2>
     <CustomSelect setSort={handleChangeOrder}/>
     </div>
    </div>
  </div>
      
       {filteredProducts && <List products={filteredProducts} />} 
     
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
    subCat: await loadSubCat(catId),
    products: await loadProducts(catId),
  });
}
