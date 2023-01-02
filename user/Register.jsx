import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import serviceFunction from "../../services/UserService.js";
import toastr from "toastr";

function Register() {
  const navigate = useNavigate();
  const [formData, updateFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "za",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    serviceFunction
      .postUser(formData)
      .then(postUserSuccess)
      .catch(postUserError);
  };

  const postUserSuccess = (response) => {
    console.log("user was added", response);
    toastr.success("your task was completed");
    navigate("Login");
  };

  const postUserError = (response) => {
    console.warn("user was added", response.error);
    toastr.error("your task was failed");
  };

  return (
    <React.Fragment>
      <div className="formContainerReg">
        <div className="card  ">
          <div className="card-body">
            <div className="formWrap">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName" //this is the value that must natch the named properties in our state of formData
                    value={formData.firstName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    LastName
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordConfirm" className="form-label">
                    Password Confirm
                  </label>
                  <input
                    onChange={handleChange}
                    type="password"
                    className="form-control"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="avatarUrl" className="form-label">
                    Profile Picture Url
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="avatarUrl"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tenantId" className="form-label">
                    User ID
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="tenantId"
                    name="tenantId"
                    value={formData.tenantId}
                  />
                </div>
              </form>
            </div>
            <Link
              onClick={handleSubmit}
              className="btn btn-primary loginButton"
              to="/Login"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
