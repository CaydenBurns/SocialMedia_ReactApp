import React, { useState, useEffect, useCallback } from "react";
import jobServiceFunctions from "../../services/jobsService";
import { useNavigate } from "react-router-dom";
import JobMerge from "./JobMerge";
import toastr from "toastr";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import ModalJobs from "./ModalJobs";

function Jobs() {
  const [myPagination, setPagination] = useState({
    totalCount: 15,
    pageSize: 3,
    currentPage: 1,
    pageIndex: 0,
  });
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    arrayOfJobs: [],
    jobComponents: [],
  });

  const [query, setQuery] = useState("");
  const [toggle, setToggle] = useState({ show: false });

  const onOnToggleModal = useCallback((job) => {
    setModal((pState) => {
      let modal = { ...pState };
      modal = job;
      modal.isOpen = !pState.isOpen;
      modal.toggle = { onOnToggleModal };
      return modal;
    });
  }, []);

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: "",
    toggle: { onOnToggleModal },
  });

  function onEditJobRequested(myJob) {
    console.log("onEditJobRequested", myJob.skills);
    const payload = myJob;
    payload.primaryImage = myJob.techCompany[0].imageUrl;
    payload.techCompanyId = Number(myJob.techCompany.id);
    payload.skills = myJob.skills
      .map((skill) => skill.name)
      .join(",")
      .split(",");
    const state = { type: "edit_job", payload };
    console.log(payload, "Payload in edit job requested");
    navigate(`/AddJob/${myJob.id}`, { state });
  }

  const mapJob = (aJob) => {
    //mapping occure here in this element
    return (
      <JobMerge
        job={aJob}
        key={aJob.slug}
        onJobClicked={onOnToggleModal} //recieved from card component via props
        onEditJobClicked={onEditJobRequested}
      />
    );
  };

  useEffect(() => {
    jobServiceFunctions
      .paginatedJobs(myPagination.pageIndex, myPagination.pageSize)
      .then(getJobSuccess)
      .catch(getJobError);
  }, [myPagination.pageIndex]);

  const getJobSuccess = (response) => {
    console.log("getJobSuccess", response.pagedItems);
    let jobArr = response.pagedItems;
    toastr.success("getJobSuccess");

    setPageData((pState) => {
      const pageData = { ...pState };
      pageData.arrayOfJobs = jobArr;
      pageData.jobComponents = jobArr.map(mapJob);
      console.log(pageData, "inside of setPageData");
      return pageData;
    });
    setPagination((pState) => {
      let RPS = { ...pState };
      RPS.totalCount = response.totalCount;
      return RPS;
    });
  };

  const getJobError = (error) => {
    console.error(error);
  };

  function onAddJobClicked() {
    setPageData((pState) => {
      return { ...pState, isActive: true };
    });
  }

  function onToggleJobClicked() {
    setToggle((pState) => {
      let newState = { ...pState };
      newState.show = !pState.show;
      return newState;
    });
  }

  const handleSearchChange = (e) => {
    const target = e.target;
    const value = target.value;
    setQuery((pState) => {
      let queryString = { ...pState };
      queryString = value;
      return queryString;
    });
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    jobServiceFunctions
      .searchByQuery(query)
      .then(queryJobSuccess)
      .catch(queryJobError);
  };

  const queryJobSuccess = (response) => {
    console.log("queryJobSuccess", response);
    toastr.success("Job query was successful");

    setPageData((pState) => {
      let queryPageData = { ...pState };
      queryPageData.arrayOfJobs = response.pagedItems;
      queryPageData.jobComponents = queryPageData.arrayOfJobs.map(mapJob);
      return queryPageData;
    });
  };

  const queryJobError = (error) => {
    console.log("queryJobError", error);
  };

  function OnPaginationChange(page) {
    setPagination((pState) => {
      let nextPagi = { ...pState };
      nextPagi.currentPage = page;
      nextPagi.pageIndex = page - 1;
      return nextPagi;
    });
  }

  return (
    <React.Fragment>
      <div className="row g-3 align-items-center searchContainer">
        <div className="col-auto">
          <label htmlFor="query" className="col-form-label text-white">
            <button
              onClick={handleQuerySubmit}
              className="btn btn-outline-primary text-primary bg-white"
            >
              <strong>Search Jobss </strong>
            </button>
          </label>
        </div>
        <div className="col-auto">
          <input
            onChange={handleSearchChange}
            type="text"
            id="query"
            name="query"
            className="form-control"
            //value={query} it will only have a value if you need to populate it
          ></input>
        </div>
      </div>

      <div className="toggleButton">
        {pageData.isActive && navigate("/AddJob")}
      </div>

      <div>
        <button
          onClick={onToggleJobClicked}
          className="btn btn-primary border border-white m-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          Toggle Your Jobs
        </button>
        <button className="btn btn-success w-4 " onClick={onAddJobClicked}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Job
        </button>
      </div>

      <div className="pagNumbers">
        <Pagination
          onChange={OnPaginationChange}
          current={myPagination.currentPage}
          total={myPagination.totalCount}
          locale={locale}
          pageSize={myPagination.pageSize}
        />
      </div>

      <div className="flex-wrap d-flex card-deck justify-content-center">
        {toggle.show && pageData.jobComponents}{" "}
      </div>

      <ModalJobs {...modal} />
    </React.Fragment>
  );
}

export default Jobs;
