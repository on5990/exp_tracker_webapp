import React, { useContext, useState } from "react";
import { ExpenseContext } from "../../pages/dashboard";
import Modal from "../modal/Modal";

function DeleteCategory({ _id }) {
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
    const sendRequest = async () => {
      console.log("DELETE CATEGORY", _id);
      const response = await fetch(`/api/category/${_id}`, {
        method: "DELETE",
      });
      const content = await response.json();
      if (response.ok) {
        setData((prev) => {
          return { ...prev, categories: content.data.categories };
        });
      } else {
        console.log(content);
      }
    };
    sendRequest();
    closeModal(e);
  }
  return (
    <>
      <div className="catInnerBtn" onClick={openModal}>
        X
      </div>
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
