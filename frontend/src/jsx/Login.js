import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../Axios/axios";
import "../css/Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/users/login", credentials);
      const { success, message, fname, user_id, token, refreshToken } = response.data;

      if (success && fname) {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("user_id", user_id);
        sessionStorage.setItem("fname", fname);
        navigate("/dashboard");
      } else {
        setError(message || "Login incorrect");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-danger text-center">Tetime</h1>
      <div className="row mx-auto d-flex justify-content-center">
        <div className="col-sm-12 p-5 mx-auto" id="text">
          <h1 className="login" id="login">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={credentials.email}
                onChange={handleChange}
              />
              <small className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-dark mt-2">
              Submit
            </button>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <Link to="/dashboard">Dashboard</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

