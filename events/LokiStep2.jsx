import React from "react";

function LokiStep2(props) {
  console.log("Props in lokiStep2", props);
  return (
    <div className="lokiStep2">
      <form className="mt-5">
        <div className="d-inline">
          <form></form>
          <h4>Date Start</h4>
          <input
            type="date"
            id="dateStart"
            className="form-control "
            name="dateStart"
            value={props?.props.propPass1.dateStart}
            onChange={props?.props.propPass1.dateModal}
          />
        </div>
        <div className="  mx-auto d-inline">
          <label htmlFor="dateEnd" className="dateEnd">
            Date End
          </label>
          <input
            type="date"
            id="dateEnd"
            className="form-control datePick2"
            placeholder="select Date"
            name="dateEnd"
            value={props?.props.propPass1.dateEnd}
            onChange={props?.props.propPass1.dateModal}
          />
        </div>
      </form>
    </div>
  );
}

export default LokiStep2;
