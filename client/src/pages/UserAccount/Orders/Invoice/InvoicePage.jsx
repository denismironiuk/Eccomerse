import React, { useEffect, useState } from 'react'
import Invoice from '../../../../components/User/ListOrders/CartOrder/Invoice/Invoice'
import { useParams } from 'react-router-dom'

const InvoicePage = () => {
const[invoice,setInvoice]=useState()
  const {invoiceId}=useParams()

  console.log(invoiceId)
useEffect(()=>{
  async function getInvoice(){
    try{
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/order/${invoiceId}/invoice`)

      if(response.ok){
        const resData=await response.json()
        setInvoice(resData)
      }
    }
    catch(err){
      console.log(err)
    }
    

  }
getInvoice()
},[invoiceId])

  return (
   <Invoice invoice={invoice}/>
  )
}

export default InvoicePage

