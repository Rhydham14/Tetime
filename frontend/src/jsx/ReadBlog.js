import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import blogimage from '../images/blogimg.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axios from "axios";
import Blog from '../jsx/Blog';
const blgimg = {
    height: "150px",
    // boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
  };

const ReadBlog = () => {
    const {_id} = useParams();
    console.log("blod id", _id);
    const [blogData, setBlogData] = useState({title: '', discription:''});
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const response = await axios.get(`http://localhost:4000/api/blogs/blogread/?_id=${_id}`);
                const {title, discription} = response.data;
                setBlogData({title, discription});
            }catch(e){
                return e;
            }
        }
        getData(); 
    },[_id]);
  return <>
    <div className="container-fluid">
        <div className="row m-2">
            <div className="col-sm-2 ">

                 <button className="btn btn-dark ">
                  <Link to="/Blog" id="lnk" style={{color:"white", textDecoration:"none"}} className="pt-5"><ChevronLeftIcon/>Black</Link>
                </button>
            </div>
            <div className="col-sm-10">
                <h2>Title:</h2>
                <h3>{blogData.title}</h3>
            </div>
        </div>
        <hr></hr>
        {/* Image and discription */}
        <div className="row">
            <div className="col-sm-4">
                <img src={blogimage}  style={blgimg}/>
            </div>
            <div className="col-sm-8">
                <h5>Discription:</h5><br/>
                <p>{blogData.discription}</p>
            </div>
        </div>
    </div>
                 
             
    </>;
};

export default ReadBlog;