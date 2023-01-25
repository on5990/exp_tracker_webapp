import React from "react";

function ModalHeader({ closeModal, title }) {
  return (
    <>
      <div className="modalBar">
        <div className="titleDiv">
          <h1>{title}</h1>
        </div>
        <div className="xDiv">
          <button onClick={closeModal}>X</button>
        </div>
      </div>
    </>
  );
}

export default ModalHeader;
