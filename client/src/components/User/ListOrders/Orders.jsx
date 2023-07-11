import React from "react";
import styles from "./Orders.module.css";


import Order from "./CartOrder/Order";
const Orders = ({orders}) => {


  return (
    <div className={styles.container}>
         <h2>Purchase history</h2>
         <div className={styles.container__order}>
          {(!orders || orders.length===0) && <p>You dont have any orders yet!!!</p>}
         {orders?.map((order) =>{
        
        return <Order key={order._id} order={order}/>
      })}
         </div>
     
 
    </div>
  );
};

export default Orders;
