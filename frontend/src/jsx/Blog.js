import React, { useEffect, useState } from "react";
import Sidebar from "../jsx/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../jsx/Footer";

const columns = [
  { field: "title", headerName: "Title" }
];

const Blog = () => {
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const user_id = sessionStorage.getItem("user_id");
        const response = await axios.get(`http://localhost:4000/api/blogs/userblog?user_id=${user_id}`);

        if (response.data) {
          setUserBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    fetchUserBlogs();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-sm-10">
          <h1 className="text-danger text-center">Tetime</h1>
          <h3 className="text-dark text-center">Blog of the Time</h3>
          <Link to="/createblog" id="lnk">
            <button className="btn btn-success m-2">Add Blog</button>
          </Link>
          <table className="table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.field}>{column.headerName}</th>
                ))} 
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userBlogs.map((blog) => (
                <tr key={blog._id}>
                  {columns.map((column) => (
                    <td key={`${blog._id}-${column.field}`}>{blog[column.field]}</td>
                  ))}
                  <td>
                    <Link to={`/ReadBlog/${blog._id}`} className="btn btn-dark m-2">
                      Preview
                    </Link>
                    <button className="btn btn-success m-2">Update</button>
                    <button className="btn btn-danger m-2">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
