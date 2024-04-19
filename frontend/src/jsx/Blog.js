import React, { useEffect, useState } from "react";
import Sidebar from "../jsx/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../jsx/Footer";
import { Button, Modal, Form } from "react-bootstrap";

const columns = [{ field: "title", headerName: "Title" }];

const Blog = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    discription: ""
  });

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const user_id = sessionStorage.getItem("user_id");
        const response = await axios.get(
          `http://localhost:4000/api/blogs/userblog?user_id=${user_id}`
        );

        if (response.data) {
          setUserBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      }
    };

    fetchUserBlogs();
  }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:4000/api/blogs/deleteblog?_id=${_id}`);
      setUserBlogs(userBlogs.filter((blog) => blog._id !== _id));
      console.log("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleShow = (_id) => {
    try {
      const blogToUpdate = userBlogs.find((blog) => blog._id === _id);
      if (blogToUpdate) {
        setFormData({
          _id: blogToUpdate._id,
          title: blogToUpdate.title,
          discription: blogToUpdate.discription,
        });
        setShow(true);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleUpdate = (e) => {
    try {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } catch (error) {
      console.error("Error updating form data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const { _id, title, discription } = formData;
      await axios.patch(`http://localhost:4000/api/blogs/updateblog?_id=${_id}`, {
        title,
        discription
      });
      console.log("Updated form data:", formData);

      // Close the modal after form submission
      setShow(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFormData({
      _id: "",
      title: "",
      discription: ""
    });
  };

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
                  <th key={column.field} style={{ width: "60%" }}>
                    {column.headerName}
                  </th>
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
                    <button className="btn btn-success m-2" onClick={() => handleShow(blog._id)}>
                      Update
                    </button>
                    <button className="btn btn-danger m-2" onClick={() => handleDelete(blog._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalTitle">
          <Modal.Title>Update Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formGridTitle">
              <Form.Label className="modalLabel">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                name="title"
                value={formData.title}
                onChange={handleUpdate}
              />
            </Form.Group>
            <Form.Group controlId="formGridDescription">
              <Form.Label className="modalLabel">Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="description"
                name="discription"
                value={formData.discription}
                onChange={handleUpdate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blog;
