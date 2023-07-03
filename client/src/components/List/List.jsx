import React, { useState,useEffect,useMemo } from "react";
import "./List.scss";
import Card from "../Card/Card";


const List = ({ subCats, maxPrice, sort, catId,products }) => {
//  const[products,setProducts]=useState([])


//  const fetchProducts = useMemo(
//   () =>
//     async () => {
//       try {
//         const response = await fetch(process.env.REACT_APP_API_ENDPOINT+`/products/${catId}`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             maxPrice: +maxPrice,
//             sort: sort,
//             subCats,
//           }),
//         });
//         const data = await response.json();
//         setProducts(data.products);
//       } catch (error) {
//         console.log(error);
//       }
//     },
//   [catId, maxPrice, sort, subCats]
// );

// useEffect(() => {
//   const debounceTimeout = setTimeout(fetchProducts, 500); // Delay execution by 500ms

//   return () => clearTimeout(debounceTimeout); // Cleanup function to clear the timeout
// }, [fetchProducts]);
  return (
    <div className="list">
      { products?.map((item) => <Card item={item}  key={item._id} />)}
    </div>
  );
};

export default List;
