import React from "react";
import Sidebar from "../jsx/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../css/Blog.css";
import Footer from "../jsx/Footer";

// import { useLocation } from 'react-router-dom';

const rows = [
  {
    title: "Johnddddd Doe",
    discription:
      "A Lorem Ipsum generator is a tool used primarily in design, typesetting, and web development to generate placeholder text. Lorem Ipsum is a pseudo-Latin text commonly used as filler content in mock-ups, prototypes, and templates where the actual content is not yet available. It allows designers and developers to focus on the layout and visual aspects without being distracted by the content itself.",
  },
  {
    title: "John Doe",
    discription:
      "A Lorem Ipsum generator is a tool used primarily in design, typesetting, and web development to generate placeholder text. Lorem Ipsum is a pseudo-Latin text commonly used as filler content in mock-ups, prototypes, and templates where the actual content is not yet available. It allows designers and developers to focus on the layout and visual aspects without being distracted by the content itself.",
  },
  {
    title: "John Doe",
    discription:
      "A Lorem Ipsum generator is a tool used primarily in design, typesetting, and web development to generate placeholder text. Lorem Ipsum is a pseudo-Latin text commonly used as filler content in mock-ups, prototypes, and templates where the actual content is not yet available. It allows designers and developers to focus on the layout and visual aspects without being distracted by the content itself.",
  },
];

const columns = [
  { field: "title", headerName: "Title" },
  { field: "discription", headerName: "Discription" },
];

const Blog = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <Sidebar />
          <div className="col-sm-10 ">
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
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    {columns.map((column) => (
                      <td key={`${row.id}-${column.field}`}>
                        {row[column.field]}
                      </td>
                    ))}
                    <div className="m-2">
                      <Link to="/ReadBlog" id="lnk">
                        <button className="btn btn-dark m-2">Read</button>
                      </Link>

                      <button className="btn btn-success m-2">Update</button>
                      <button className="btn btn-danger m-2">Remove</button>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
