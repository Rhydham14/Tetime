import React from "react";
// import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import blogimage from '../images/blogimg.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const blgimg = {
    height: "150px",
    // boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  };

const ReadBlog = () => {
  return <>
    <div className="container-fluid">
        <div className="row m-2">
            <div className="col-sm-2 ">

                 <button className="btn btn-dark ">
                <Link to="/Blog" id="lnk" className="pt-5"><ChevronLeftIcon/>Black</Link>
                </button>
            </div>
            <div className="col-sm-10">
                <h2>Title</h2>
            </div>
        </div>
        <hr></hr>
        {/* Image and discription */}
        <div className="row">
            <div className="col-sm-4">
                <img src={blogimage}  style={blgimg}/>
            </div>
            <div className="col-sm-8">
                <h5>Discription</h5>
            </div>
        </div>
    </div>
                 
             
    </>;
};

export default ReadBlog;
