import React, { useState } from "react";
import Modal from "../modal/Modal";

function EditBudget() {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Editar</button>
      <Modal
        title={"Editar presupuesto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default EditBudget;
