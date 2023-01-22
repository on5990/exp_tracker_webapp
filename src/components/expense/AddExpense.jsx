import React from "react";
import { useState } from "react";
import Modal from "../modal/Modal";

function AddExpense() {
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
        + Agregar gasto
      </button>
      <Modal
        title={"Agregar gasto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      ></Modal>
    </>
  );
}

export default AddExpense;
