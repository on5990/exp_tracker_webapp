import React, { useState } from "react";
import Modal from "../modal/Modal";
import formatHelpers from "@/lib/frontendHelpers/formatHelpers";

function EditBudget() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ sum: "" });
  const [errors, setErrors] = useState({ sum: "" });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(e) {
    e.preventDefault();
    setErrors((prev) => {
      return { ...prev, sum: "" };
    });
    setData((prev) => {
      return { ...prev, sum: "" };
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
  function checkErrors() {
    let pass = true;
    if (data.sum === "") {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Este campo es requerido" };
      });
    } else if (!formatHelpers.validAmount(data.sum)) {
      pass = false;
      setErrors((prev) => {
        return { ...prev, sum: "Debe ingresar un número positivo" };
      });
    }
    return pass;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const pass = checkErrors();
    const sendData = async () => {
      console.log("PASS", data);
    };
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
          <label htmlFor="sum">Presupuesto</label>
          <input
            type="text"
            name="sum"
            maxLength={20}
            onChange={handleInputChange}
            value={data.sum}
          />
          <div className="paragraphDiv">
            {errors.sum && <p className="error">{errors.sum}</p>}
            <p className="charCounter">{`${data.sum.length}/${20}`}</p>
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
