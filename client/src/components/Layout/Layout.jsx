import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet, defer, useLoaderData } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import NavbarEnd from "../Navbar/NavbarEnd";
const Layout = () => {
  const {category,products} = useLoaderData();


  return (
    <div className="app" >
        <ToastContainer/>
      <Navbar categories={category}  products={products}/>
   
      <main className="main">
      <Outlet  />
      </main>
      
      <Footer />
    
    </div>
  );
};
export default Layout;

export async function catLoader() {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/category`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.categories;
  }
}

export async function allProducts() {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/products`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.products;
  }
}

export async function loader(){
return defer({
  category:await catLoader(),
  products:await allProducts()
})
}