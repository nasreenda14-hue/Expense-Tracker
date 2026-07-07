import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";
import ProtectedRoute from "./routes/ProtecterdRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
export default App;
