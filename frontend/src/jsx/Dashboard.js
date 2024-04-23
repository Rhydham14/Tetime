import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../jsx/Sidebar";
import "../css/Dashboard.css";
import Footer from "../jsx/Footer";
import axiosInstance from "../Axios/axios";

const Dashboard = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/blogs/readblog");
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
          <div className="col-sm-10">
            <div id="bdtxt">
              <div className="d-flex justify-content-center align-items-center" style={{ perspective: "1000px" }}>
                <img src={require("../images/Rich Startup.png")} alt="Tetime Image" className="rotating-image" />
              </div>
              <h1 className="d-flex justify-content-center text-center">Welcome to</h1>
              <h1 className="text-danger text-center">Tetime</h1>
              <p className="text-center">Invest time and technology with your blogging skills</p>
            </div>
          </div>
        </div>
        <div className="row bg-light">
          <h3 className="text-center text-danger">Explore Blogs</h3>
          {blogData && blogData.length > 0 ? (
            blogData.map(blog => (
              <div key={blog._id} className="col-sm-6">
                <div className="card mb-3">
                  {/* Assuming 'blog.image' contains the image URL or Base64 data */}
                  <img src={`data:${blog.contentType};base64,${blog.imageData}`} className="card-img-top" style={{ height: "200px", objectFit: "cover" }}  alt={blog.title} />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    {/* <p className="card-text">{blog.discription}</p> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No blogs available</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
