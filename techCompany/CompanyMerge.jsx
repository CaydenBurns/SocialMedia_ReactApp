import React from "react";

function CompanyMerge(props) {
  const aCompany = props.company;
  const onLocalCompanyClicked = (e) => {
    // local click handler to call the click handlers that is on props
    e.preventDefault();
    props.onEditCompanyClicked(props.company);
  };

  const onLocalEditCompanyClicked = (e) => {
    e.preventDefault();
    props.onEditCompanyClicked(props.company, e);
  };

  return (
    <div className="card  border border-white border-2 m-4 booster bg-white ">
      <img
        src={aCompany.imageUrl}
        className="card-img-top Atrey"
        alt="..."
      ></img>
      <div className="card-body ">
        <h5 className="card-title">{aCompany.name}</h5>
        <p className="card-text">{aCompany.profile}</p>
        <p className="card-text ">{aCompany.summary}</p>
        <p className="card-text">{aCompany.contactInformation}</p>
        <p className="card-text">{aCompany.slug}</p>
        <p className="card-text">{aCompany.headline}</p>
      </div>
      <button className="btn btn-primary" onClick={onLocalCompanyClicked}>
        View More
      </button>
      <button
        className="btn btn-warning mt-3"
        onClick={onLocalEditCompanyClicked}
      >
        Edit Company
      </button>
    </div>
  );
}

export default React.memo(CompanyMerge);
