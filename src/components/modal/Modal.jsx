import React from "react";
import ModalHeader from "./ModalHeader";

function Modal({ children, title, isOpen, setIsOpen, closeModal }) {
  return (
    <>
      <div className={`modal ${isOpen && "isOpen"}`}>
        <div className="modalContainer">
          <ModalHeader closeModal={closeModal} title={title} />
          <div className="modalContent">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
