import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'

import Orders from '../../../components/User/ListOrders/Orders'
import AuthContext from '../../../context/authContext'


const OrdersPage = () => {
const [orders,setOrders]=useState([])
const {token} =useContext(AuthContext)

useLayoutEffect(()=>{
  async function getOrders(){
    
    const authHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try{
      const response=await fetch(process.env.REACT_APP_API_ENDPOINT+'/orders',{
        headers:authHeader,
     

      })
      if(!response.ok){
      
      }
  
      const resData=await response.json()
      setOrders(resData.orders)
    }
    catch(err){
      console.log(err)
    }
    
    
    }
    getOrders()
},[token])
  return (

  <Orders orders={orders}/>

  )
}

export default OrdersPage

