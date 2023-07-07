import React, { useContext } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { json, redirect } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";

const AuhenticationPage = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default AuhenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();
  let authData;
  let persistedState;
  
    const persistedStateJSON = localStorage.getItem("persist:root"); // Access the serialized state from localStorage
    persistedState = JSON.parse(persistedStateJSON);
    
   
    authData = {
      email: data.get("email"),
      password: data.get("password"),

      cart: {
        items: JSON.parse(persistedState.items),
        totalPrice: persistedState.totalPrice,
        totalQuantity: persistedState.totalQuantity,
      },
    };
  
  
  

  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/${mode}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    }
  );

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();

  console.log(resData);
  const {token,cart} = resData;
  const cartItems=cart.items
   persistedState = {
    items: JSON.stringify(cartItems),
    totalPrice: resData.cart.totalPrice,
    totalQuantity: resData.cart.totalQuantity,
  };
  localStorage.setItem("persist:root", JSON.stringify(persistedState));

  localStorage.setItem("token", token);

   return window.location.href='http://localhost:3000'
}
