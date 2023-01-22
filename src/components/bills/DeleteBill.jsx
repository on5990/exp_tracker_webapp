import React, { useState } from "react";
import Modal from "../modal/Modal";

function DeleteBill() {
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
        title={"Eliminar cuenta"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></Modal>
    </>
  );
}

export default DeleteBill;
