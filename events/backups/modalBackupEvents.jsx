import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Loki from "react-loki";
<script
  async
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPTjVnlXTHh3aok-Wqbli0xp6OGD-tlU0&callback=initMap"
></script>;

function EventsModal(props) {
  console.log("props In modal", props);

  function modalChange(e) {
    console.log(e);
    const target = e.target;
    const value = target.value;
    const name = target.name;
    props.modalStaadt((pState) => {
      const SearchData = { ...pState };
      SearchData[name] = value; //whatever name is changed, its value will update to to state// the name attribute slelects which ever i am on , it will set that value

      return SearchData;
    });
  }

  function onpostEventClicked(e) {
    console.log("onpostEventClicked", props);
    props.onpostEventClicked(props, e);
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.isOpen} toggle={props.toggle.onOnToggleModal}>
        <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
        <ModalBody>
          <Loki lokiProp={props} />
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="createEventName">
                Name
              </label>
              <input
                type="text"
                className="form-control name"
                id="createEventName"
                placeholder=" Event Name"
                value={props.name}
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
                value={props.statusId}
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
              value={props.headline}
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
                value={props.description}
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
                value={props.summary}
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
                value={props.slug}
                onChange={modalChange}
              ></input>
              <button>Choose File</button>
              <div className="d-inline">
                <h4>Date Start</h4>
                <input
                  type="date"
                  id="dateStart"
                  className="form-control "
                  name="dateStart"
                  value={props?.dateStart}
                  onChange={props.dateModal}
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
                  value={props?.dateEnd}
                  onChange={props.dateModal}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="status-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="EX: 139 N Arbor Vitae ave"
                value={props?.address}
                name="address"
                onChange={props.addressModal}
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
                value={props?.zipCode}
                onChange={props.addressModal}
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
                value={props?.latitude}
                name="latitude"
                onChange={props.addressModal}
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
                value={props?.longitude}
                name="longitude"
                onChange={props.addressModal}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button onClick={onpostEventClicked} className="btn btn-success">
            Post Event
          </button>
          <button
            className="btn btn-primary"
            color="secondary"
            onClick={props.closeMyModal}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default EventsModal;
