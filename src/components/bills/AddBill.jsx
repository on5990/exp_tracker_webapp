import React, { useState } from "react";
import Modal from "../modal/Modal";

function AddBill() {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button className="buttonActive" onClick={openModal}>
        + Agregar cuenta
      </button>
      <Modal
        title={"Agregar cuenta"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default AddBill;
