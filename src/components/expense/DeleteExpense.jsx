import React, { useContext, useState } from "react";
import { REQUEST_BUDGET, REQUEST_TRUE } from "../../global/constants";
import expenseRequest from "../../lib/frontendHelpers/requests/expense.request";
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
      const response = await expenseRequest.remove(_id);
      setData((prev) => {
        return {
          ...prev,
          expenses: response.expenses,
          monthlyAvg: response.monthlyAvg,
          yearlyAvg: response.yearlyAvg,
          weeklyTotal: response.weeklyTotal,
          monthlyTotal: response.monthlyTotal,
          yearlyTotal: response.yearlyTotal,
          totalsByCategory: response.totalsByCategory,
        };
      });
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
