import React, { useContext, useState } from "react";
import {
  REQUEST_BILL,
  REQUEST_BUDGET,
  REQUEST_EXPENSE,
  REQUEST_TRUE,
} from "../../global/constants";
import expenseRequest from "../../lib/frontendHelpers/requests/expense.request";
import { BillContext } from "../../pages/dashboard/bills";
import Modal from "../modal/Modal";

function DelPayment({ _id, setReload }) {
  const { setReload1, setData } = useContext(BillContext);
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
      const data = await expenseRequest.removePayment(_id);
      setReload((prev) => !prev);
      setData(data);
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
