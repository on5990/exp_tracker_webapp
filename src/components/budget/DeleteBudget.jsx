import React, { useContext, useState } from "react";
import { BudgetContext } from "../../pages/dashboard/budgets";
import Modal from "../modal/Modal";

function DeleteBudget({ _id }) {
  const { data, setData } = useContext(BudgetContext);
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
    const sendRequest = async () => {
      const response = await fetch(`/api/budget/${_id}`, { method: "DELETE" });
      const content = await response.json();
      if (response.ok) {
        setData(content.data);
      } else {
        console.log(content);
      }
    };
    sendRequest();
    closeModal(e);
  }
  return (
    <>
      <button onClick={openModal}>Eliminar</button>
      <Modal
        title={"Eliminar presupuesto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <p className="modalP">Comfirme que desea eliminar este presupuesto</p>
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

export default DeleteBudget;
