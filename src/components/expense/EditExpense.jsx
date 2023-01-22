import React, { useState } from "react";
import Modal from "../modal/Modal";

function EditExpense() {
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
        title={"Editar gasto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></Modal>
    </>
  );
}

export default EditExpense;
