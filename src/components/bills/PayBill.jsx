import React, { useState } from "react";
import Modal from "../modal/Modal";

function PayBill() {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Pagar</button>
      <Modal
        title={"Marcar como pagado"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      ></Modal>
    </>
  );
}

export default PayBill;
