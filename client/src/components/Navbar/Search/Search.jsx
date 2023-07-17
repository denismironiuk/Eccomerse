import React, { useState, useEffect, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
const Search = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const navigate = useNavigate();
console.log(searchQuery.length)

  const handleSearch = (e) => {
    setShowSearchBar(true)
    const query = e.target.value;
    setSearchQuery(query);
    if (query === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

 useMemo(() => {
    if (searchQuery === "") {
        setFilteredProducts([]);
      }
      else{
        const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      }
   
  }, [searchQuery, products]);

  const handleItemClick = () => {
    navigate(`/search/?src=${searchQuery}`, {
      state: {
        filteredProducts,
      },
      search: searchQuery
    });
    setShowSearchBar(false)
   
  };

  return (
    <div className={styles.search__container}>
      <input
        className={styles.search__input}
        onChange={handleSearch}
        value={searchQuery}
        type="search"
        placeholder="Search ..."
      />
      <i onClick={() => handleItemClick()}>
        <SearchIcon />
      </i>

      {searchQuery && showSearchBar &&  (
        <div
          className={styles.filtered__container}
          // className={`w-full mx-auto h-96 bg-white top-16 absolute left-0 z-50 overflow-y-scroll shadow-2xl scrollbar-hide cursor-pointer border-[1px] border-red-900`}
        >
          {searchQuery &&  
            filteredProducts.map((item) => {
              return (
                <div
                  onClick={() =>
                    navigate(
                      `product/${item?.category?.categoryName}/${item?.subcategory?.subcategoryName}/${item._id}`,

                      {
                        state: {
                          item: item,
                        },
                      }
                    ) &
                   
                    setSearchQuery("")
                  }
                  key={item._id}
                  //   className="max-w-[600px] h-28 bg-gray-100 mb-3 flex items-center gap-3 "
                  className={styles.item__container}
                >
                  <img src={item.image?.secure_url} alt="productImg" />
                  <div className={styles.item}>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-xs">{item.des}</p>
                    <p className="text-sm">
                      Price:{" "}
                      <span className="text-primeColor font-semibold">
                        ${item.price}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Search;
