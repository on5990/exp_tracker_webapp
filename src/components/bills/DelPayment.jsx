import React, { useState } from "react";
import { REQUEST_EXPENSE, REQUEST_TRUE } from "../../global/constants";
import Modal from "../modal/Modal";

function DelPayment({ _id }) {
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
      console.log("ELIMINAR PAGO");
      localStorage.setItem(REQUEST_EXPENSE, JSON.stringify(REQUEST_TRUE));
      //    const response = await billRequest.remove(_id);
      //    setData(response);
    };
    submitRequest();
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>X</button>
      <Modal
        title={"Eliminar pago"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <p className="modalP">Confirme si desea eliminar este pago</p>
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

export default DelPayment;
