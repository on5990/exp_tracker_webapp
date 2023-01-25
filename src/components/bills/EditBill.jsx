import React, { useState } from "react";
import Modal from "../modal/Modal";

function EditBill() {
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
        title={"Editar cuenta"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default EditBill;
