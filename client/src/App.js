import { useState,useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products, { productsLoader } from "./pages/Products/Products";
import  "./app.css"
import "react-toastify/dist/ReactToastify.css"
import { replaceCart } from "./redux/cartReducer";
import Cart from "./components/Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ErrorPaymentPage from "./pages/ErrorPaymentPage/ErrorPaymentPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Layout, { catLoader, loader } from "./components/Layout/Layout";




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>, loader:catLoader,
    children: [
      {
        index:true,
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "/success",
        element: <SuccessPage/>,
      },
      {
        path: "/error",
        element: <ErrorPaymentPage/>,
      },
  
      {
        path: "/products/:categoryName/:id",
        element: <Products />, loader:productsLoader
      },
      {
        path: "/product/:categoryName/:subcategoryName/:id",
        element: <Product />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState("");
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    // Check if the sessionId exists in localStorage
    const existingSessionId = localStorage.getItem("sessionId");

    if (existingSessionId) {
      setSessionId(existingSessionId);
    } else {
      // Generate a new sessionId
      const newSessionId = uuidv4();
      localStorage.setItem("sessionId", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionId) {
        const response = await fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/cart?sessionId=${sessionId}`
        );
        const data = await response.json();
        dispatch(replaceCart(data.cart));
      }
    };
    fetchData();
  }, [sessionId,dispatch]);

  useEffect(() => {
    if (sessionId) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/cart/${sessionId}`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(cart),
      });
    }
  }, [cart,sessionId]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
