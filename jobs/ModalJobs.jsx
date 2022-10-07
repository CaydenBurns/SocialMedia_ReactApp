import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = (props) => {
  console.log("props In modal", props);
  return (
    <React.Fragment>
      <Modal isOpen={props.isOpen} toggle={props.toggle.onOnToggleModal}>
        <ModalHeader toggle={props.toggleModal}>{props.title}</ModalHeader>
        <ModalBody>
          <p>{props.summary}</p>
          <p>{props.description}</p>
          <p>{props.status}</p>
          <p>{props.pay}</p>
          <p>{props.slug}</p>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            color="secondary"
            onClick={props.toggle.onOnToggleModal}
          >
            Close
          </button>
          <button>Post Event</button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default ModalExample;
