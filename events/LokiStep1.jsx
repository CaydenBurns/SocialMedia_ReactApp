import React from "react";

function LokiStep1(props) {
  console.log("Props in lokiStep1", props);

  function modalChange(e) {
    console.log(e);
    const target = e.target;
    const value = target.value;
    const name = target.name;
    props.props.propPass1.modalStaadt((pState) => {
      const SearchData = { ...pState };
      SearchData[name] = value; //whatever name is changed, its value will update to to state// the name attribute slelects which ever i am on , it will set that value

      return SearchData;
    });
  }

  return (
    <div className="eventWizard">
      <form className="mt-5">
        <div className="mb-3">
          <label htmlFor="name" className="createEventName">
            Name
          </label>
          <input
            type="text"
            className="form-control name"
            id="createEventName"
            placeholder=" Event Name"
            value={props.props.propPass1.name}
            onChange={modalChange}
            name="name"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="statusId" className="eventySummary">
            StatusId
          </label>
          <input
            type="text"
            className="form-control"
            id="statusId"
            placeholder="statusId"
            name="statusId"
            value={props.props.propPass1.statusId}
            onChange={modalChange}
          ></input>
        </div>
        <label htmlFor="headline" className="friend-label">
          Headline
        </label>
        <input
          type="text"
          id="headline"
          className="form-control"
          placeholder="Headline"
          name="headline"
          value={props.props.propPass1.headline}
          onChange={modalChange}
        />

        <div className="mb-3">
          <label htmlFor="description" className="eventDescription">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Event Description"
            name="description"
            value={props.props.propPass1.description}
            onChange={modalChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="summary" className="eventySummary">
            Event Summary
          </label>
          <input
            type="text"
            className="form-control"
            id="summary"
            placeholder="Summary"
            name="summary"
            value={props.props.propPass1.summary}
            onChange={modalChange}
          ></input>
        </div>

        <div className="mb-3 mt-3">
          <label htmlFor="slug" className="slug-label">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="form-control"
            placeholder="slug"
            name="slug"
            value={props.props.propPass1.slug}
            onChange={modalChange}
          ></input>
          <button>Choose File</button>
        </div>
      </form>
    </div>
  );
}

export default LokiStep1;
