import AuthForm from "../../components/AuthForm/AuthForm";
import { json, useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { replaceCart } from "../../redux/cartReducer";

const AuhenticationPage = () => {
  const cartData = useSelector((state) => state.cart);
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setdata] = useState([]);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  const onSubmitHandler = async (data) => {
    let userData;
    if (mode === "login") {
      userData = {
        email: data.email,
        password: data.password,
        cart: cartData,
      };
    }
    else{
      userData={
        name: data.name,
        email: data.email,
        password: data.password,
        cart: cartData,
      }
    }
    

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/${mode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.status === 422 || response.status === 401) {
        return response;
      }
      if (!response.ok) {
        throw json(
          { message: "Could not authenticate user." },
          { status: 500 }
        );
      }

      const resData = await response.json();
      const { token, cart, user } = resData;
      login(token, user);

      
              const cartItems = cart.items
              const persistedState = {
                items: cartItems,
                totalPrice: resData.cart.totalPrice,
                totalQuantity: resData.cart.totalQuantity,
              };
            
         

      dispatch(replaceCart(persistedState));
      if(mode === "login"){
        navigate('/');
      }
      navigate(-1);
    } catch (err) {
      setdata(err);
    }
  };
  return (
    <div>
      <AuthForm onSubmitHandler={onSubmitHandler} data={data} />
    </div>
  );
};

export default AuhenticationPage;
