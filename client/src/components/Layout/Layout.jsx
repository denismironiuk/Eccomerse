import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet, defer, useLoaderData } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  const { category, products, error } = useLoaderData();



  return (
    <div className="app">
      <ToastContainer />
      <Navbar categories={category} products={products} />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

export async function catLoader() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/category`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories. Status: ${response.status}`);
    }

    const resData = await response.json();
    return resData.categories;
  } catch (error) {
    console.error('Error loading categories:', error.message);
    throw error;
  }
}

export async function allProducts() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const resData = await response.json();
    return resData.products;
  } catch (error) {
    console.error('Error loading products:', error.message);
    throw error;
  }
}

export async function loader() {
  try {
    const categoryPromise = catLoader();
    const productsPromise = allProducts();

    const [category, products] = await Promise.all([categoryPromise, productsPromise]);

    return {
      category,
      products,
      error: null,
    };
  } catch (error) {
    console.error('Error loading data:', error.message);
    return {
      category: null,
      products: null,
      error,
    };
  }
}
