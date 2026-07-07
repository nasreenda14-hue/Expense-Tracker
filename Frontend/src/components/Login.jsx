import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid Email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be atleast 8 characters";
    }
    setError(newErrors);
    console.log(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log(isValid);

    if (isValid) {
      axios
        .post("http://localhost:5000/api/user/login", { email, password })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          navigate("/expenses");
        })
        .catch((err) => {
          setLoginError(err.response?.data?.message || "Login failed");
        });

      setEmail("");
      setPassword("");
    }
  };
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/expenses"); 
    }
  }, []);
  return (
    <div>
      <h1>Login</h1>
      <div>
        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p>{error.email}</p>
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p>{error.password}</p>
          <button>Login</button>
        </form>
        <p className="para">
          Don't have an account?
          <span>
            <Link to="/register">Sign up</Link>
          </span>
        </p>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;
