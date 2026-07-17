import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [registerError, setRegisterError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter valid Email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be atleast 6 characters";
    }

    setError(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      axios
        .post("http://localhost:5000/api/user/register", formData)
        .then((res) => {
          alert("Registered Successfully!");
          navigate("/");
        })
        .catch((err) => {
          setRegisterError(err.response?.data?.message || "Register failed");
        });

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#1a1a1a] shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Create Account
        </h2>

        {registerError && (
          <p className="text-red-500 text-sm text-center mb-3">
            {registerError}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.name && (
              <p className="text-red-400 text-xs mt-1">{error.name}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.email && (
              <p className="text-red-400 text-xs mt-1">{error.email}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-green-500"
            />
            {error.password && (
              <p className="text-red-400 text-xs mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-lime-500 text-black font-semibold hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-green-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
