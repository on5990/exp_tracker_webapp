import React, { useContext, useState } from "react";
import { REQUEST_BUDGET, REQUEST_TRUE } from "../../global/constants";
import { ExpenseContext } from "../../pages/dashboard";
import Modal from "../modal/Modal";

function DeleteExpense({ _id }) {
  const { setData } = useContext(ExpenseContext);
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setIsOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    const submitRequest = async () => {
      const response = await fetch(`/api/expense/${_id}`, {
        method: "DELETE",
      });
      const content = await response.json();
      if (response.ok) {
        setData((prev) => {
          return {
            ...prev,
            expenses: content.data.expenses,
            monthlyAvg: content.data.monthlyAvg,
            yearlyAvg: content.data.yearlyAvg,
            weeklyTotal: content.data.weeklyTotal,
            monthlyTotal: content.data.monthlyTotal,
            yearlyTotal: content.data.yearlyTotal,
            totalsByCategory: content.data.totalsByCategory,
          };
        });
        localStorage.setItem(REQUEST_BUDGET, JSON.stringify(REQUEST_TRUE));
      } else {
        console.log(content);
      }
    };
    submitRequest();
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Eliminar</button>
      <Modal
        title={"Eliminar gasto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <p className="modalP">
          Confirme que desea eliminar el registro de este gasto
        </p>
        <div className="outerBtnBox">
          <div className="innerBtnBox">
            <button
              className="modalButton"
              type="submit"
              onClick={handleSubmit}
            >
              Aceptar
            </button>
            <button className="modalButton" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteExpense;
