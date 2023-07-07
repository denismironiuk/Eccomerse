import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product, { loader as singleProduct } from "./pages/Product/Product";
import Products, { loader as productsLoader } from "./pages/Products/Products";
import "./app.css"
import "react-toastify/dist/ReactToastify.css"
import Cart from "./components/Cart/Cart";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ErrorPaymentPage from "./pages/ErrorPaymentPage/ErrorPaymentPage";
import Layout, { catLoader, } from "./components/Layout/Layout";
import AuhenticationPage, { action as authAction } from "./pages/Authentication/Auhentication";
import { action as logoutAction } from './pages/Logout/Logout'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {replaceCart as replace} from './redux/cartReducer'
let firstRender = false
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: catLoader,

    children: [
      {
        index: true, element: <Home />
      },
      {
        path: "auth",
        element: <AuhenticationPage />,
        action: authAction
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
      {
        path: "/error",
        element: <ErrorPaymentPage />,
      },
      {
        path: 'logout',
        action: logoutAction
      },


      {
        path: "/products/:categoryName/:id",
        element: <Products />, loader: productsLoader
      },
      {
        path: "/product/:categoryName/:subcategoryName/:id",
        element: <Product />, loader: singleProduct
      },
    ],
  },
]);

function App() {

  const cart = useSelector((state) => state.cart)
  console.log(cart)
  const dispatch=useDispatch()
  useEffect(() => {

    console.log('in effect')
    const token = localStorage.getItem('token');
    const authHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    
    if (token) {
      if (!firstRender) {
        console.log('in first render')
        async function retrieveCart() {
          try {
            if(cart) {
              const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/cart`, {
                method: "GET",
                headers: authHeader
              })
  
             
         
              const resData =await response.json();
              const { cart } = resData;
              const cartItems = cart.items
              const persistedState = {
                items: cartItems,
                totalPrice: resData.cart.totalPrice,
                totalQuantity: resData.cart.totalQuantity,
              };
              console.log("here")
              // localStorage.setItem("persist:root", JSON.stringify(persistedState));
              dispatch(replace(persistedState))
            }
            
            
          } catch (e) {
            console.log('error')
          }
        }
        retrieveCart()
      }
      else {
        async function replaceCart(cartItems) {


          try {
            const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/cart`, {
              method: 'POST',
              headers: authHeader,
              body: JSON.stringify({ cartItems }),
            });

            if (!response.ok) {
              throw new Error('Failed to replace cart');
            }

            const responseData = await response.json();
            return responseData;
          } catch (error) {
            console.log(error);
            // Handle the error as needed
          }

        }
        replaceCart(cart)
      }



      
    }
    firstRender=true

  }, [cart,dispatch])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
