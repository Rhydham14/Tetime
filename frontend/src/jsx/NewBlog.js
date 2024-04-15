import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom";
import '../css/NewBlog.css';

const NewBlog = () => {
  const storedEmail = sessionStorage.getItem("email");
  const [blogData, setBlogData] = useState({
    title: '',
    discription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const dataToSend = {
        ...blogData,
        email: storedEmail, // Include storedEmail in the data to send
      };

      const response = await axios.post("http://localhost:4000/api/blogs/writeblog", dataToSend);

      setBlogData({
        title: "",
        discription: "",
      });

      if (response) {
        alert("Blog added successfully");
      } else {
        alert("Failed to add blog");
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to add blog");
    }
  };

  return (
    <div className="container-fluid">
      <button className="btn btn-dark mt-2">
        <Link to="/Blog" id="lnk" ><ChevronLeftIcon/>Back</Link>
      </button>
      <h1 className="text-danger text-center">Tetime</h1>
      <div className="row pt-2" id="p">
        <h1 id="blog">Create new Blog post</h1>
        <div className="col-sm-12">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="titleHelp"
                placeholder="Enter title"
                onChange={handleChange}
                value={blogData.title}
              />
            </div>
            <div className="form-group mt-2">
              <label>Add Image</label><br/>
              <input
                type="file"
                id="imageInput"
                name="image"
                accept="image/*"
                // onChange={handleImageChange}
              />
            </div>
            <div className="form-group mt-2 w-100">
              <label htmlFor="discription">Description</label>
              <textarea
                className="form-control"
                id="discription"
                name="discription"
                placeholder="Description"
                style={{ height: "200px" }}
                onChange={handleChange}
                value={blogData.discription}
              />
            </div>
            <button type="submit" className="btn btn-success mt-2">
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
