import { useLocation, useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import styles from './SearchPage.module.css'

const SearchPage = () => {
   const[searchParams]=useSearchParams()
  const location = useLocation();
  console.log(searchParams.get("src"))
  const filteredProducts = location?.state?.filteredProducts;

  return (
   <div className={styles.search__container}>
   
   <div className={styles.search__results}>
    <header>
      <h1>{filteredProducts.length} results for "{searchParams.get("src")}"</h1>
    </header>
   </div>
    <div className={styles.search__list}>
      { filteredProducts?.map((item) => <Card item={item}  key={item._id} />)}
    </div>
   </div>
    
   
  );
};

export default SearchPage;