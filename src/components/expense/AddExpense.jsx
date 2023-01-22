import React from "react";
import { useState } from "react";

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
      <button className="buttonActive">+ Agregar gasto</button>
    </>
  );
}

export default AddExpense;
