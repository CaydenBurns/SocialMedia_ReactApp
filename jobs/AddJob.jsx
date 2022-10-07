import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toastr from "toastr";
import jobsServiceFunctions from "../../services/jobsService";

function AddFriend() {
  const location = useLocation();
  const navigate = useNavigate(); //need ot pass state here into the state and use it to render the form field
  const { state } = useLocation(); //b4 i use the state i need ot use an if statement on teh state dot type === edit_friend   true , then i can do what i want with the state one type matches.

  const [formData, setUpdateFormData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "",
    skills: [],
    techCompanyId: "",
    techCompany: { name: "", id: "" },
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setUpdateFormData((pState) => {
      const toFormData = { ...pState };
      toFormData[name] = value;
      return toFormData;
    });
  };

  const onSelectCompAltered = (e) => {
    const target = e.target;
    const value = target.value;
    const selectOption = target.name;
    setUpdateFormData((prevState) => {
      const newDropdownData = { ...prevState };
      newDropdownData[selectOption] = value;
      newDropdownData.techCompanyId = value;
      return newDropdownData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      console.log(formData, "lolololololhahahahahaha");
      jobsServiceFunctions
        .updateById(formData.id, formData)
        .then(onUpdateJobByIdSuccess)
        .catch(onUpdateJobByIdError);
    } else {
      console.log("FORM DATA IN ADD AXIOS FUNCTION", formData);
      jobsServiceFunctions
        .addJob(formData)
        .then(AddJobSuccess)
        .catch(AddFriendError);
    }
  };

  const onUpdateJobByIdSuccess = (response) => {
    console.log(response, "onUpdateJobByIdSuccess");
    toastr.success("your Job task was completed");
    navigate("Jobs");
  };

  const onUpdateJobByIdError = (error) => {
    console.error("onUpdateJobByIdError", error);
    toastr.error("your task was failed , Job not updated");
  };

  const AddJobSuccess = (response) => {
    console.log("AddJobSuccess", response);
    toastr.success("your Job was completed");
    const jobId = response.id;
    setUpdateFormData((pState) => {
      let addedJobFromData = { ...pState };
      addedJobFromData.id = jobId;
      return addedJobFromData;
    });
  };

  const AddFriendError = (error) => {
    console.error("AddFriendError", error);
    toastr.error("your task was failed");
  };

  useEffect(() => {
    if (state?.type === "edit_job" || state?.payload) {
      setUpdateFormData((pState) => {
        let formData = { ...pState };
        formData = location.state.payload;

        return formData;
      });
    }
  }, []);

  const handleSkillsChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setUpdateFormData((pState) => {
      const skillsData = { ...pState };
      skillsData[name] = [`${value}`];
      return skillsData;
    });
  };

  return (
    <React.Fragment>
      <div className="formContainerReg">
        <div className="card  ">
          <div className="card-body">
            <div className="formWrap">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="summary" className="form-label">
                    Summary
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="summary"
                    name="summary"
                    value={formData.summary}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pay" className="form-label">
                    Pay
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="pay"
                    name="pay"
                    value={formData.pay}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="slug" className="form-label">
                    Unique Identifier
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="statusId" className="form-label">
                    Status
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="statusId"
                    name="statusId"
                    placeholder="Input Active"
                    value={formData.statusId}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="techCompanyId"
                    className="col-sm-2 col-form-label"
                  >
                    Company
                  </label>
                  <select
                    className="form-select"
                    name="techCompanyId"
                    aria-label="Default select example"
                    onChange={onSelectCompAltered}
                  >
                    <option value={formData.techCompanyId}>
                      {formData.techCompany.name}
                    </option>
                    <option value={1012}>CodeSolutions</option>
                    <option value={1013}>Tesla</option>
                    <option value={1012}>Love Field</option>
                    <option value={1013}>Best Buy</option>
                    <option value={1012}>AMD</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Skills
                  </label>
                  <input
                    onChange={handleSkillsChange}
                    type="text"
                    className="form-control"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                  />
                </div>
              </form>

              <button onClick={handleSubmit} className="btn btn-primary">
                Add Job posting
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddFriend;
