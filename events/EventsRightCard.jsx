import React from "react";

function EventsRightCard(props) {
  var aEvent = props.event;

  function onLocalEventClicked(e) {
    // local click handler to call the click handlers that is on props
    e.preventDefault();
    props.onEventClicked(props.event, e); // x1 access click handler on the other page with these args
  }

  function onViewMoreClicked(e) {
    e.preventDefault();
    props.onViewMoreClicked(props.event, e);
  }
  return (
    <div className="card  border border-white border-2 m-4 bg-white">
      <div className="card-body ">
        <p className="card-text ">
          {" "}
          <strong>Headline: </strong> {aEvent.headline}
        </p>
        <p className="card-text">
          <strong>Summary: </strong> {aEvent.summary}
        </p>
        <p className="card-text">
          {" "}
          <strong> Address: </strong> {aEvent?.address}
        </p>
        <p className="card-text">
          <strong>Zip: </strong> {aEvent.zipCode}
        </p>
        <p>
          <strong>Start Date: </strong> {aEvent?.dateStart}
        </p>
        <span>
          <strong>End Date: </strong>
          {aEvent?.dateEnd}
        </span>
      </div>
      <button className="btn btn-success" onClick={onLocalEventClicked}>
        Edit
      </button>
      <button className="btn btn-primary mt-3" onClick={onViewMoreClicked}>
        View More
      </button>
    </div>
  );
}

export default EventsRightCard;
