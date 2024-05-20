import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import axiosInstance from '../Axios/axios';

const ReadBlog = () => {
    const { _id } = useParams();
    const [blogData, setBlogData] = useState({ title: '', discription: '', imageUrl: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/api/blogs/blogread/?_id=${_id}`);
                setBlogData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [_id]);

    return (
        <div className="container-fluid">
            <div className="row m-2">
                <div className="col-sm-2">
                    <button className="btn btn-dark">
                        <Link to="/Blog" id="lnk" style={{ color: "white", textDecoration: "none" }}>
                            <ChevronLeftIcon /> Back
                        </Link>
                    </button>
                </div>
                <div className="col-sm-10">
                    <h2>Title:</h2>
                    <h3>{blogData.title}</h3>
                </div>
            </div>
            <hr />
            {/* Image and discription */}
            <div className="row">
                <div className="col-sm-6">
                    {blogData.imageUrl && (
                        <img
                            src={blogData.imageUrl}
                            alt={blogData.title}
                            style={{ height: "200px", objectFit: "cover" }}
                        />
                    )}
                </div>
                <div className="col-sm-6">
                    <h5>discription:</h5>
                    <p>{blogData.discription}</p>
                </div>
            </div>
        </div>
    );
};

export default ReadBlog;
