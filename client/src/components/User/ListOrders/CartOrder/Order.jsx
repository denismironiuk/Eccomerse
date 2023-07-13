import React, { useState } from "react";
import styles from "./Order.module.css";
import OrderInfo from "../OrderInfo/OrderInfo";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const Order = ({order}) => {
    const date=new Date(order.createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const[isLoading,setIsLoading]=useState(false)
    const getOrderPdf = async (invoiceId) => {
        try {
            setIsLoading(true);
          const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/${invoiceId}/pdf`)
       
         if(response.ok){
            const blob = await response.blob();
            console.log(blob)
           
              const url = URL.createObjectURL(blob);
              window.open(url);
         }
        } catch (error) {
          // Handle any errors
          console.log(error);
        }
        finally {
            setIsLoading(false);
        }
      };

  return (

    
    <>
      <div className={styles.container__order}>
     
        <div className={styles.container__list}>
        <OrderInfo label="Order:" value={order._id}/> 
          <OrderInfo label="Date:" value={formattedDate} />
          <OrderInfo label="Total Price:" value={"$"+order.total/100} />

       
          <Link to={`invoice-transaction/${order._id}`}>Invoice</Link>
          <button onClick={()=>getOrderPdf(order._id)}>{isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              "Get Order PDF"
            )}</button>
        </div>
        
      </div>
    </>
  );
};

export default Order;
