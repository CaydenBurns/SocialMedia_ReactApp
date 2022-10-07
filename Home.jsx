import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import fileUploadService from "../services/fileUploadService";
import PropTypes from "prop-types";
import debug from "sabio-debug";

function Home(props) {
  const [selectedFile, setSelectedFile] = useState();
  //const [isFilePicked, setIsFilePicked] = useState(false);
  const _logger = debug.extend("HomePage");

  _logger(props.user);

  const handleSubmission = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("File", selectedFile);

    fileUploadService
      .addFile(formData)
      .then(onFileUploadSuccess)
      .response(onFileUploadError);
  };

  function onFileUploadSuccess(response) {
    console.log("onFileUploadSuccess", response);
  }

  function onFileUploadError(error) {
    console.log("error", error);
  }

  const changeHandler = (e) => {
    e.preventDefault();
    console.log("changeHandler", e.target.name.value);
    setSelectedFile(e.target.files[0]);
    //setIsSelected(true);
  };

  const location = useLocation();
  console.log(props);
  // i will update here via uselocation teh state od user passed down via props
  //taking function form app tp update yse rhere and getting the data form the getuserbyid function in login page and they meet on home
  // use effec

  useEffect(() => {
    //question mark on its own means check to the left of the qestion mark to see if its exists because if it keeps going and thte item to the left of state does not exist the check will result null and error out your page becasuse the item is undefined or null. but if hte item left is there m then we will go check the property(s)
    if (
      (location.state?.type === "user_logout" || "login_data") &&
      location.state?.payload
    ) {
      //question mark is saying if i have this item location , then check for the properties of state AND type
      console.log("hi", location);
      props.setUserFunction(location?.state?.payload);
    } // take the user data in statte from llcoation
  }, []);

  return (
    <React.Fragment>
      <div className="userNameConatainer bg-white text-primary text-center">
        {" "}
        <strong className="homePageUserName">
          Welcome Back {props.user.firstName} {props.user.lastName} !
        </strong>
      </div>
      <FileUpload />
      <div className="fileUploadCont">
        <form action="">
          <input
            placeholder="FileName Upload"
            type="file"
            multiple
            id="fileInput"
            onChange={changeHandler}
            name="fileUpload"
          />
          <button
            type="button"
            className="btn btn-warning text-white mt-5 mb-5 fileButton"
            id="fileButton"
            onClick={handleSubmission}
          >
            Submit File
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    firstName: PropTypes.number.isRequired,
    isConfirmed: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
};

export default Home;
