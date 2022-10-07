//#region    --------IMPORT--------

import React, { useState, useEffect } from "react";
import companyService from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import CompanyMerge from "./CompanyMerge";
import toastr from "toastr";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";

//#endregion

function Companies() {
  //#region ---------- STATES---------
  const [myPagination, setPagination] = useState({
    totalCount: 15,
    pageSize: 3,
    currentPage: 1,
    pageIndex: 0,
  });
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    arrayOfCompanies: [],
    companyComponents: [],
  });

  //#endregion -------------STATES --------------

  //#region --------PAGINATION------

  useEffect(() => {
    companyService
      .GET(myPagination.pageIndex, myPagination.pageSize)
      .then(getCompanySuccess)
      .catch(getCompanyError);
  }, [myPagination.pageIndex]);

  function OnPaginationChange(page) {
    setPagination((pState) => {
      let nextPagi = { ...pState };
      nextPagi.currentPage = page;
      nextPagi.pageIndex = page - 1;
      return nextPagi;
    });
  }

  //#endregion  --------PAGINATION------

  //#region  -------------EDIT COMPANY----------
  function onEditCompanyRequested(myCompany) {
    console.log("onEditCompanyRequested", myCompany);
    const payload = myCompany;
    payload.contactInformation = myCompany.contactInformation;

    const state = { type: "edit_company", payload };
    navigate(`/AddTechCompany/${myCompany.id}`, { state });
  }
  //#endregion ---------------EDIT COMPANY--------------

  //#region  ---------SUCCESS HANDLERS

  const getCompanySuccess = (response) => {
    console.log("getCompanySuccess", response.pagedItems);
    toastr.success("Successfully Retrieved your Company");
    let companyArr = response.pagedItems;
    setPageData((pState) => {
      const pageData = { ...pState };
      pageData.arrayOfCompanies = companyArr;
      pageData.companyComponents = companyArr.map(mapCompany);
      return pageData;
    });
    setPagination((pState) => {
      let RPS = { ...pState };
      RPS.totalCount = response.totalCount;
      return RPS;
    });
  };

  const getCompanyError = (response) => {
    console.warn(response.error);
    toastr.error("getCompanyError");
  };

  //#endregion

  //#region ----------- MODAL & MAP ----------------
  const mapCompany = (aCompany) => {
    return (
      <CompanyMerge
        company={aCompany}
        key={aCompany.id}
        onEditCompanyClicked={onEditCompanyRequested}
      />
    );
  };

  //#endregion

  //#region ----------- ADD COMPANY CLICKED------
  function onAddCompanyClicked() {
    setPageData((pState) => {
      return { ...pState, isActive: true };
    });
  }
  //#endregion

  return (
    <React.Fragment>
      <div className="toggleButton">
        {pageData.isActive && navigate("/AddTechCompany")}
      </div>

      <div>
        <button className="btn btn-success w-4 " onClick={onAddCompanyClicked}>
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
          Company
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
        {locale && pageData.companyComponents}{" "}
      </div>
    </React.Fragment>
  );
}

export default Companies;
