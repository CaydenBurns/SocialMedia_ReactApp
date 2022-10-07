import React from "react";

function SingleCar(props) {
  console.log(props, "propsin Carsingle");

  return (
    <div className="card col-md-3 m-1">
      <div className="card-body">
        <h5 className="card-title">{props.car.make}</h5>
        <h5 className="card-text">{props.car.model}</h5>
        <h5 className="card-text">{props.car.year}</h5>
      </div>
    </div>
  );
}

export default SingleCar;
