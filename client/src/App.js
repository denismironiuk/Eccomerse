import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as products } from "./pages/Home/Home";
import Product, { loader as singleProduct } from "./pages/Product/Product";
import Products, { loader as productsLoader } from "./pages/Products/Products";
import "./app.css"
import "react-toastify/dist/ReactToastify.css"
import Cart from "./components/Cart/Cart";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ErrorPaymentPage from "./pages/ErrorPaymentPage/ErrorPaymentPage";
import Layout, { catLoader, } from "./components/Layout/Layout";
import AuhenticationPage from "./pages/Authentication/Auhentication";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replaceCart as replace } from './redux/cartReducer'
import UserLayout from "./components/User/UserLayout/UserLayout";
import UserAvatarPage from "./pages/UserAccount/UserAvatar/UserAvatarPage";
import AccountSecurityPage from "./pages/UserAccount/Account/AccountSecurity";
import OrdersPage from "./pages/UserAccount/Orders/Orders";
import { checkAuthLoader } from "./components/utils/auth";
import InvoicePage from "./pages/UserAccount/Orders/Invoice/InvoicePage";
let firstRender = false
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: catLoader,

    children: [
      {
        index: true,
        element: <Home />,
        loader: products
      },
      {
        path: "auth",
        element: <AuhenticationPage />,

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
        path: "/dashboard/purchase-history",
        element: <OrdersPage />, loader: checkAuthLoader
      },
      {
        path: "/dashboard/purchase-history/invoice-transaction/:invoiceId",
        element: <InvoicePage />, loader: checkAuthLoader
      },


      {
        path: "/products/:categoryName/:id",
        element: <Products />, loader: productsLoader
      },
      {
        path: "/product/:categoryName/:subcategoryName/:id",
        element: <Product />, loader: singleProduct
      },
      {
        path: "/user",
        element: <UserLayout />,
        loader: checkAuthLoader,
        children: [
          {
            index: true,
            element: <UserAvatarPage />,
            loader: checkAuthLoader,
          },
          {
            path: "account", element: <AccountSecurityPage />, loader: checkAuthLoader,
          },
          {
            path: "orders", element: <OrdersPage />, loader: checkAuthLoader,
          }, {
            path: "orders/invoice-transaction/:invoiceId", element: <InvoicePage />, loader: checkAuthLoader,
          }
        ]

      },
    ],
  },
]);

function App() {

  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  useEffect(() => {
    const token = localStorage.getItem('token');
    const authHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    if (token) {
      if (!firstRender) {
        console.log('first render')
        async function retrieveCart() {
          try {
            if (cart) {
              const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/cart`, {
                method: "GET",
                headers: authHeader
              })
              const resData = await response.json();
              const { cart } = resData;
              const cartItems = cart.items
              const persistedState = {
                items: cartItems,
                totalPrice: resData.cart.totalPrice,
                totalQuantity: resData.cart.totalQuantity,
              };

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
    firstRender = true

  }, [cart, dispatch])

  return (
    
      <RouterProvider router={router} />
   
  );
}

export default App;
