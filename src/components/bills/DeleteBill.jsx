import React, { useContext, useState } from "react";
import billRequest from "../../lib/frontendHelpers/requests/bill.request";
import { BillContext } from "../../pages/dashboard/bills";
import Modal from "../modal/Modal";

function DeleteBill({ _id }) {
  const { setData } = useContext(BillContext);
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
      const response = await billRequest.remove(_id);
      setData(response);
      // const response = await fetch(`/api/bill/${_id}`, {
      //   method: "DELETE",
      // });
      // const content = await response.json();
      // if (response.ok) {
      //   setData(content.data);
      // } else {
      //   console.log(content);
      // }
    };
    submitRequest();
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal}>Eliminar</button>
      <Modal
        title={"Eliminar cuenta"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <p className="modalP">
          Confirme que desea eliminar esta cuenta, el historial también será
          eliminado
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

export default DeleteBill;
