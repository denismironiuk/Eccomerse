import AuthForm from "../../components/AuthForm/AuthForm";
import { json, useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { replaceCart } from "../../redux/cartReducer";
import LoadingPage from "../LoadingPage/LoadingPage";

const AuhenticationPage = () => {
  const cartData = useSelector((state) => state.cart);
  const { login } = useContext(AuthContext);
const [isloading,setIsLoading] =useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errData, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode" }, { status: 422 });
  }

  console.log(errData)

  const onSubmitHandler = async (data) => {
  
    let userData;
    if (mode === "login") {
      userData = {
        email: data.email,
        password: data.password,
        cart: cartData,
      };
    } else {
      userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        cart: cartData,
      };
    }
setIsLoading(true)
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/${mode}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if(!response.ok){
        
        const errorData = await response.json();
        setError(errorData)
        throw new Error(errorData);
      }

      
      

      const resData = await response.json();
      const { token, cart, user } = resData;
      login(token, user);

      const cartItems = cart.items;
      const persistedState = {
        items: cartItems,
        totalPrice: resData.cart.totalPrice,
        totalQuantity: resData.cart.totalQuantity,
      };

      dispatch(replaceCart(persistedState));
      if (mode === "login") {
        navigate("/");
      }
      setError(null)
      navigate("/");
      setIsLoading(false)
    } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      const errorMessage = err.response.data.error[0].msg;
      console.log(errorMessage);
      
    } else {
      console.log(err.message);
     
    }
    }finally{
      
    }
  

  }
  return (
    <div>
      <AuthForm onSubmitHandler={onSubmitHandler} data={errData} setError={setError} />
      
    </div>
  );
};

export default AuhenticationPage;
