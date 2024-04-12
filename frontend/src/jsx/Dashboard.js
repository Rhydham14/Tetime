import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../jsx/Sidebar";
import "../css/Dashboard.css";
import { useLocation } from "react-router-dom";
import tetime from "../images/Rich Startup.png";
import Footer from "../jsx/Footer";
// import comp from "../images/computer.jpg";
import axios from "axios";
const Dashboard = () => {
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const fname = searchParams.get('fname');
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/blogs/readblog");
        console.log("Response:", response.data); // Log response data to console
        setBlogData(response.data); // Update blogData state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []); // Empty dependency array to run effect only once on component mount


  return (
    <>
      <div className="container-fluid" id="dash">
        <div className="row">
          <Sidebar />
          <div className="col-sm-10 ">
            <div id="bdtxt">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ perspective: "1000px" }}
              >
                <img
                  src={tetime}
                  alt="Description of the image"
                  className="rotating-image" // Apply a class for animation
                />
              </div>
              <h1 className="d-flex justify-content-center text-center">
                Welcome to
              </h1>
              <h1 className="text-danger text-center">Tetime</h1>
              <p className=" text-center">
                Invest time and technology with you bloging skill
              </p>
            </div>
          </div>
        </div>
        <div className="row bg-light">
        <h3 className="text-center text-danger">Expolore blog</h3>
        {blogData && blogData.length > 0 ? (
        blogData.map(blog => (
          <div key={blog.id}>
            <table style={{border:"solid"}}>
              <tr>
                <td style={{border:"solid"}}>
                  <h6>title: {blog.title}</h6>
                </td>
                <td style={{border:"solid"}}>
                   <h6> dis: {blog.discription}</h6>
                </td>
              </tr>
            </table>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
