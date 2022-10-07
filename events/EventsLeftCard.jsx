import React from "react";
import MapWrapper from "./MapWrapper";

function EventsLeftCard(props) {
  console.log(props, "Props on event left card");
  var aEvent = props.event;

  return (
    <div className="card  border border-white border-2 m-4 bg-white">
      <img
        className="card-img-top leftImg"
        src={aEvent.description}
        alt="love"
      />
      <div className="card-body ">
        <p className="card-text ">
          {" "}
          <strong>Headline:</strong> {aEvent.headline}
        </p>
        <p className="card-text">
          <strong>Summary:</strong> {aEvent.summary}
        </p>
        <p className="card-text">
          {" "}
          <strong> Address:</strong> {aEvent.address}
        </p>
        <p className="card-text">
          {" "}
          <strong> ZipCode</strong> {aEvent.zipCode}
        </p>
        <p>
          <strong>Start Date:</strong> {aEvent.dateStart}
        </p>
        <span>
          <strong>End Date: </strong>
          {aEvent.dateEnd}
        </span>
        <MapWrapper locations={props} />
      </div>
    </div>
  );
}

export default EventsLeftCard;
