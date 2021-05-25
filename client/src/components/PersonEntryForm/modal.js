import "./modal.css";
import React from "react";
import PersonEntryForm from "./PersonEntryForm";

//Modal component to render the favourite person form.

const Modal = ({ handleClose, show, row, getFavPeople }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <PersonEntryForm
          handleClose={handleClose}
          row={row}
          getFavPeople={getFavPeople}
        />
      </section>
    </div>
  );
};

export default Modal;
