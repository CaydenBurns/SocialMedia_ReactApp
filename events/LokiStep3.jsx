import React from "react";

function LokiStep3(props) {
  console.log("Props in lokiStep3", props);
  return (
    <div className="lokiStep3">
      <form className="mt-5">
        <div className="mb-3">
          <label htmlFor="address" className="status-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="EX: 139 N Arbor Vitae ave"
            value={props?.props.propPass1.address}
            name="address"
            onChange={props?.props.propPass1.addressModal}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="zipCode" className="image-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            placeholder="90302"
            name="zipCode"
            value={props?.props.propPass1.zipCode}
            onChange={props?.props.propPass1.addressModal}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="latitude" className="status-label">
            latitude
          </label>
          <input
            type="text"
            className="form-control"
            id="latitude"
            placeholder="EX: 139 N Arbor Vitae ave"
            value={props?.props.propPass1.latitude}
            name="latitude"
            onChange={props?.props.propPass1.addressModal}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="longitude" className="status-label">
            longitude
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="EX: 139 N Arbor Vitae ave"
            value={props?.props.propPass1.longitude}
            name="longitude"
            onChange={props?.props.propPass1.addressModal}
          />
        </div>
      </form>
    </div>
  );
}

export default LokiStep3;
