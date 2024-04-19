import React, { useState } from "react";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";

const NewBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    file: null, // Store file object in state
    discription: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const file = files && files[0]; // Get the first selected file

    setBlogData((prevData) => ({
      ...prevData,
      [name]: name === "file" ? file : value, // Update image state with file object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("discription", blogData.discription);
      formData.append("file", blogData.file);

      const response = await axios.post("http://localhost:4000/api/blogs/writeblog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data);
      alert("Blog added successfully!");

      setBlogData({
        title: "",
        file: null,
        discription: "",
      });
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container-fluid">
      <button className="btn btn-dark mt-2">
        <Link to="/Blog" style={{ color: "white", textDecoration: "none" }} id="lnk">
          <ChevronLeftIcon />
          Back
        </Link>
      </button>
      <h1 className="text-danger text-center">Tetime</h1>
      <div className="row pt-2">
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
                value={blogData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-2">
              <label>Add Image</label>
              <br />
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleChange}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="discription">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="discription"
                name="discription"
                placeholder="Description"
                style={{ height: "200px" }}
                value={blogData.discription}
                onChange={handleChange}
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
