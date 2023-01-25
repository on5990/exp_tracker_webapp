import React, { useState } from "react";
import Modal from "../modal/Modal";

function AddBudget() {
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
        + Agregar presupuesto
      </button>
      <Modal
        title={"Agregar presupuesto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default AddBudget;
