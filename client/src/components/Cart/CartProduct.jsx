// CartProduct.js


import styles from './CartProduct.module.css';
import { useDispatch} from 'react-redux';
import {addItemToCart,removeItemFromCart} from '../../redux/cartReducer'

const CartProduct = ({ title, description, image,quantity,id,price,totalPrice }) => {
 
    
const dispatch=useDispatch()

  return (
    <div className={styles.cartProduct}>
      <img src={image} alt={title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>{title}</h2>
        <p className={styles.productDescription}>{description?.substring(0, 100)}</p>
      </div>
      <div className={styles.productCounter}>
        <button onClick={()=>dispatch(removeItemFromCart({_id:id,price}))} className={styles.counterButton}>
          -
        </button>
        <span className={styles.counterCount}>{quantity}</span>
        <button onClick={()=>dispatch(addItemToCart({_id:id,price}))} className={styles.counterButton}>
          +
        </button>
      </div>
      <div>
      <p style={{fontSize:'2rem'}} >Total: {totalPrice}$</p>
      </div>
      
    </div>
  );
};

export default CartProduct;
