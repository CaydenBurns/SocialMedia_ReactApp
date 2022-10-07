import React from "react";

function JobsMerge(props) {
  const aJob = props.job;

  console.log("PROPS IN JOBS MERGE NEW API", aJob);

  const onLocalJobClicked = (e) => {
    // local click handler to call the click handlers that is on props
    e.preventDefault();
    props.onJobClicked(props.job);
  };

  const onLocalEditJobClicked = (e) => {
    e.preventDefault();
    props.onEditJobClicked(props.job, e);
  };

  return (
    <div
      className="card  border border-white border-2 m-4 booster bg-white"
      key={"jobsList" + aJob.id}
    >
      <img
        src={aJob.techCompany[0].imageUrl}
        className="card-img-top Atrey"
        alt="..."
      ></img>
      <div className="card-body ">
        <h5 className="card-title">{aJob.title}</h5>
        <p className="card-text">{aJob.pay}</p>
        <p className="card-text ">{aJob.summary}</p>
        <p className="card-text">{aJob.description}</p>
        <p className="card-text">{aJob.slug}</p>
        <p className="card-text">
          {aJob.skills.map((skill) => skill.name).join(", ")}
        </p>
      </div>
      <button className="btn btn-primary" onClick={onLocalJobClicked}>
        View More
      </button>
      <button className="btn btn-warning mt-3" onClick={onLocalEditJobClicked}>
        Edit Job
      </button>
    </div>
  );
}

export default React.memo(JobsMerge);
