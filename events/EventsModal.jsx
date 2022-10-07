import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import LokiMain from "./LokiMain";
<script
  async
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCPTjVnlXTHh3aok-Wqbli0xp6OGD-tlU0&callback=initMap"
></script>;

function EventsModal(props) {
  console.log("props In modal", props);

  function onpostEventClicked(e) {
    console.log("onpostEventClicked", props);
    props.onpostEventClicked(props, e);
  }

  return (
    <React.Fragment>
      <Modal isOpen={props.isOpen} toggle={props.toggle.onOnToggleModal}>
        <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
        <ModalBody>
          <LokiMain propPass1={props} />
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
