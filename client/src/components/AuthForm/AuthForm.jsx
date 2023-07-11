import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import { useState } from "react";

function AuthForm({ onSubmitHandler }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      name
    };

    onSubmitHandler(data);
    setPassword("");
    setEmail("");
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.error && (
          <ul>
            {Object.values(data.error).map((err) => (
              <li key={err}>{err.msg}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        {!isLogin && (
          <p>
            <label htmlFor="image">Name</label>
            <input
              id="password"
              type="text"
              name="password"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </p>

        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`} type="button">
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
