import React, { useState } from "react";
import Modal from "../modal/Modal";

function DeleteBudget() {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Eliminar</button>
      <Modal
        title={"Eliminar presupuesto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default DeleteBudget;
