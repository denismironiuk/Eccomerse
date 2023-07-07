import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
const Layout = () => {
  const data = useLoaderData();
  const categories = data.categories;

  return (
    <div className="app" >
        <ToastContainer/>
      <Navbar categories={categories} />
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
    `${process.env.REACT_APP_API_ENDPOINT}/featured`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData;
  }
}
