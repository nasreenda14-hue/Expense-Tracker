import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid Email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be atleast 6 characters";
    }

    setError(newErrors);

    const isValid = Object.keys(newErrors).length === 0;

    if (isValid) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/user/login`, {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard");
        })
        .catch((err) => {
          setLoginError(err.response?.data?.message || "Login failed");
        });

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#1a1a1a] shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Login to Wallet
        </h2>

        {loginError && (
          <p className="text-red-500 text-sm text-center mb-3">{loginError}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p className="text-red-400 text-xs mt-1">{error.email}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <p className="text-red-400 text-xs mt-1">{error.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-lime-500 text-black font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-400 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
