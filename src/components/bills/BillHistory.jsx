import React, { useState } from "react";
import Modal from "../modal/Modal";

function BillHistory() {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Historial</button>
      <Modal
        title={"Historial de pagos"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default BillHistory;
