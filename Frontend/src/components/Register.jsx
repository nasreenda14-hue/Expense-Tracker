import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    }
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

    if (isValid === true) {
      const userData = {
        name,
        email,
        password,
      };

      console.log(userData);
      axios
        .post("http://localhost:5000/api/user/register", userData)
        .then(
          (res) => localStorage.setItem("token", res.data.token),
          alert("Registration successful"),
          navigate("/"),
        )
        .catch((err) => console.log(err));
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <div>
        <form
          action=""
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label htmlFor="">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
          />
          <p>{error.name}</p>
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
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
              console.log(password);
            }}
          />
          <p>{error.password}</p>
          <button>Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
