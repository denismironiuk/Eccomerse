import styles from "./Invoice.module.css";
import Logo from "../../../../../assets/EasyStore.webp";

const Invoice = ({ invoice }) => {
  console.log(invoice);
  return (
    <div className={styles["container"]}>
      <div className={styles.wrapper}>
        <div className={`${styles.first__block} ${styles.flex}`}>
          <div className={styles.logo}>
            <img src={Logo} alt="logo" width={"100px"} />
          </div>
          <div className={styles.invoice}>
            <h1>INVOICE</h1>
            <p>
              {" "}
              <strong>Invoice #:</strong> {invoice?._id}
            </p>
            <p>
              <strong>Invoice date:</strong> {invoice?.createdAt}
            </p>
          </div>
        </div>
        <div className={`${styles.second__block} ${styles.flex}`}>
          <div className={styles.description}>
            <h2>Provided by:</h2>
            <p>Easy Store</p>
            <p>Israel, Haifa</p>
          </div>
          <div className={styles.description}>
            <h2>Provided to:</h2>
            <p>{invoice?.shipping?.name}</p>
          </div>
        </div>
        <div className={`${styles.third__block} ${styles.flex}`}>
          <span>Description</span>
          <span>Amount</span>
          <span>Price</span>
          <span>Total Price</span>
        </div>
        {invoice?.products.map((product) => (
          <div className={`${styles.third__block}`}>
            <p>{product.name}</p>
            <p>{product.quantity}</p>
            <p>${product.price}</p>
            <p>${product.quantity * product.price}</p>
          </div>
        ))}
        <div className={`${styles.fourth__block} `}>
            <h2>Total Paid:</h2>
            <p>56$</p>
            </div>
      </div>
    </div>
  );
};

export default Invoice;
