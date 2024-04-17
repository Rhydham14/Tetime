import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import "../css/NewBlog.css";

const NewBlog = () => {
  const [blodData, setBlogData] = useState({
    title: "",
    // image: '',
    discription: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blodData, [name]: value });
  };  
  
  const handleSubmit = async () => {
    try {
    const user_id = sessionStorage.getItem('user_id');
      const allData = {...blodData, user_id};
      const response = await axios.post(
        "http://localhost:4000/api/blogs/writeblog",
        allData
        );
        // console.log("responseeee",response.data);
      if(response.data){
        alert("Blod added succefully");
      }else{
        alert("Somthing went wrong!!");

      }
      setBlogData({
        title: "",
        discription: "",
      });
 

    } catch (e) {
      console.error("Erro for submiting blog", e);
    }
  };
  return (
    <>
      <div className="container-fluid">
        <button className="btn btn-dark mt-2">
          <Link to="/Blog"style={{color:"white", textDecoration:"none"}} id="lnk">
            <ChevronLeftIcon />
            Black
          </Link>
        </button>
        <h1 className="text-danger text-center">Tetime</h1>
        <div className="row pt-2" id="p">
          <h1 id="blog">Create new Blog post</h1>
          <div className="col-sm-12 ">
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
                />
              </div>
              <div className="form-group mt-2">
                <label>Add Image</label>
                <br />
                <input
                  type="file"
                  id="imageInput"
                  name="image"
                  accept="image/*"
                  //   onChange={handleImageChange}
                />
              </div>
              <div className="form-group mt-2 w-100">
                <label htmlFor="discription">Discription</label>
                <textarea
                  type="discription"
                  className="form-control"
                  id="discription"
                  name="discription"
                  placeholder="Discription"
                  style={{ height: "200px" }}
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
    </>
  );
};
export default NewBlog;
