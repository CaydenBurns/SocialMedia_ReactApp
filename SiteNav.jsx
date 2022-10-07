import React from "react";
import { Link, useNavigate } from "react-router-dom";
import serviceFunctions from "../services/UserService";

function SiteNav(props) {
  const navigate = useNavigate();

  function userLogOut() {
    serviceFunctions.logout().then(onLogoutSuccess).catch(onLogoutError);
  }

  function onLogoutSuccess(response) {
    console.log("onlogoutSuccess USER LOGGED OUT", response);
    const userLogout = {
      type: "user_logout",
      payload: {
        firstName: "Please Login",
        lastName: "Or Register",

        isConfirmed: false,
      },
    };
    navigate("/Home", { state: userLogout }); // pushing state back to home via navigate
  }

  function onLogoutError(error) {
    console.log("onlogoutSuccess USER LOGGED OUT", error);
  }

  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark"
      aria-label="Fourth navbar example"
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
            src="https://pw.sabio.la/images/Sabio.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Sabio"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                className="nav-link px-2 text-white link-button"
                id="homePage"
                to="/Home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-2 text-white link-button"
                id="friendsPage"
                to="/Friends"
              >
                Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#"
                className="nav-link px-2 text-white link-button"
                id="jobsPage"
                to="/Jobs"
              >
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#"
                className="nav-link px-2 text-white link-button"
                id="companyPage"
                to="/Companies"
              >
                Tech Companies
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#"
                className="nav-link px-2 text-white link-button"
                id="eventsPage"
                to="/Events"
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="#"
                className="nav-link px-2 text-white link-button"
                id="testAndAjaxPage"
                to="/TestAndAjax"
              >
                Test and Ajax Call
              </Link>
            </li>
          </ul>
          {props.user.isConfirmed ? (
            <div className="text-end">
              <span className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none">
                <img
                  className="userAvatar"
                  src={props.user.avatarUrl}
                  alt="Userimage"
                ></img>{" "}
                {props.user.firstName} {props.user.lastName}
              </span>
              <Link
                type="button"
                className="btn btn-danger me-2"
                id="loginPage"
                to="/Login"
                onClick={userLogOut}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="text-end">
              <span className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none">
                Pleaase Login or Register
              </span>
              <Link
                type="button"
                className="btn btn-outline-light me-2"
                id="loginPage"
                to="/Login"
              >
                login
              </Link>
              <Link
                type="button"
                className="btn btn-warning"
                id="registerPage"
                to="/Register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default SiteNav;
