import React, { useState } from "react";
import Modal from "../modal/Modal";

function EditBudget() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ amount: "" });
  const [errors, setErrors] = useState({ amount: "aaa" });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setErrors((prev) => {
      return { ...prev, amount: "" };
    });
    setIsOpen(false);
  }
  function handleInputChange(e) {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (data[e.target.name] !== "") {
      setErrors((prev) => {
        return { ...prev, [e.target.name]: "" };
      });
    }
  }
  function checkErrors() {}
  function handleSubmit(e) {
    e.preventDefault();
    const sendData = async () => {};
    let pass = true;
    if (pass) {
      sendData();
      closeModal(e);
    }
  }
  return (
    <>
      <button onClick={openModal}>Editar</button>
      <Modal
        title={"Editar presupuesto"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      >
        <form className="modalForm">
          <label htmlFor="amount">Presupuesto</label>
          <input
            type="text"
            name="amount"
            maxLength={20}
            onChange={handleInputChange}
            value={data.amount}
          />
          <div className="paragraphDiv">
            {errors.amount && <p className="error">{errors.amount}</p>}
            <p className="charCounter">{`${data.amount.length}/${20}`}</p>
          </div>
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
        </form>
      </Modal>
    </>
  );
}

export default EditBudget;
