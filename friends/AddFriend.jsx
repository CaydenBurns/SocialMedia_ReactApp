import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toastr from "toastr";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

import serviceFunction from "../../services/friendService.js";

function AddFriend() {
  const location = useLocation();
  const navigate = useNavigate();

  //need ot pass state here into the state and use it to render the form field

  const { state } = useLocation();

  //b4 i use the state i need ot use an if statement on teh state dot type === edit_friend   true , then i can do what i want with the state one type matches.

  const [formData, setUpdateFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    imageUrl: "",
    imageTypeId: 1,
    skills: [""],
    developer: false,
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).max(100).required("Name is required!"),
    bio: Yup.string().min(2).max(100).required("Bio is required!"),
    summary: Yup.string().min(2).max(100).required("Summary is required!"),
    headline: Yup.string().min(2).max(100).required("Headline is required!"),
    slug: Yup.string().min(2).max(100).required("Slug is required!"),
    statusId: Yup.number().required("Status ID is required!"),
    imageUrl: Yup.string().min(2).max(100).required("Name is required!"),
    imageTypeId: Yup.number().required("ImageTypeId is required!"),
    skills: Yup.array().required("Skills are required!"),
  });

  const onUpdateFriendByIdSuccess = (response) => {
    console.log(response, "onUpdateFriendByIdSuccess");
    toastr.success("your task was completed");
    navigate("Friends");
  };

  const onUpdateFriendByIdError = (error) => {
    console.error(error);
    toastr.error("your task was failed , friend not updated", error);
  };

  const AddFriendSuccess = (response) => {
    console.log("AddFriendSuccess", response);
    toastr.success("your task was completed");
    setUpdateFormData((pState) => {
      let addedFriendFromData = { ...pState };
      addedFriendFromData.id = response.id;

      return addedFriendFromData;
    });
  };

  const AddFriendError = (error) => {
    console.warn(" AddFriendError", error);
    toastr.error("your task was failed");
  };

  useEffect(() => {
    if (state?.type === "edit_friend" && state?.payload) {
      setUpdateFormData((pState) => {
        let formData = { ...pState };
        formData = location.state.payload;
        console.log(formData, "In Edit FRIEND");
        formData.imageUrl = formData.primaryImage.imageUrl;
        formData.imageTypeId = formData.primaryImage.imageTypeId;

        return formData;
      });
    }
  }, []);

  const formikSubmit = (values) => {
    console.log("formikSubmit", values);

    if (formData.id) {
      serviceFunction
        .UpdateFriendById(formData.id, values)
        .then(onUpdateFriendByIdSuccess)
        .catch(onUpdateFriendByIdError);
    } else {
      serviceFunction
        .AddFriend(values)
        .then(AddFriendSuccess)
        .catch(AddFriendError);
    }
  };

  //#endregion

  return (
    <React.Fragment>
      <div className="formContainerReg">
        <div className="card  ">
          <div className="card-body">
            <div className="formWrap">
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={formikSubmit}
                validationSchema={validationSchema}
              >
                {({ values, dirty, isValid }) => (
                  <Form>
                    <div className="formgroup">
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Full Name
                        </label>

                        <Field
                          type="text"
                          name="title"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="title"
                          component="div"
                          className="hasError"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="bio" className="form-label">
                          Bio
                        </label>
                        <Field
                          component="textarea"
                          className="form-control"
                          name="bio"
                        />
                        <ErrorMessage
                          name="bio"
                          component="div"
                          className="hasError"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="summary" className="form-label">
                          Summary
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="summary"
                        />
                        <ErrorMessage
                          name="summary"
                          component="div"
                          className="hasError"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="headline" className="form-label">
                          Headline
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="headline"
                        />
                        <ErrorMessage
                          name="headline"
                          component="div"
                          className="hasError"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="slug" className="form-label">
                          Unique Identifier
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="slug"
                        />
                        <ErrorMessage
                          name="slug"
                          component="div"
                          className="hasError"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="skills" className="form-label">
                          Skills
                        </label>
                        <FieldArray name="skills" type="text">
                          {({ push, remove }) => (
                            <div>
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => push("")}
                              >
                                Add Skill
                              </button>
                              {values.skills &&
                                values.skills.map((skill, index) => (
                                  <div
                                    className="row mt-2"
                                    key={index}
                                    style={{ width: "100" }}
                                  >
                                    <div className="col-8">
                                      <Field
                                        name={`skills.${index}`}
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter a required skill"
                                      />
                                      <ErrorMessage
                                        name="skills"
                                        component="div"
                                        className="hasError"
                                      />
                                    </div>
                                    <div className="col">
                                      <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => {
                                          remove(index);
                                        }}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          )}
                        </FieldArray>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="statusId" className="form-label">
                          Status
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="statusId"
                          placeholder="Input Active"
                        />
                        <ErrorMessage
                          name="statusId"
                          component="div"
                          className="hasError"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="developer" className="form-label">
                          {`${values.developer}`}
                        </label>
                        <Field
                          type="checkbox"
                          className="form-check"
                          name="developer"
                        />
                        <ErrorMessage
                          name="statusId"
                          component="div"
                          className="hasError"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">
                          Profile Picture
                        </label>
                        <Field
                          type="text"
                          className="form-control"
                          name="imageUrl"
                        />
                        <ErrorMessage
                          name="imageUrl"
                          component="div"
                          className="hasError"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mb-5"
                      disabled={!isValid || !dirty}
                    >
                      Add Friend To Your Network
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddFriend;
