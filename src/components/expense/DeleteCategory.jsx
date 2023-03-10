import React, { useContext, useState } from "react";
import { REQUEST_BUDGET, REQUEST_TRUE } from "../../global/constants";
import categoryRequest from "../../lib/frontendHelpers/requests/category.request";
import { ExpenseContext } from "../../pages/dashboard";
import Modal from "../modal/Modal";

function DeleteCategory({ _id }) {
  const { setData, setParameters } = useContext(ExpenseContext);
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
      const content = await categoryRequest.remove(_id);
      setData((prev) => {
        return { ...prev, categories: content };
      });
      setParameters((prev) => {
        return {
          ...prev,
          category: {
            _id: "",
            isDefault: true,
            name: "",
          },
        };
      });
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
          prespuestos asociados a la categoría
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
