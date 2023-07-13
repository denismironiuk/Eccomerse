import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CircularProgress } from "@mui/material"; // Import CircularProgress from MUI
import classes from "./AuthForm.module.css";
import { useState } from "react";

function AuthForm({ onSubmitHandler, data, setError }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const shouldShowEmptyError = isSubmitted && Object.values(getValues()).every((value) => value.trim() === "");

  const onSubmit = async (formData) => {
    setIsSubmitted(true);
    try {
      await onSubmitHandler(formData);
      reset();
      navigate("/");
    } catch (error) {
      setError(error);
    }
    setIsSubmitted(false);
  };

  const handleLinkClick = () => {
    setError(null);
    setIsSubmitted(false);
    reset();
  };

  return (
    <div className={classes.container}>
      <h1>Login</h1>
      {data && data.message && <p className={classes.error}>{data.message}</p>}
      {data && data.error && (
        <ul>
          {data.error.map((error, index) => (
            <li key={index}>
              <p className={classes.error}>{error.msg}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit(onSubmit)} method="POST" className={classes.form}>
        {!isLogin && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Please enter your name",
                pattern: {
                  value: /^\S+$/,
                  message: "Please enter only your name",
                },
              })}
              className={shouldShowEmptyError && getValues("name") === "" ? classes.errorInput : ""}
            />
            {errors.name && <p className={classes.error}>{errors.name.message}</p>}
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Please enter your email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            className={shouldShowEmptyError && getValues("email") === "" ? classes.errorInput : ""}
          />
          {errors.email && <p className={classes.error}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            className={shouldShowEmptyError && getValues("password") === "" ? classes.errorInput : ""}
          />
          {errors.password && <p className={classes.error}>{errors.password.message}</p>}
        </div>

        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} type="button" onClick={handleLinkClick}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button type="submit">
            {isSubmitted ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
