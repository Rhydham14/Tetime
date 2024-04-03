import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Sidebar";
import "./Dashboard.css";
import { useLocation } from 'react-router-dom';
import tetime from './Rich Startup.png';
import Footer from './Footer';
import comp from './computer.jpg';

const Dashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fname = searchParams.get('fname');
  return (
    
    <>
      <div className="container-fluid" id="dash" >
        <div className="row" >
          <Sidebar />
          <div className="col-sm-10 ">

            <div id="bdtxt">
            <div className="d-flex justify-content-center align-items-center"  style={{ perspective: '1000px' }}>
      <img
        src={tetime}
        alt="Description of the image"
        className="rotating-image" // Apply a class for animation
      />
    </div>             <h1 className="d-flex justify-content-center text-center">
                Welcome to
              </h1>
              <h1 className="text-danger text-center">Tetime</h1>
              <p className=" text-center">
                Invest time and technology with you bloging skill
              </p>
              <p>{fname}</p>
            </div>
          </div>
          <img
        src={comp}
        alt="Description of the image"
      />
        </div>
      </div>
        <Footer/>
    </>
  );
};

export default Dashboard;