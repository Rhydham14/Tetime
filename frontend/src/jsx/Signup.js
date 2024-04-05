import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Signup.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const countries = [
  { id: 1, name: "India" },
  { id: 2, name: "United States" },
  { id: 3, name: "Canada" },
];

const states = {
  India: [
    { id: 1, name: "Gujarat" },
    { id: 2, name: "Maharashtra" },
    { id: 3, name: "Karnataka" },
  ],
  "United States": [
    { id: 1, name: "California" },
    { id: 2, name: "Texas" },
    { id: 3, name: "New York" },
  ],
  Canada: [
    { id: 1, name: "Ontario" },
    { id: 2, name: "Quebec" },
    { id: 3, name: "British Columbia" },
  ],
};

const Signup = () => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpswd: "",
    contact: "",
    dob: "",
    country: "", // Add country property to data state
    state: "", // Add state property to data state
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableStates, setAvailableStates] = useState([]);
  const [valid, setValid] = useState(false);
  const [pswd, setPswd] = useState("");
  const [cpswd, setCpswd] = useState("");
  const navigate = useNavigate();

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setAvailableStates(states[event.target.value] || []); // Set empty array if no states
    setData({
      // Update data state with new country and clear state
      ...data,
      country: event.target.value,
      state: "", // Clear state when country changes
    });
  };

  const handleStateChange = (event) => {
    setData({
      // Update data state with new state
      ...data,
      state: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post("http://localhost:4000/api/users/register", data); // Replace with your API endpoint
      console.log(response.data); // Handle successful response (optional)
      setData({
        // Reset form data after successful submission
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpswd: "",
        contact: "",
        dob: "",
        country: "",
        state: "",
      });
      navigate("/");

    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "pswd") {
      setPswd(value);
    } else if (name === "cpswd") {
      setCpswd(value);
    }
  
    setData({ ...data, [name]: value });
  };
  
  useEffect(() => {
    if (pswd.length >= 8 && cpswd === pswd) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [pswd, cpswd]); // Run this effect whenever 'pswd' or 'cpswd' changes
  return (
    <>
      <div className="container-fluid ">
        <h1 className="text-danger text-center">Tetime</h1>
        <div className="row " id="p">
          <h1 className="singup">Signup</h1>
          <div className="col-sm-12  p-5  mx-auto  d-flex align-items-center" id="text">
            <form onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  name="fname"
                  placeholder="Enter First Name"
                  value={data.fname}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Enter Last Name"
                  name="lname"
                  value={data.lname}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <small id="emailHelp" class="form-text text-dark">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </div>
              <div class="form-group">
                <label for="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  name="cpswd"
                  value={data.cpswd}
                  onChange={handleChange}
                />
              </div>
              {!valid && (
                <span style={{ color: "red" }}>
                  Passwords must match and be at least 8 characters long
                </span>
              )}
              <div className="form-group">
                <label htmlFor="contact">Contact Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="contact"
                  placeholder="Enter Contact Number"
                  name="contact"
                  value={data.contact}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  placeholder="Enter Date of Birth"
                  name="dob"
                  value={data.dob}
                  onChange={handleChange}
                />
              </div>

              <div>
                {/* Your form fields here */}
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    className="form-control"
                    id="country"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <select
                    className="form-control"
                    id="state"
                    disabled={!selectedCountry}
                    onChange={handleStateChange}
                  >
                    <option value="">Select State</option>
                    {availableStates.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" class="btn  btn-dark mt-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;