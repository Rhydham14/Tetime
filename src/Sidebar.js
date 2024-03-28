import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "./free-avatar-380-456332.png";
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';

const img = {
  height: "150px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
};

const Sidebar = () => {
  const navigate = useNavigate();
  // const searchParams = new URLSearchParams(location.search);
  // const fname = searchParams.get('fname');
  const storedFname = sessionStorage.getItem("fname");
  console.log("----------------", storedFname);

  const handleLogout =()=>{
    const name =sessionStorage.removeItem('fname');
  console.log("@@@@@", name);
  localStorage.getItem('name', name);

  }
  console.log("*****************", storedFname);

  return (
    <div className="col-sm-2" id="shadow">
      <nav className="vertical-nav text-center p-3 pt-2" id="navbar">
        <ul className="nav flex-column" />

        <li id="list">
          <img src={image} alt="User Image" id="img" style={img} />
        </li>
        <li id="list" style={{ color: "green", textDecoration: "underline " }}>
          {storedFname}
        </li>
        <li id="list" className="nav-item active ">
          <Link
            to="/dashboard"
            id="link"
            className="nav-link demo text-dark text-md"
          >
            Dashboard
          </Link>
        </li>
        <li id="list" className="nav-item active ">
          <Link
            to="/blog"
            id="link"
            className="nav-link demo text-dark text-md"
          >
            Blog
          </Link>
        </li>
        {storedFname !== null ? (
                  <li id="list" className="nav-item active ">
                  <Link
                    to="/dashboard"
                    id="link"
                    className="nav-link demo text-white bg-danger text-md"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
        ):(
          <li id="list" className="nav-item active ">
          <Link
            to="/"
            id="link"
            className="nav-link demo text-white bg-danger text-md"
            onClick={handleLogout}
          >
            Login
          </Link>
        </li>
        )}

      </nav>
    </div>
  );
};

export default Sidebar;
