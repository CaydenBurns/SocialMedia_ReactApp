import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toastr from "toastr";
import companyService from "../../services/companyService";

function AddTechCompany() {
  //#region
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setUpdateFormData] = useState({
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: "",
    statusId: "",
    imageUrl: "",
    techCompanyId: "",
    urls: "N/a",
    tags: "N/a",
    friendIds: "N/a",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      console.log(formData, "lolololololhahahahahaha");
      companyService
        .UPDATE(formData.id, formData)
        .then(onUpdateCompanyByIdSuccess)
        .catch(onUpdateCompanyByIdError);
    } else {
      companyService
        .ADD(formData)
        .then(AddCompanySuccess)
        .catch(AddCompanyError);
    }
  };

  const onUpdateCompanyByIdSuccess = (response) => {
    console.log("onUpdateCompanyByIdSuccess", response);
    toastr.success("your Job task was completed");
    navigate("Companies");
  };

  const onUpdateCompanyByIdError = (error) => {
    console.error("onUpdateCompanyByIdError", error);
    toastr.error("your task was failed , Job not updated");
  };

  const AddCompanySuccess = (response) => {
    console.log("AddCompanySuccess", response);
    toastr.success("your task was completed");
    setUpdateFormData((pState) => {
      let addedJobFromData = { ...pState };
      addedJobFromData.techCompanyId = response.id;
      return addedJobFromData;
    });
  };

  const AddCompanyError = (error) => {
    console.warn("AddCompanyError", error);
    toastr.error("your task was failed");
  };

  useEffect(() => {
    if (state?.type === "edit_company" || state?.payload) {
      setUpdateFormData((pState) => {
        let formData = { ...pState };
        formData = location.state.payload;
        formData.contactInformation = location.state.payload.contactInformation;
        return formData;
      });
    }
  }, []);

  const handleCompanyChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setUpdateFormData((pState) => {
      const companyData = { ...pState };
      companyData[name] = value;
      return companyData;
    });
  };

  //#endregion

  return (
    <React.Fragment>
      <div className="formContainerReg">
        <div className="card  ">
          <div className="card-body">
            <div className="formWrap">
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
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
                  <label htmlFor="profile" className="form-label">
                    profile
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="profile"
                    name="profile"
                    value={formData.profile}
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
                  <label htmlFor="headline" className="form-label">
                    Headline
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="headline"
                    name="headline"
                    placeholder="headline"
                    value={formData.headline}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactInformation" className="form-label">
                    Contact Information
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    id="contactInformation"
                    name="contactInformation"
                    value={formData.contactInformation}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    Company Image
                  </label>
                  <input
                    onChange={handleCompanyChange}
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                  />
                </div>
              </form>

              <button onClick={handleSubmit} className="btn btn-primary">
                Add Technology Company
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddTechCompany;
