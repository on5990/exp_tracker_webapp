import React, { useState } from "react";
import Modal from "../modal/Modal";

function DeleteCategory() {
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
      console.log("DELETE CATEGORY");
      closeModal(e);
    };
    sendRequest();
  }
  return (
    <>
      <button className="catInnerBtn" onClick={openModal}>
        X
      </button>
      <Modal
        title={"Eliminar categoría"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <p className="modalP">
          Confirme si desea eliminar esta categoría, también se eliminaran los
          presuestos asociados a la categoría
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

export default DeleteCategory;
