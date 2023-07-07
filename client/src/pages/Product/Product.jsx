import styles from "./Product.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useLoaderData} from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/cartReducer";

const Product = () => {
  const product = useLoaderData();

  const dispatch = useDispatch();

  return (
    <div className={styles.product}>
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
    </div>
  );
};

export default Product;

export async function loader({ request, params }) {
  
  const prodId = params.id;
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/product/${prodId}`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.product;
  }
}
