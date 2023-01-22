import React from "react";

function Modal({ children, title, isOpen, setIsOpen }) {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <div className={`modal ${isOpen && "isOpen"}`}>
        <div className="modalContainer">
          <div className="modalBar">
            <div className="titleDiv">
              <h1>{title}</h1>
            </div>
            <div className="xDiv">
              <button onClick={closeModal}>X</button>
            </div>
          </div>
          <div className="modalContent">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
