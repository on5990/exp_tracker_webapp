import React, { useState } from "react";
import Modal from "../modal/Modal";

function DeleteExpense() {
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
      <Modal title={"Eliminar gasto"} isOpen={isOpen} setIsOpen={setIsOpen}>
        <p className="modalP">
          Confirme que desea eliminar el registro de este gasto
        </p>
      </Modal>
    </>
  );
}

export default DeleteExpense;
