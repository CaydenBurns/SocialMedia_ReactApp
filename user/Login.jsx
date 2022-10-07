import React, { useState } from "react";

import serviceFunctions from "../../services/UserService";

import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, updateFormData] = useState({
    email: "",
    password: "",
    tenantId: "",
  });
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    serviceFunctions
      .userLogin(formData)
      .then(userLoginSuccess)
      .catch(userLoginError);
  };
  const navigate = useNavigate();

  const userLoginSuccess = (response) => {
    console.log("user Login Succes in login success handler", response);

    serviceFunctions
      .getUser()
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  };

  const userLoginError = (response) => {
    console.warn("user Login error", response);
  };

  const onGetCurrentUserSuccess = (response) => {
    console.log(
      "Get current User Succes in the user current success handler",
      response
    );

    serviceFunctions
      .getCurrentUserById(response.id)
      .then(getCurrentUserByIdSuccess)
      .catch(getCurrentUserByIdError);
  };

  const onGetCurrentUserError = (error) => {
    console.warn("getcurrentUser error", error);
  };

  const getCurrentUserByIdSuccess = (response) => {
    console.log("getuserbyID success in teh success handler", response);

    const userDataForApp = response;
    const userSendData = { type: "login_data", payload: userDataForApp };

    navigate(`/Home`, { state: userSendData }); // the usersend data needs to be in state so that location can have the property isnide of its state
  };

  const getCurrentUserByIdError = (error) => {
    console.log("getuserbyID success in teh ERROR handler", error);
  };

  return (
    <React.Fragment>
      <div className="formContainer">
        <div className="card w-50 ">
          <div className="card-body">
            <div className="formWrap">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    onChange={handleChange}
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
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
                  />
                </div>
              </form>
            </div>
            <button
              className="btn btn-primary loginButton"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
